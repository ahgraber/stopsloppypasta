# stopsloppypasta

Sloppypasta | n. | Verbatim LLM output copy-pasted at someone, unread, unrefined, and unrequested.
From _slop_ (low-quality AI-generated content) + _copypasta_ (text copied and pasted, often as a meme, without critical thought).
It is considered rude because it asks the recipient to do work the sender did not bother to do themselves.

## Content

All copy lives in `_content/en/`.
To edit the site text, open the relevant file:

| File                     | What it controls                                       |
| ------------------------ | ------------------------------------------------------ |
| `_content/en/meta.yaml`  | Site manifest: metadata, ordered sections, nav, footer |
| `_content/en/intro.md`   | Intro section heading and paragraphs                   |
| `_content/en/types/*.md` | example scenarios and discussion                       |
| `_content/en/why.md`     | "Why it matters" section paragraphs and pull quotes    |
| `_content/en/rules/*.md` | Rule titles and Markdown body copy                     |
| `_content/en/coda.md`    | Closing paragraphs                                     |

Discussion prose is Markdown.
Structured data (nav links, scenarios, quotes) is YAML — either in `meta.yaml` or in the front matter of the relevant `.md` file.

`meta.yaml` is the single page manifest, recording section order, associated section content, and section-level metadata.
The type nav links are derived from the ordered `types` section entries in `meta.yaml`, so type titles, anchors, and nav order come from the same source of truth.

## Local preview

```bash
npm install
npm start
```

Then open [http://localhost:8080](http://localhost:8080).

To build for deployment:

```bash
npm run build
```

Output goes to `_site/`.

## AI Disclosure

I used AI:

- to help build this website.
- to help generate examples of sloppypasta based on my original guidance
- to proofread and review the **human-written** copy to provide a critical review to improve my arguments and ensure clarity.
