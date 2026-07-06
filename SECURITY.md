# Security Policy

## Reporting a Vulnerability

Please report security issues privately by opening a GitHub security advisory on this repository or by emailing the maintainer listed in `.codex-plugin/plugin.json`.

Do not include sensitive vault content, credentials, tokens, private file paths, or private Obsidian note content in public issues.

## Scope

Security-sensitive areas include:

- Obsidian vault path resolution and vault boundary checks
- Git command execution and sync preflight behavior
- Attachment staging and attachment path handling
- Safe read/search redaction
- Obsidian plugin command execution

## Expected Handling

Reports should include:

- A concise description of the issue
- Steps to reproduce with a minimal test vault or synthetic files
- Expected and actual behavior
- Any relevant command output with secrets redacted

The maintainer will acknowledge valid reports and coordinate a fix before public disclosure when appropriate.
