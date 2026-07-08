# Obsidian Project Record Workflows

Use this file for project notes under `01_project/`, including `创建项目`, `项目记录`, `记到<项目>`, project-file updates, and additions such as 功能需求、非功能需求、决策记录、项目任务, or 项目问题.

## Source of truth

- Use the current project note, project template, headings, and fragment templates as the source of truth.
- Inspect structure with `project-template-structure` when the target section is unclear.
- Use `analyze-project-record --prompt-only` to get the current prompt, schema, `template_structure`, and valid `target_id` values before producing semantic project JSON.
- Do not bypass templates, infer missing `target_id` values, or hand-build semantic analysis JSON from fixed rules.

## Standard write flow

```bash
python3 <skill-dir>/scripts/obsidian_workflows.py project-template-structure --project "<project>"
python3 <skill-dir>/scripts/obsidian_workflows.py analyze-project-record --project "<project>" --text "<project detail>" --prompt-only
python3 <skill-dir>/scripts/obsidian_workflows.py analyze-project-record --project "<project>" --text "<project detail>" --analysis-json '<model json>' --normalized-only
python3 <skill-dir>/scripts/obsidian_workflows.py project-record-sync --project "<project>" --text "<project detail>" --analysis-json '<normalized model json>'
```

## Analysis rules

- Use the Agent application's own LLM/model to produce project record JSON.
- The JSON must use one of the `target_id` values from the current `template_structure`.
- Pass the user's original project detail in `--text`; do not polish, expand, or translate it before recording.
- Treat model analysis as metadata and routing. It must not replace the user's original project detail.
- If model-side analysis is unavailable, stop and explain that project-record semantic routing requires model analysis; do not silently write to an arbitrary section.

## Template behavior

- `project-template-structure` and `analyze-project-record` parse the current project/template headings and fragment templates into a standard `template_structure`.
- Fragment templates such as `card-project-fr.md`, `card-project-nfr.md`, and `card-project-decision.md` define standard fields for functional requirements, non-functional requirements, and decisions.
- Template parsing uses `markdown-it-py` when available for CommonMark-compatible heading tokens and line maps. If unavailable, scripts fall back to the built-in heading parser.

## Sync and lint

- `project-record-sync` opens the updated project note and runs Obsidian Linter (`obsidian-linter:lint-file`) before Git commit/push.
- Use `--no-lint` only for controlled local-only tests.
- Success requires returned JSON with `ok=true`, the expected target section updated, no conflict state, Linter handled according to the command result, and clean/synced Git status after push.
