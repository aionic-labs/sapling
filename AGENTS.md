# Repository instructions

## Pull request destination safety

This checkout's default remote, `aionic-labs/sapling`, is a public fork of
`facebook/sapling`. Treat both repositories as public destinations.

- Never run `sl pr submit` in this repository. Sapling detects the fork relationship and opens or
  updates pull requests against the public upstream repository, `facebook/sapling`.
- For work that is explicitly approved for the Aionic public fork, use a regular GitHub pull
  request whose base repository is `aionic-labs/sapling`.
- Before pushing a branch or creating a pull request, verify the repository owner, name, parent,
  and visibility. Do not infer privacy from the `aionic-labs` organization name.
- After creating a pull request, verify that its URL begins with
  `https://github.com/aionic-labs/sapling/pull/`. If it points to any other owner or repository,
  stop immediately and remediate the incorrect publication.
- Never publish confidential or internal-only code to this fork. If a task involves internal code,
  require the exact private `owner/repository` destination and verify that GitHub reports its
  visibility as `PRIVATE` before pushing anything.
- Do not close pull requests, delete remote branches, or rewrite published refs without explicit
  user authorization.

These destination checks are mandatory even when the user asks to submit the current Sapling
stack or refers to this checkout as an internal fork.
