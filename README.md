# Obsidian CLI Plugins Skill

`obsidian-cli-plugins` is a Codex/agent skill for Obsidian vault automation. It provides a stable script interface for vault doctor checks, Git-backed sync, daily/weekly/monthly journal records, Tasks plugin todos, project records under `01_project/`, safe vault reads/searches, attachment-backed records, Obsidian plugin commands, and OpenClaw skill sync.

The distributable skill lives at:

```text
skills/obsidian-cli-plugins/
```

The repository also includes a Codex plugin manifest:

```text
.codex-plugin/plugin.json
```

And a repo-scoped Codex marketplace descriptor:

```text
.agents/plugins/marketplace.json
```

## Install as a Skill

Copy or clone `skills/obsidian-cli-plugins` into your local skills directory:

```bash
mkdir -p ~/.codex/skills
cp -R skills/obsidian-cli-plugins ~/.codex/skills/obsidian-cli-plugins
```

## Install as a Codex Plugin

Add this repository as a Codex plugin marketplace:

```bash
codex plugin marketplace add DXShelley/obsidian-cli-plugins-skill
```

Then install `obsidian-cli-plugins` from the marketplace UI or plugin command flow.

For OpenClaw, sync from the installed Codex skill:

```bash
python3 ~/.codex/skills/obsidian-cli-plugins/scripts/sync_openclaw.py
```

## Configure

Set vault configuration per host or runtime:

```bash
export OBSIDIAN_VAULT=obsidian-2026
export OBSIDIAN_VAULT_PATH=~/git/obsidian-2026
export OBSIDIAN_BIN=obsidian
```

Run `doctor` first on a new machine, container, SSH session, OpenClaw runtime, or unfamiliar agent runtime:

```bash
python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py doctor
```

## Common Commands

Show today's tasks:

```bash
python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py tasks show --period day --date today
```

Add a sync-backed task:

```bash
python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py add-task-sync --period day --date today --kind auto --text "Follow up on the project"
```

Add an inline record to today's journal:

```bash
python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py record-sync --mode inline --period day --date today --text "Captured note text"
```

Inspect project note structure:

```bash
python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py project-template-structure --project "Example Project"
```

## Safety Notes

- Run `doctor` before modifying a vault from a new runtime.
- Use sync-backed commands such as `add-task-sync`, `record-sync`, and `project-record-sync` for normal writes.
- Commands stop on Git conflicts, merge state, unmerged files, or failed preflight checks.
- The skill avoids reading credential-like files and redacts sensitive command output.
- Host-specific vault paths should be configured through environment variables, not hard-coded into the skill.

## Validation

Validate the skill metadata:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/obsidian-cli-plugins
```

Run the bundled tests:

```bash
python3 -m pytest skills/obsidian-cli-plugins/scripts/tests
```

## Website

The project website is maintained in this repository and only describes `obsidian-cli-plugins`:

- `/`: Obsidian skill page for inspiration capture, project incubation, task management, schedule management, attachment-backed records, and the less-is-more command design.
- `?lang=en`: English content; Chinese is the default.
- `#links`: friendly links to the image plugin page and OpenClaw media plugin page, which are maintained in their own repositories.
- `#support`: project support section with WeChat Pay, WeChat reward, and Alipay QR images.

Build locally:

```bash
cd website
npm install
npm run build
```

GitHub Pages is deployed by `.github/workflows/pages.yml` from the `dev` branch when `website/**` changes.

## Distribution Archives

Prebuilt ZIP files are included under `dist/`:

- `obsidian-cli-plugins-codex-plugin-2.0.0.zip`: Codex plugin package with `.codex-plugin/plugin.json`.
- `obsidian-cli-plugins-skill-public-20260708.zip`: includes the top-level `obsidian-cli-plugins/` folder.
- `obsidian-cli-plugins-skill-public-flat-20260708.zip`: contains `SKILL.md` at the archive root for platforms that expect flat uploads.

See [PUBLISHING.md](PUBLISHING.md) for platform-specific publishing notes.

## Support this project

If this skill makes Obsidian recording easier, you can support ongoing maintenance from the project page: [Support this project](https://dxshelley.github.io/obsidian-cli-plugins-skill/#support).
