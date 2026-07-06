# Publishing

This repository is prepared as both a raw skill source and a Codex plugin package.

Do not initialize or add Git repositories inside an Obsidian vault for publishing this skill. Keep this repository as the public distribution source and configure each user's vault through environment variables.

## GitHub

Use GitHub as the canonical public source:

```bash
git clone https://github.com/DXShelley/obsidian-cli-plugins-skill.git
```

Release assets:

- `dist/obsidian-cli-plugins-codex-plugin-1.0.0.zip`
- `dist/obsidian-cli-plugins-skill-public-20260706.zip`
- `dist/obsidian-cli-plugins-skill-public-flat-20260706.zip`
- `dist/SHA256SUMS`

## Codex Plugin

Use the Codex plugin archive:

```text
dist/obsidian-cli-plugins-codex-plugin-1.0.0.zip
```

The plugin manifest is:

```text
.codex-plugin/plugin.json
```

The manifest points Codex to:

```text
skills/
```

The repository also includes:

```text
.agents/plugins/marketplace.json
```

Users can add the repository as a marketplace with:

```bash
codex plugin marketplace add DXShelley/obsidian-cli-plugins-skill
```

## Generic Agent Skill Platforms

Use the raw skill directory:

```text
skills/obsidian-cli-plugins/
```

For ZIP upload platforms, try the flat archive first:

```text
dist/obsidian-cli-plugins-skill-public-flat-20260706.zip
```

If the platform expects a named top-level folder, use:

```text
dist/obsidian-cli-plugins-skill-public-20260706.zip
```

## Claude Agent Skills

Upload the flat skill archive when the UI or API expects `SKILL.md` at archive root:

```text
dist/obsidian-cli-plugins-skill-public-flat-20260706.zip
```

Use the folder archive if the platform expects the skill folder itself:

```text
dist/obsidian-cli-plugins-skill-public-20260706.zip
```

## OpenClaw / ClawHub

Recommended listing metadata:

```yaml
name: obsidian-cli-plugins
source: https://github.com/DXShelley/obsidian-cli-plugins-skill
path: skills/obsidian-cli-plugins
category: Productivity
tags:
  - obsidian
  - openclaw
  - tasks
  - journal
  - vault
```

For local OpenClaw installation after cloning:

```bash
python3 skills/obsidian-cli-plugins/scripts/sync_openclaw.py
```

## Preflight Checklist

Before each release:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/obsidian-cli-plugins
python3 ~/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py .
python3 -m pytest skills/obsidian-cli-plugins/scripts/tests
rg -n --hidden -S '(/Users/[A-Za-z0-9._-]+|gho_[A-Za-z0-9_]+|ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+|OPENAI_API_KEY\s*=|Authorization:\s*Bearer\s+[A-Za-z0-9._-]+)' . -g '!**/.git/**' -g '!**/__pycache__/**' -g '!*.pyc'
```
