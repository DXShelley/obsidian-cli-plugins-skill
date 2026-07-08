---
name: obsidian-cli-plugins
description: "Obsidian vault automation for configured vaults such as `obsidian-2026`: vault status/doctor, host Git sync/status with Obsidian Git plugin fallback only when host `git` is not found, Tasks todos, journal records, file or attachment records, project files under `01_project/` (`创建项目`, `项目记录`, `记到某项目`, `补充功能需求/非功能需求/决策/任务/问题`), QuickAdd, Journals, plugin/native commands, safe vault read/search, and OpenClaw sync. Prefer this skill over `obsidian-vault-maintainer` except for OpenClaw memory-wiki render mode or `openclaw wiki obsidian ...`. Do not use for unrelated database records, media recording, generic Markdown/Git, or note-taking outside an Obsidian vault."
---

# Obsidian CLI Plugins

## Operating Model

Use the bundled Python scripts as the stable interface. All executable code and launchers must live under `scripts/`; do not add root-level compatibility scripts. When a workflow needs repeatable parsing, Git coordination, attachment handling, or note edits, extend `scripts/obsidian_cli_plugins/` instead of writing ad hoc shell snippets.

Run `doctor` first on a new host, container, SSH session, OpenClaw runtime, or unfamiliar Agent runtime. Return and consume JSON for cross-agent handoff, and stop on `ok=false`, `reason`, nonzero return codes, `unmerged`, or `merge_head`.

## Plugin Relationship

This skill is the required component for Obsidian functionality. It owns vault discovery, Git preflight, record creation, attachment copying, staged-attachment consumption, and sync.

The `obsidian-media-claim` OpenClaw plugin is optional. It does not replace this skill and cannot create Obsidian records by itself. Load `references/integrations/openclaw.md` only for OpenClaw sync, staged media, phone-channel media, or media-only-then-later-text workflows.

## Scope Boundaries

After this skill is selected, confirm the request is operating on a real Obsidian vault, especially a configured vault such as `obsidian-2026`.

Use this skill for vault status, Git sync/status inside a vault, journal records, Tasks todos, project files under `01_project/`, plugin/native commands, safe vault reads/searches, and OpenClaw skill sync.

Do not use this skill for generic project management, generic Markdown editing, unrelated Git operations, database/business records, or screen/audio/video recording unless the result is explicitly going into an Obsidian vault. Use `obsidian-vault-maintainer` only for OpenClaw memory-wiki compatibility, especially requests that explicitly mention memory-wiki render mode or `openclaw wiki obsidian ...`.

## Quick Start

Run `doctor` first on unfamiliar runtimes. For common requests, load `references/core/fast-paths.md` and use its route table instead of loading larger references.

```bash
python3 <skill-dir>/scripts/obsidian_workflows.py doctor
```

Configure per host or agent with environment variables instead of editing scripts:

```bash
export OBSIDIAN_VAULT=obsidian-2026
export OBSIDIAN_VAULT_PATH=~/git/obsidian-2026
export OBSIDIAN_BIN=obsidian
```

Use `--vault current` or `--vault auto` to target the single currently open vault from Obsidian config. Use `--vault-path` for one-off calls when environment variables are unavailable.

## Reference Routing

Treat `SKILL.md` as the router. Load only the smallest reference needed for the user's requested function.

Core references:

- `references/core/fast-paths.md`: first stop for common requests and high-frequency commands.
- `references/core/runtime-sync.md`: runtime config, Git sync, plugin command IDs, security gates, portability, and cross-agent handoff.
- `references/core/vault-safety.md`: safe read/search/summarization of arbitrary vault content or files outside `20_plan/`.

Feature references:

- `references/features/task-query.md`: `今日新增待办`, full today todo reports, and weekly todo reports.
- `references/features/task-add.md`: adding tasks, date/tag inference, journal creation, and placement rules.
- `references/features/record-workflows.md`: inline records, file-mode records, local attachments, and record success criteria.
- `references/features/record-body.md`: file-mode record body sections, formatter behavior, and unified LLM analysis fields.
- `references/features/project-records.md`: project files under `01_project/`, `template_structure`, `target_id`, semantic project JSON, and Linter behavior.

