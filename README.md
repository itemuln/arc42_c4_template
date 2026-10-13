# arc42 + C4 — Монгол starter ба HTML үүсгэгч

[HTML загварыг нээх](https://itemuln.github.io/arc42_c4_template/) · [arc42](https://arc42.org/overview/) · [C4](https://c4model.com/)

Өөрийн software architecture documentation-ийг Монгол хэлээр эхлүүлэх starter. 12 хэсэг бүр товч заавар, бөглөх талбар/хүснэгт, official section холбоостой. Агуулгаа AsciiDoc файлуудад бичиж, HTML болгон үүсгэнэ. Энэ repository нь бэлэн системийн тайлан биш.

## Шууд эхлэх

Node.js 24 эсвэл шинэ хувилбар хэрэгтэй.

```bash
git clone https://github.com/itemuln/arc42_c4_template.git
cd arc42_c4_template
npm ci
npm run build
npm run check
```

`build/html/index.html`-ийг браузераар нээ. Хүсвэл Python 3 ашиглан local preview ажиллуул:

```bash
npm run preview
```

Дараа нь [http://127.0.0.1:8871](http://127.0.0.1:8871) нээ. Зогсоох: `Ctrl+C`. HTML уншихад backend, database, Docker хэрэггүй.

## Өөрийн баримтыг бөглөх

1. `documentation/architecture.adoc` дэх `project-name`, version/date-ийг өөрчил.
2. `documentation/arc42/01_...adoc`–`12_...adoc` доторх **БӨГЛӨХ** тэмдэглэгээг бодит төслийн мэдээллээр соль.
3. `documentation/diagrams/*.puml` жишээг өөрийн системийн нэр, responsibility, interface-ээр соль. C4 Context → §3; Container/шаардлагатай Component → §5; sequence → §6; Deployment → §7.
4. Чухал сонголтуудаа `documentation/adrs/` дотор ADR болгон хадгалж, §9-ийн include жагсаалтыг шинэчил.
5. `npm run build` → `npm run check`; браузераа refresh хий. Шалгаагүй зүйл, санал, хэмжсэн үр дүнгээ тусад нь тэмдэглэ.

Бүх 12 хэсгийг ижил уртаар бөглөх шаардлагагүй. Зөвхөн нэр томьёо солихоос илүүтэй бодит шаардлага, код, шийдвэр, runtime evidence-д тулгуурла.

## Файлын бүтэц

```text
documentation/
  architecture.adoc       # Section-уудыг нэгтгэх үндсэн файл
  arc42/                  # Монгол 12 section + language settings
  adrs/                   # Шийдвэрийн бөглөх загвар
  diagrams/               # Editable PlantUML + rendered SVG жишээ
scripts/
  build.mjs               # Asciidoctor.js → HTML
  check.cjs               # Section/линк/зураг шалгах
  render-diagrams.py      # Optional local SVG renderer
.github/workflows/pages.yml
build/html/               # Generated output; Git-д орохгүй
```

## Зураг дахин үүсгэх (optional)

HTML build нь repository-д байгаа SVG-ийг шууд ашиглана. PlantUML source-ийг зассан үед Python 3 + Docker ажиллаж байхад:

```bash
npm run diagrams
npm run build
```

Renderer pinned PlantUML jar-ийг official GitHub release-ээс татаж, Java/Docker дээр local render хийнэ. Diagram source гаднын rendering service рүү илгээгдэхгүй. Жишээ зураг нь бодит deployment эсвэл туршилтын нотолгоо биш.

## GitHub Pages

`main` руу push хийхэд workflow `npm ci` → HTML build → check → Pages deployment ажиллана. GitHub **Settings → Pages → Source: GitHub Actions** сонгосон байх ёстой. Pull request дээр HTML build/check ажиллах боловч нийтлэхгүй. Actions-ийн ногоон төлөв нь document build-ийн шалгалт; таны системийн runtime test биш.

## Эх сурвалж, лиценз, орчуулгын төлөв

arc42 © **Gernot Starke, Peter Hruschka**; template adaptation **CC BY-SA 4.0**. [LICENSE.md](LICENSE.md) үзнэ үү. Системийн өөрийн агуулгын эрх тусдаа.

- [Official arc42 overview](https://arc42.org/overview/), section бүрийн official холбоос баримтад бий.
- [C4 model](https://c4model.com/) — diagram abstraction ба notation.
- [Asciidoctor.js](https://docs.asciidoctor.org/asciidoctor.js/latest/) — AsciiDoc → HTML.
- [bitsmuggler arc42/C4 example](https://github.com/bitsmuggler/arc42-c4-software-architecture-documentation-example) — document generation workflow-ийн reference.

Албан бус Монгол adaptation, 2026-10-13. Товчилсон заавар болохоос official template-ийн өгүүлбэр бүрийн орчуулга биш. AI-assisted draft-ийг official section docs-той тулгасан; Монгол хэлний human review хүлээгдэж байна.
