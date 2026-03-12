import { readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"

const md = new MarkdownIt()
const contentDir = resolve(dirname(fileURLToPath(import.meta.url)), "../../../_content/en")

function loadYaml(file) {
  const raw = readFileSync(join(contentDir, file), "utf8")
  // Wrap in front-matter delimiters so gray-matter can parse plain YAML files
  return matter(`---\n${raw}\n---`).data
}

function loadMd(file) {
  const raw = readFileSync(join(contentDir, file), "utf8")
  const { data, content } = matter(raw)
  return { ...data, bodyHtml: md.render(content.trim()) }
}

function renderInline(text = "") {
  return md.renderInline(text)
}

function renderBlock(text = "") {
  return md.render(text.trim())
}

function normalizeType(type) {
  return {
    ...type,
    scenarios: (type.scenarios ?? []).map((scenario) => ({
      ...scenario,
      textlines: (scenario.textlines ?? []).map((line) => ({
        ...line,
        textHtml: renderBlock(line.text),
      })),
      verdict: {
        ...scenario.verdict,
        textHtml: renderInline(scenario.verdict?.text ?? ""),
      },
    })),
  }
}

function loadType(file) {
  return normalizeType(loadMd(file))
}

function loadRule(file) {
  const rule = loadMd(file)
  return {
    ...rule,
    textHtml: rule.bodyHtml,
  }
}

function buildNav(nav, sections) {
  return {
    ...nav,
    links: sections
      .filter((section) => section.navLabel)
      .map((section) => ({
        href: `#${section.kind}`,
        text: section.navLabel,
      })),
  }
}

function buildSection(section) {
  if (section.kind === "intro" || section.kind === "why" || section.kind === "coda") {
    return {
      ...section,
      ...loadMd(section.file),
    }
  }

  if (section.kind === "types") {
    return {
      ...section,
      items: (section.files ?? []).map((file) => loadType(file)),
    }
  }

  if (section.kind === "rules") {
    return {
      ...section,
      items: (section.files ?? []).map((file) => loadRule(file)),
    }
  }

  if (section.kind === "furtherReading") {
    return section
  }

  throw new Error(`Unknown section kind: ${section.kind}`)
}

export default function () {
  const meta = loadYaml("meta.yaml")
  const sections = (meta.sections ?? []).map((section) => buildSection(section))

  return {
    lang: meta.lang,
    title: meta.title,
    description: meta.description,
    header: {
      ...meta.header,
      definitionHtml: renderInline(meta.header.definition),
    },
    nav: buildNav(meta.nav, sections),
    sections,
    footer: meta.footer,
  }
}