Integration references:

- `references/integrations/openclaw.md`: OpenClaw install/sync, staged media, phone-client media input, and media-only messages followed by later text records.
- `references/integrations/official-cli.md`: native Obsidian CLI command lookup beyond installed community plugin command IDs.

Maintenance references:

- `references/maintenance/extensions.md`: adding workflow support for newly installed Obsidian plugins.
- `references/maintenance/field-guide.md`: onboarding a new Agent, reviewing vault layout, write targets, template dependencies, or updating the skill from real-session lessons.
- `references/legacy/tasks.md` and `references/legacy/workflows.md`: compatibility indexes only; prefer the specific files above.

Directory boundaries:

- Use `SKILL.md`, `references/`, and `scripts/` for Agent execution.
- Use `references/` as the only normal source of task guidance; load the smallest relevant reference.
- Treat `docs/` as human-facing documentation only. Do not read `docs/` during normal skill use.
- Load files under `docs/` only when the user explicitly asks to read, update, summarize, or generate user-facing documentation.

## Execution Rules

- On multi-vault hosts, inspect `doctor.configured_vaults` and `doctor.resolved_vault`; use `--vault current` only when the single-open-vault result is clear.
- Use `safe-read` or `safe-search` before returning vault content. Otherwise apply `references/core/vault-safety.md` and redact sensitive content.
- Use `add-task-sync` for task additions and `record-sync` for record additions unless the user explicitly asks for local-only writes.
- For `记录 <content>` with no explicit period/date, write an inline record to today's daily journal `记录` section with the original text unchanged. Load `references/features/record-workflows.md` before changing record behavior.
- Use file-mode records only for separate cards/notes, analysis, long-term capture, knowledge processing, or any attachment/media workflow. Load `references/features/record-body.md`; for staged or cross-agent media, also load `references/integrations/openclaw.md`.
- For media files uploaded in earlier channel messages, load `references/integrations/openclaw.md` before consuming staged attachments. Do not use `attachment-list --batch-key default`, stale staged ids from model memory, or direct cache directory reads.
- For file-mode semantic analysis, obtain the shared prompt/schema via `analyze-record`, use the Agent application's own LLM/model, validate with `--normalized-only` when useful, and pass model-produced `--analysis-json`. Do not present hand-built JSON as semantic analysis.
- For project notes under `01_project/`, load `references/features/project-records.md` and use `project-template-structure` or `analyze-project-record` before writing. Do not bypass templates, `target_id`, semantic project JSON, or Linter behavior.
- If a supplied attachment has no readable local path, stop with `record-attachment-required`, `attachment-path-unavailable`, or `unsupported-channel-attachment-record` instead of writing a partial record.
- Before `pull`, `push`, `commit-sync`, or note edits, run `git-status`; stop on conflict state. Prefer `add-task-sync`, `record-sync`, or `git_preflight_clean` so host `git` clean/pull/push/commit sequencing is enforced. Fall back to Obsidian Git plugin commands only when the host `git` executable is not found, not when host Git returns a conflict, auth, pull, push, or commit error.
- Treat `Executed: <command-id>` as dispatch success only; verify the actual vault/file/plugin effect afterward.
- Ask before destructive operations such as discard, delete, reset, uninstall, vault-wide cleanup, or permanent deletion.
- For "今日新增待办", "今天新增任务", or equivalents, prefer `tasks show --period day --date today`; do not run broad vault searches unless the user asks for them.

For OpenClaw, sync into the current managed skills directory, typically `~/.openclaw/skills/obsidian-cli-plugins`, with:

```bash
python3 ~/.codex/skills/obsidian-cli-plugins/scripts/sync_openclaw.py
```
