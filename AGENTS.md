# Repository guidance

- This repository is the canonical source for the `messages` plugin.
- Keep the Codex and Claude manifests synchronized.
- Treat `~/Library/Messages/chat.db` as private, read-only source data. Never copy message content, handles, database files, WAL files, or attachments into Git.
- Preserve the stable `messages` CLI name and keep hygiene review source-read-only.
- Bump all plugin and package versions together and run `npm test` before publishing.
