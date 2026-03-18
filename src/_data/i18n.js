import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"

const md = new MarkdownIt()
const rootContentDir = resolve(dirname(fileURLToPath(import.meta.url)), "../../_content")

// --- Content loading ---

function loadYaml(contentDir, file) {
  const raw = readFileSync(join(contentDir, file), "utf8")
  return matter(`---\n${raw}\n---`).data
}

function loadMd(contentDir, file) {
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

function loadType(contentDir, file) {
  return normalizeType(loadMd(contentDir, file))
}

function loadRule(contentDir, file) {
  const rule = loadMd(contentDir, file)
  return { ...rule, textHtml: rule.bodyHtml }
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

function buildSection(contentDir, section) {
  if (section.kind === "intro" || section.kind === "why" || section.kind === "coda") {
    return { ...section, ...loadMd(contentDir, section.file) }
  }
  if (section.kind === "types") {
    return { ...section, items: (section.files ?? []).map((file) => loadType(contentDir, file)) }
  }
  if (section.kind === "rules") {
    return { ...section, items: (section.files ?? []).map((file) => loadRule(contentDir, file)) }
  }
  if (section.kind === "furtherReading") {
    return section
  }
  throw new Error(`Unknown section kind: ${section.kind}`)
}

function loadLocale(contentDir) {
  const meta = loadYaml(contentDir, "meta.yaml")
  const sections = (meta.sections ?? []).map((section) => buildSection(contentDir, section))

  return {
    // lang, dir, label, fontFamily are set by the registry in the export default function
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

// --- Font registry (locale slug → Bunny Fonts family string) ---

const FONT_MAP = {
  "th": "noto-serif-thai:400,400i,500,600",
  "ar": "noto-naskh-arabic:400,500,600",
  "fa": "noto-naskh-arabic:400,500,600",
  "ur": "noto-naskh-arabic:400,500,600",
  "he": "noto-sans-hebrew:400,500,600",
  "zh-hans": "noto-sans-sc:400,500",
  "zh-hant": "noto-sans-tc:400,500",
  "zh": "noto-sans-sc:400,500",
  "ja": "noto-sans-jp:400,500",
  "ko": "noto-sans-kr:400,500",
  "km": "noto-sans-khmer:400,500",
  "my": "noto-sans-myanmar:400,500",
  "el": "noto-serif:400,400i,500,600",
  "lo": "noto-sans-lao:400,500,600",
  "ka": "noto-sans-georgian:400,500,600",
  "hy": "noto-sans-armenian:400,500,600",
  "hi": "noto-sans-devanagari:400,500,600",
  "bn": "noto-sans-bengali:400,500,600",
  "ta": "noto-sans-tamil:400,500,600",
  "te": "noto-sans-telugu:400,500,600",
  "kn": "noto-sans-kannada:400,500,600",
  "ml": "noto-sans-malayalam:400,500,600",
  "gu": "noto-sans-gujarati:400,500,600",
  "pa": "noto-sans-gurmukhi:400,500,600",
  "si": "noto-sans-sinhala:400,500,600",
}

// --- Registry loading and validation ---

function loadRegistry() {
  const raw = readFileSync(join(rootContentDir, "locales.yaml"), "utf8")
  const registry = matter(`---\n${raw}\n---`).data

  const errors = []

  if (!registry.defaultLocale) {
    errors.push("locales.yaml: missing 'defaultLocale' field")
  }

  if (!registry.locales || typeof registry.locales !== "object") {
    errors.push("locales.yaml: missing or invalid 'locales' map")
  }

  if (errors.length) {
    throw new Error(`Locale registry validation failed:\n  ${errors.join("\n  ")}`)
  }

  // Validate each locale entry
  const seenTags = new Map() // tag → slug (detect duplicates)
  const seenAliases = new Map() // alias → slug (detect collisions)

  for (const [slug, entry] of Object.entries(registry.locales)) {
    if (!entry.tag) errors.push(`locales.yaml: locale '${slug}' missing 'tag'`)
    if (!entry.slug) errors.push(`locales.yaml: locale '${slug}' missing 'slug'`)
    if (entry.slug && entry.slug !== slug)
      errors.push(`locales.yaml: locale '${slug}' has mismatched slug '${entry.slug}'`)
    if (!entry.dir || !["ltr", "rtl"].includes(entry.dir))
      errors.push(`locales.yaml: locale '${slug}' missing or invalid 'dir' (must be ltr or rtl)`)
    if (!entry.label) errors.push(`locales.yaml: locale '${slug}' missing 'label'`)

    // Tag uniqueness
    if (entry.tag) {
      const prev = seenTags.get(entry.tag)
      if (prev) errors.push(`locales.yaml: duplicate tag '${entry.tag}' in locales '${prev}' and '${slug}'`)
      else seenTags.set(entry.tag, slug)
    }

    // Aliases must be an array of strings; check for collisions across locales
    if (!Array.isArray(entry.aliases)) {
      errors.push(`locales.yaml: locale '${slug}' aliases must be an array (got ${typeof entry.aliases})`)
    } else {
      for (const alias of entry.aliases) {
        if (typeof alias !== "string") {
          errors.push(`locales.yaml: locale '${slug}' has non-string alias: ${JSON.stringify(alias)}`)
          continue
        }
        const key = alias.toLowerCase()
        const prev = seenAliases.get(key)
        if (prev) errors.push(`locales.yaml: alias '${alias}' collides — claimed by both '${prev}' and '${slug}'`)
        else seenAliases.set(key, slug)
      }
    }

    // Resolve font from FONT_MAP if entry.font is a key, or null for Latin-default
    entry.fontFamily = entry.font ? FONT_MAP[entry.font] || entry.font : FONT_MAP[slug] || null
  }

  // Validate default locale exists in the registry
  if (registry.defaultLocale && !registry.locales[registry.defaultLocale]) {
    errors.push(`locales.yaml: defaultLocale '${registry.defaultLocale}' not found in locales`)
  }

  // Cross-validate: every registered locale must have a content directory
  for (const slug of Object.keys(registry.locales)) {
    const contentDir = join(rootContentDir, slug)
    if (!existsSync(contentDir) || !existsSync(join(contentDir, "meta.yaml"))) {
      errors.push(`Locale '${slug}' is in registry but has no content directory (_content/${slug}/meta.yaml)`)
    }
  }

  // Cross-validate: every content directory must be in the registry
  const contentDirs = readdirSync(rootContentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(rootContentDir, d.name, "meta.yaml")))
    .map((d) => d.name)

  for (const dir of contentDirs) {
    if (!registry.locales[dir]) {
      errors.push(`Content directory '_content/${dir}/' exists but is not in the locale registry`)
    }
  }

  if (errors.length) {
    throw new Error(`Locale registry validation failed:\n  ${errors.join("\n  ")}`)
  }

  return registry
}

// --- Discovery (registry-driven) ---

export default function () {
  const registry = loadRegistry()

  const result = {
    _meta: {
      defaultLocale: registry.defaultLocale,
      locales: registry.locales,
    },
  }

  for (const [slug, entry] of Object.entries(registry.locales)) {
    const content = loadLocale(join(rootContentDir, slug))
    result[slug] = {
      ...content,
      lang: entry.tag, // override with canonical BCP 47 tag
      dir: entry.dir,
      label: entry.label,
      fontFamily: entry.fontFamily,
    }
  }

  return result
}
