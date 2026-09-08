# Messages

A read-only macOS Messages plugin for bounded SMS, RCS, and iMessage hygiene review and authorized outgoing writing samples. It reads the local Messages SQLite database directly, exposes stable source IDs and timestamps through a JSON CLI, and keeps all block, report, reply, and opt-out actions manual.

## Requirements

- macOS
- Python 3
- Full Disk Access for the client or terminal process reading `~/Library/Messages/chat.db`

## Use

```bash
./bin/messages --json doctor
./bin/messages --json scan
./bin/messages --json scan --since 7d
./bin/messages --json read MESSAGE_GUID
./bin/messages --json context MESSAGE_GUID --before 3 --after 3
```

An omitted scan span means the previous 24 hours ending at invocation time. Explicit `--since` and `--until` values accept ISO-8601 timestamps; `--since` also accepts durations such as `24h` or `7d`. Scans are stateless and use the Messages message timestamp with `[since, until)` bounds.

`scan` returns metadata only. Read exact message bodies only with `read` or bounded `context`, after the candidate IDs are known. The CLI opens the database in SQLite read-only mode and enables `query_only`; it never sends, replies, blocks, reports, deletes, marks read, or changes Messages settings.

## Privacy

Messages content, handles, attachments, and the local database remain private runtime data and are never committed. The CLI masks phone-number-like handles in its resolved sender label; raw handles remain available only in exact read output for local classification.

This project is unofficial and is not affiliated with or endorsed by Apple Inc.

## Outgoing writing samples

For an authorized writing task, read a small sample through the same read-only
transport:

```bash
./bin/messages --json samples --since 30d --chat-id CHAT_GUID --limit 30
./bin/messages --json samples --since 24h --until 2026-01-02T00:00:00Z --limit 20
```

The default window is the previous 24 hours; the default limit is 30 candidate
rows, with a hard maximum of 100. `--chat-id` accepts an exact GUID or an
unambiguous chat identifier. Results include outgoing text, source timestamps,
service, chat IDs, and `is_from_me`. Blank or unsupported bodies are skipped
without reading beyond the bounded candidate set. A `truncated` result indicates
more candidates inside that exact window.

Messages account direction is not proof of human authorship. The output says so
explicitly; exclude known assistant-authored or copied text before using it as
writing evidence. `messages:sample-writing` describes safe source collection
for `writing:impersonating`. The active assistant drafts directly. The hygiene
`scan` remains incoming-only and contains no message text.
