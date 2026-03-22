Below is a formal v1 CLI spec for the modernization engine. I’m using **`legacyctl`** as the binary name.

A few decisions up front:

Your typo should be **ASP.NET Core**.
For initial framework coverage in 2026, I would prioritize support where both modern demand and legacy prevalence are strong. In the 2025 Stack Overflow survey for professional developers, Node.js, React, ASP.NET Core, Express, Angular, Vue, Spring Boot, FastAPI, Django, Laravel, and Symfony all show meaningful usage, while **jQuery**, **AngularJS**, and **WordPress** are still common enough to justify legacy ingestion support. State of JS 2024 also shows **React, Vue, Angular, and Svelte** as the core front-end set, with Svelte’s usage rising and sentiment especially strong. ([Stack Overflow][1])

## 1. Initial source/target support policy

### Initial ingestables

**Backend ingest**

* Raw PHP apps
* Laravel 7/8/9/10/11
* Symfony
* Django
* ASP.NET Core
* Express / Node.js
* Spring Boot
* Flask
* Ruby on Rails
* WordPress / classic CMS-style PHP
* Raw REST monoliths with mixed scripts/configs

**Frontend ingest**

* Raw HTML/CSS/JavaScript
* jQuery / Bootstrap-era sites
* React
* Vue
* Angular
* Svelte
* Next.js
* Nuxt
* Astro
* server-rendered template frontends mixed with JS sprinkles

### Initial output targets

**Backend output**

* Raw PHP
* Laravel
* Node.js / Express
* Node.js / NestJS
* Django
* FastAPI
* ASP.NET Core
* Spring Boot

**Frontend output**

* Raw HTML/CSS/JavaScript
* React
* Vue
* Angular
* Svelte
* Next.js
* Nuxt

### Modes

* **modernize**: convert from old stack to new stack
* **refactor**: ingest and emit the same stack with deep cleanup
* **stabilize**: same-stack output with minimal architecture change
* **extract**: split a module/service out of a monolith
* **document**: analyze + pseudo-project + diagrams only

That same-stack refactor mode is worth making explicit because it will likely be one of the most-used flows.

## 2. CLI design goals

* CLI-first, UI-second
* file-based and git-friendly
* deterministic where possible
* AI-assisted where useful
* plugin-ready from day one
* source-traceable
* safe incremental reruns
* works without vendor lock-in to one model/provider

## 3. Binary and command grammar

```bash
legacyctl <command> <subcommand> [options]
```

Short aliases:

* `legacyctl init`
* `legacyctl scan`
* `legacyctl analyze`
* `legacyctl pseudo build`
* `legacyctl diagrams build`
* `legacyctl generate`
* `legacyctl copilot ask`
* `legacyctl plugin list`
* `legacyctl run`

## 4. Global flags

These work on most commands.

| Flag            |              Type | Description                     |
| --------------- | ----------------: | ------------------------------- |
| `--workspace`   |              path | Workspace root                  |
| `--source`      |          path/url | Source repo path or Git URL     |
| `--config`      |              path | Workspace config file           |
| `--profile`     |            string | Named profile from config       |
| `--module`      | repeatable string | Limit to one or more modules    |
| `--tag`         | repeatable string | Limit to tagged files/modules   |
| `--include`     |   repeatable glob | Include only matching paths     |
| `--exclude`     |   repeatable glob | Exclude matching paths          |
| `--format`      | repeatable string | Output format(s)                |
| `--out`         |              path | Output directory override       |
| `--json`        |              bool | Machine-readable console output |
| `--yaml`        |              bool | YAML console output             |
| `--verbose`     |              bool | Verbose logging                 |
| `--dry-run`     |              bool | No writes                       |
| `--resume`      |              bool | Continue previous run           |
| `--force`       |              bool | Overwrite outputs               |
| `--ai-provider` |            string | AI backend name                 |
| `--model`       |            string | Model name                      |
| `--temperature` |             float | Creativity level                |
| `--no-color`    |              bool | Disable ANSI color              |
| `--plugin-dir`  |              path | Additional plugin search path   |

## 5. Workspace layout

```text
<workspace>/
  workspace.yaml
  .legacyctl/
    cache/
    logs/
    runs/
    prompts/
    registry/
  analysis/
    inventory/
    reports/
    issues/
    traces/
  pseudo/
    project.yaml
    glossary/
    modules/
    decisions/
    targets/
  diagrams/
  generated/
  exports/
```

## 6. Formal command spec

---

# `legacyctl init`

Creates a modernization workspace and records source + default targets.

### Help text

```text
legacyctl init --source <path-or-url> --workspace <path> [options]

Create a new modernization workspace for a legacy project.

This command:
- initializes workspace folders
- records source repository metadata
- writes workspace.yaml
- selects default ingest/output plugins
- sets default mode and target stacks

Examples:
  legacyctl init --source ~/code/legacy-app --workspace ~/work/legacy-app-modernization
  legacyctl init --source https://github.com/acme/old-crm.git --workspace ./modernize --mode refactor --target-backend laravel --target-frontend react
```

### Arguments

| Flag                 | Req. |              Type | Description                                                 |
| -------------------- | ---- | ----------------: | ----------------------------------------------------------- |
| `--source`           | yes  |          path/url | Local repo or Git URL                                       |
| `--workspace`        | yes  |              path | New or existing workspace                                   |
| `--name`             | no   |            string | Friendly project name                                       |
| `--mode`             | no   |              enum | `document`, `modernize`, `refactor`, `stabilize`, `extract` |
| `--target-backend`   | no   |   repeatable enum | Target backend stack                                        |
| `--target-frontend`  | no   |   repeatable enum | Target frontend stack                                       |
| `--git-ref`          | no   |            string | Branch, tag, or commit                                      |
| `--copy-env-example` | no   |              bool | Seed env template handling                                  |
| `--with-git`         | no   |              bool | Capture git metadata                                        |
| `--with-blame`       | no   |              bool | Enable blame indexing                                       |
| `--plugin`           | no   | repeatable string | Force-enable plugins                                        |

### Example output

```text
✔ Workspace created: /work/legacy-app-modernization
✔ Source registered: /code/legacy-app
✔ Mode: modernize
✔ Targets:
  backend: laravel
  frontend: react
✔ Plugins enabled:
  ingest.php.raw
  ingest.laravel
  ingest.react
  analyze.tree-sitter
  generate.laravel
  generate.react
Next: legacyctl scan --workspace /work/legacy-app-modernization
```

---

# `legacyctl scan`

Performs deterministic discovery and indexing.

### Help text

```text
legacyctl scan --workspace <path> [options]

Scan the source repository and build the initial machine inventory.

This command detects:
- languages and frameworks
- file tree and symbols
- entrypoints, routes, controllers
- templates and assets
- environment variables and config references
- dependencies and package managers
- database hints and migrations
- tests and coverage signals
- git history and blame metadata (optional)
```

### Arguments

| Flag                    | Req. |   Type | Description                        |
| ----------------------- | ---- | -----: | ---------------------------------- |
| `--workspace`           | yes  |   path | Workspace root                     |
| `--languages`           | no   | string | `auto` or comma list               |
| `--detect-env`          | no   |   bool | Find env/config references         |
| `--detect-dependencies` | no   |   bool | Parse dependency manifests         |
| `--detect-entrypoints`  | no   |   bool | Detect app entrypoints             |
| `--detect-routes`       | no   |   bool | Detect routes/controllers          |
| `--detect-db`           | no   |   bool | Detect schema/migrations/ORM hints |
| `--detect-assets`       | no   |   bool | Detect views/static/media          |
| `--detect-tests`        | no   |   bool | Detect tests/test frameworks       |
| `--with-git`            | no   |   bool | Capture git metadata               |
| `--with-blame`          | no   |   bool | Capture blame summaries            |
| `--max-file-size-mb`    | no   |    int | Skip oversized files               |
| `--follow-symlinks`     | no   |   bool | Optional                           |
| `--respect-gitignore`   | no   |   bool | Default yes                        |

### Example output

```text
SCAN SUMMARY
============
Source: /code/legacy-app
Files indexed: 3,842
Languages:
  PHP ............. 2,119 files
  JavaScript ......   604 files
  Blade/HTML ......   311 files
  CSS/SCSS ........   209 files
Frameworks detected:
  Laravel 8
  jQuery
  Bootstrap 4
Package managers:
  Composer
  npm
Signals:
  Routes .......... 148
  Controllers ..... 63
  Models .......... 54
  Migrations ...... 37
  Tests ........... 22
  Env vars ........ 49
Outputs written:
  analysis/inventory/files.json
  analysis/inventory/frameworks.json
  analysis/inventory/symbols.json
```

---

# `legacyctl tag`

Applies semantic tags to files, folders, symbols, modules, or issues.

### Help text

```text
legacyctl tag --workspace <path> [selector options] --tag <name> [--tag <name>...]

Apply analyst tags used for scoping, prioritization, ownership, and migration planning.

Examples:
  legacyctl tag --workspace ./w --path "src/auth/**" --tag module:auth --tag priority:high
  legacyctl tag --workspace ./w --symbol "LegacySessionManager" --tag risk:security
```

### Arguments

| Flag           | Req. |              Type | Description         |
| -------------- | ---- | ----------------: | ------------------- |
| `--workspace`  | yes  |              path | Workspace root      |
| `--path`       | no   |              glob | Path selector       |
| `--symbol`     | no   |            string | Symbol selector     |
| `--module`     | no   |            string | Module selector     |
| `--issue`      | no   |            string | Issue selector      |
| `--tag`        | yes  | repeatable string | Tag(s) to add       |
| `--remove-tag` | no   | repeatable string | Tag(s) to remove    |
| `--reason`     | no   |            string | Optional audit note |

### Example output

```text
✔ Tagged 42 files with module:auth
✔ Tagged 42 files with priority:high
✔ Tagged 3 symbols with risk:security
```

---

# `legacyctl analyze`

Builds human-readable and machine-readable analysis artifacts.

### Help text

```text
legacyctl analyze --workspace <path> [options]

Run deeper repo analysis and produce reports on architecture, modules, risks, issues, and modernization complexity.

This command combines deterministic parsing with AI-assisted synthesis.
Observed facts are separated from inferred conclusions.
```

### Arguments

| Flag                | Req. | Type | Description                         |
| ------------------- | ---- | ---: | ----------------------------------- |
| `--summary`         | no   | bool | Executive summary                   |
| `--modules`         | no   | bool | Module reports                      |
| `--flows`           | no   | bool | Flow detection                      |
| `--entities`        | no   | bool | Entity/model analysis               |
| `--issues`          | no   | bool | Consolidated issue analysis         |
| `--risk`            | no   | bool | Risk scoring                        |
| `--dead-code`       | no   | bool | Dead/unreachable logic              |
| `--duplicate-logic` | no   | bool | Duplicate logic report              |
| `--security-smells` | no   | bool | Security/config smells              |
| `--missing-tests`   | no   | bool | Missing tests heuristics            |
| `--confidence`      | no   | bool | Confidence scoring                  |
| `--moduleize`       | no   | enum | `auto`, `tags`, `routes`, `folders` |

### Example output

```text
ANALYSIS SUMMARY
================
Project type: PHP monolith with Laravel core and legacy jQuery UI
Modules inferred: auth, users, billing, reporting, admin
Top risks:
  [high] Session fixation risk in auth flow
  [high] Duplicate billing calculations across 4 files
  [med] 19 likely dead routes
  [med] 31 env vars referenced but 7 undocumented
Confidence:
  observed structure ........... 0.96
  inferred module boundaries ... 0.78
  inferred dead code ........... 0.67
Outputs:
  analysis/reports/executive-summary.md
  analysis/issues/security-smells.md
  analysis/issues/dead-code.md
```

---

# `legacyctl pseudo build`

Generates the editable intermediate pseudo-project.

### Help text

```text
legacyctl pseudo build --workspace <path> [options]

Generate the pseudo-project used as the editable source of truth for modernization.

Pseudo artifacts include:
- project metadata
- module overviews
- flows
- services
- entities
- issues
- modernization notes
- source maps
- confidence markers
```

### Arguments

| Flag                     | Req. |  Type | Description                              |
| ------------------------ | ---- | ----: | ---------------------------------------- |
| `--format`               | no   |  enum | `markdown+yaml`, `json`, `md`            |
| `--moduleize`            | no   |  enum | `auto`, `tags`, `folders`, `routes`      |
| `--include-source-links` | no   |  bool | Add source line references               |
| `--include-issues`       | no   |  bool | Add issue comments                       |
| `--include-dead-code`    | no   |  bool | Include dead code findings               |
| `--include-bugs`         | no   |  bool | Include bug/risk notes                   |
| `--include-blame`        | no   |  bool | Add blame summaries                      |
| `--confidence-threshold` | no   | float | Minimum confidence to emit as “observed” |
| `--split-large-modules`  | no   |  bool | Auto-split oversized modules             |
| `--overwrite`            | no   |  bool | Replace pseudo artifacts                 |

### Example output

```text
PSEUDO BUILD
============
Modules written: 6
Flows written: 39
Entities written: 28
Issue notes attached: 84
Source links attached: yes
Blame summaries attached: yes

Top outputs:
  pseudo/project.yaml
  pseudo/modules/auth/overview.md
  pseudo/modules/auth/flows/login.flow.md
  pseudo/modules/billing/services/invoice.service.md
```

---

# `legacyctl pseudo validate`

Validates edited pseudo artifacts before generation.

### Help text

```text
legacyctl pseudo validate --workspace <path> [options]

Validate pseudo-project structure, schemas, links, traceability, and decision consistency.

Use this after manual edits in any editor or IDE.
```

### Arguments

| Flag                   | Req. | Type | Description                  |
| ---------------------- | ---- | ---: | ---------------------------- |
| `--check-schema`       | no   | bool | Validate YAML/JSON schemas   |
| `--check-links`        | no   | bool | Validate source/pseudo links |
| `--check-traceability` | no   | bool | Ensure mapping integrity     |
| `--check-decisions`    | no   | bool | Validate decision references |
| `--strict`             | no   | bool | Fail on warnings             |

### Example output

```text
VALIDATION
==========
✔ Schema checks passed
✔ Source links valid: 412/412
⚠ 3 pseudo flows reference removed issue IDs
✔ Decisions valid
Result: warnings
```

---

# `legacyctl issues`

Refreshes focused issue catalogs.

### Help text

```text
legacyctl issues --workspace <path> [issue classes]

Generate or refresh issue catalogs that can be reviewed directly or embedded into pseudo artifacts.
```

### Arguments

| Flag                   | Req. | Type | Description                 |
| ---------------------- | ---- | ---: | --------------------------- |
| `--dead-code`          | no   | bool | Dead/unreachable logic      |
| `--duplicate-code`     | no   | bool | Duplicate logic             |
| `--unreachable`        | no   | bool | Unreachable routes/branches |
| `--missing-tests`      | no   | bool | Low-confidence/test gaps    |
| `--security`           | no   | bool | Security smells             |
| `--stale-dependencies` | no   | bool | Outdated deps               |
| `--write-fixes`        | no   | bool | Add recommended fix notes   |

### Example output

```text
ISSUES
======
Dead code candidates: 57
Duplicate logic clusters: 12
Security smells: 9
Missing test hotspots: 18
Catalogs written to analysis/issues/
```

---

# `legacyctl diagrams build`

Generates diagrams from source and/or pseudo artifacts.

### Help text

```text
legacyctl diagrams build --workspace <path> [options]

Generate editable architecture and flow artifacts.

Supported diagram outputs:
- Mermaid
- PlantUML
- draw.io XML
- SVG
- PNG
```

### Arguments

| Flag                    | Req. |            Type | Description                                   |
| ----------------------- | ---- | --------------: | --------------------------------------------- |
| `--from`                | no   |            enum | `source`, `pseudo`, `both`                    |
| `--module-graph`        | no   |            bool | Module dependencies                           |
| `--entity-graph`        | no   |            bool | Models/entities                               |
| `--request-flows`       | no   |            bool | Request/response flows                        |
| `--job-flows`           | no   |            bool | Queue/job flows                               |
| `--call-graphs`         | no   |            bool | Call graph slices                             |
| `--target-architecture` | no   |            bool | Proposed target design                        |
| `--format`              | no   | repeatable enum | `mermaid`, `plantuml`, `drawio`, `svg`, `png` |
| `--diff-base`           | no   |            path | Diagram diff baseline                         |

### Example output

```text
DIAGRAM BUILD
=============
Generated:
  diagrams/module-graph.mmd
  diagrams/entity-graph.drawio
  diagrams/auth-request-flow.puml
  diagrams/target-architecture.svg
Diff mode: disabled
```

---

# `legacyctl trace`

Builds cross-artifact traceability.

### Help text

```text
legacyctl trace --workspace <path> [options]

Build traceability maps linking:
source -> pseudo
pseudo -> diagrams
pseudo -> generated code
generated code -> source
```

### Arguments

| Flag                    | Req. | Type | Description              |
| ----------------------- | ---- | ---: | ------------------------ |
| `--source-to-pseudo`    | no   | bool | Build source mapping     |
| `--pseudo-to-diagrams`  | no   | bool | Build diagram mapping    |
| `--pseudo-to-generated` | no   | bool | Build generation mapping |
| `--generated-to-source` | no   | bool | Build reverse mapping    |
| `--export`              | no   | enum | `json`, `yaml`, `md`     |

### Example output

```text
TRACE MAP
=========
source -> pseudo links: 1,884
pseudo -> diagram links: 406
pseudo -> generated links: 219
Manifest: analysis/traces/trace-map.json
```

---

# `legacyctl decide add`

Records a modernization decision.

### Help text

```text
legacyctl decide add --workspace <path> --id <id> --title <title> [options]

Record an architecture or migration decision that affects generation and review.
```

### Arguments

| Flag         | Req. |              Type | Description                                      |
| ------------ | ---- | ----------------: | ------------------------------------------------ |
| `--id`       | yes  |            string | Stable decision ID                               |
| `--title`    | yes  |            string | Decision title                                   |
| `--status`   | no   |              enum | `proposed`, `approved`, `rejected`, `superseded` |
| `--module`   | no   | repeatable string | Affected modules                                 |
| `--reason`   | no   |            string | Why this decision exists                         |
| `--impact`   | no   | repeatable string | Areas affected                                   |
| `--replaces` | no   |            string | Previous decision ID                             |

### Example output

```text
✔ Decision recorded: replace-session-auth
File: pseudo/decisions/replace-session-auth.yaml
```

---

# `legacyctl generate`

Generates target code from approved pseudo artifacts.

### Help text

```text
legacyctl generate --workspace <path> [options]

Generate a modern target codebase, module, or scaffold from the pseudo-project.

Generation supports:
- cross-stack modernization
- same-stack deep refactor
- partial module generation
- tests and contracts
- TODO markers for uncertain logic
```

### Arguments

| Flag                   | Req. |              Type | Description                                     |
| ---------------------- | ---- | ----------------: | ----------------------------------------------- |
| `--from`               | no   |              enum | `pseudo` only in v1                             |
| `--target-backend`     | no   |              enum | Backend target                                  |
| `--target-frontend`    | no   |              enum | Frontend target                                 |
| `--mode`               | no   |              enum | `modernize`, `refactor`, `stabilize`, `extract` |
| `--module`             | no   | repeatable string | Scope to modules                                |
| `--tests`              | no   |              bool | Generate tests                                  |
| `--openapi`            | no   |              bool | Generate API spec                               |
| `--todo-for-uncertain` | no   |              bool | Emit TODOs for uncertain logic                  |
| `--orm-style`          | no   |              enum | `active-record`, `repository`, `query-builder`  |
| `--ui-style`           | no   |              enum | `spa`, `mpa`, `hybrid`                          |
| `--overwrite`          | no   |              bool | Overwrite generated dir                         |

### Example output

```text
GENERATE
========
Mode: refactor
Backend target: laravel
Frontend target: vue
Modules: auth, users

Artifacts:
  generated/backend/app/Http/Controllers/AuthController.php
  generated/backend/app/Services/AuthService.php
  generated/backend/tests/Feature/Auth/LoginTest.php
  generated/frontend/src/views/LoginView.vue
  generated/openapi/auth.yaml

Notes:
  7 TODO markers inserted for uncertain legacy logic
  2 decisions applied
  1 flow skipped due to validation errors
```

---

# `legacyctl copilot ask`

Interactive AI help over the workspace.

### Help text

```text
legacyctl copilot ask --workspace <path> --prompt <text> [options]

Ask the AI copilot questions grounded in the workspace artifacts.
```

### Arguments

| Flag          | Req. |              Type | Description                                                  |
| ------------- | ---- | ----------------: | ------------------------------------------------------------ |
| `--prompt`    | yes  |            string | User question                                                |
| `--context`   | no   |              enum | `repo`, `analysis`, `pseudo`, `diagrams`, `generated`, `all` |
| `--module`    | no   | repeatable string | Limit scope                                                  |
| `--citations` | no   |              bool | Include source references                                    |
| `--save`      | no   |              bool | Save answer to workspace                                     |

### Example output

```text
COPILOT
=======
Question: What dead code can be removed safely from auth?

Answer:
- The remember_me branch appears unused in 4 observed paths.
- LegacySessionDebugController is not referenced by current routes.
- Two helper wrappers duplicate framework session methods.

Confidence: medium
Sources:
  pseudo/modules/auth/flows/login.flow.md
  analysis/issues/dead-code.md
```

---

# `legacyctl copilot patch`

Applies AI-assisted edits to pseudo artifacts.

### Help text

```text
legacyctl copilot patch --workspace <path> --target <path> --prompt <text> [options]

Apply an AI-assisted patch to a pseudo artifact or config file.
By default this writes a patch preview, not an in-place overwrite.
```

### Arguments

| Flag           | Req. |   Type | Description            |
| -------------- | ---- | -----: | ---------------------- |
| `--target`     | yes  |   path | File to patch          |
| `--prompt`     | yes  | string | Patch instruction      |
| `--in-place`   | no   |   bool | Apply directly         |
| `--patch-file` | no   |   path | Write unified diff     |
| `--explain`    | no   |   bool | Write explanation file |

---

# `legacyctl export`

Bundles artifacts for review or sharing.

### Help text

```text
legacyctl export --workspace <path> [options]

Export reports, pseudo artifacts, diagrams, generated code, and manifests.
```

### Arguments

| Flag          | Req. | Type | Description         |
| ------------- | ---- | ---: | ------------------- |
| `--report`    | no   | enum | `md`, `html`, `pdf` |
| `--pseudo`    | no   | enum | `zip`, `dir`        |
| `--diagrams`  | no   | enum | `svg`, `png`, `zip` |
| `--generated` | no   | enum | `zip`, `dir`        |
| `--manifest`  | no   | enum | `json`, `yaml`      |

---

# `legacyctl run`

One-shot orchestration command.

### Help text

```text
legacyctl run [options]

Run an end-to-end pipeline using the workspace config or inline flags.

Typical stages:
init -> scan -> analyze -> pseudo build -> diagrams build -> generate -> export
```

### Arguments

| Flag         | Req. |              Type | Description           |
| ------------ | ---- | ----------------: | --------------------- |
| `--init`     | no   |              bool | Initialize if needed  |
| `--scan`     | no   |              bool | Run scan              |
| `--analyze`  | no   |              bool | Run analysis          |
| `--pseudo`   | no   |              bool | Build pseudo project  |
| `--diagrams` | no   |              bool | Build diagrams        |
| `--generate` | no   |              bool | Generate target       |
| `--export`   | no   |              bool | Export bundle         |
| `--stage`    | no   | repeatable string | Run named stages only |

### Example output

```text
PIPELINE RUN
============
[1/6] scan ............. done
[2/6] analyze .......... done
[3/6] pseudo build ..... done
[4/6] diagrams ......... done
[5/6] generate ......... done
[6/6] export ........... done

Run ID: 2026-03-22T15-14-08Z
Outputs:
  exports/legacy-app-review.zip
```

---

# `legacyctl plugin list`

Lists installed plugins and capabilities.

### Help text

```text
legacyctl plugin list [options]

List installed and discovered plugins.
```

### Arguments

| Flag          | Req. | Type | Description                                                  |
| ------------- | ---- | ---: | ------------------------------------------------------------ |
| `--installed` | no   | bool | Show installed only                                          |
| `--available` | no   | bool | Show available registry entries                              |
| `--type`      | no   | enum | `ingest`, `analyze`, `generate`, `diagram`, `copilot`, `all` |

### Example output

```text
PLUGINS
=======
ingest.php.raw ........ installed
ingest.laravel ........ installed
ingest.symfony ........ installed
ingest.django ......... installed
ingest.aspnetcore ..... available
generate.laravel ...... installed
generate.react ........ installed
diagram.drawio ........ installed
copilot.openai ........ installed
```

---

# `legacyctl plugin install`

Installs a plugin.

### Help text

```text
legacyctl plugin install <plugin-id> [options]

Install a framework/plugin pack.
```

### Arguments

| Flag        | Req. |     Type | Description               |
| ----------- | ---- | -------: | ------------------------- |
| `plugin-id` | yes  |   string | Plugin ID                 |
| `--version` | no   |   string | Plugin version            |
| `--from`    | no   | path/url | Alternate registry/source |
| `--enable`  | no   |     bool | Enable immediately        |

---

## 7. Exit codes

| Code | Meaning                       |
| ---: | ----------------------------- |
|    0 | Success                       |
|    1 | General error                 |
|    2 | Invalid arguments             |
|    3 | Validation failure            |
|    4 | Missing plugin                |
|    5 | Source access failure         |
|    6 | AI provider failure           |
|    7 | Partial success with warnings |

## 8. Recommended built-in plugin taxonomy

### Plugin capability types

* `ingest.*`
* `analyze.*`
* `generate.*`
* `diagram.*`
* `copilot.*`
* `export.*`

### Core v1 built-ins

**Ingest**

* `ingest.php.raw`
* `ingest.laravel`
* `ingest.symfony`
* `ingest.django`
* `ingest.aspnetcore`
* `ingest.node.express`
* `ingest.springboot`
* `ingest.wordpress`
* `ingest.frontend.raw`
* `ingest.react`
* `ingest.vue`
* `ingest.angular`
* `ingest.svelte`
* `ingest.nextjs`
* `ingest.nuxt`
* `ingest.astro`
* `ingest.jquery`

**Generate**

* `generate.php.raw`
* `generate.laravel`
* `generate.node.express`
* `generate.node.nestjs`
* `generate.django`
* `generate.fastapi`
* `generate.aspnetcore`
* `generate.springboot`
* `generate.frontend.raw`
* `generate.react`
* `generate.vue`
* `generate.angular`
* `generate.svelte`
* `generate.nextjs`
* `generate.nuxt`

**Diagram/export**

* `diagram.mermaid`
* `diagram.plantuml`
* `diagram.drawio`
* `export.pdf`
* `export.html`

This plugin-first shape is what keeps the product extensible as new stacks and AI workflows arrive.

## 9. Plugin manifest spec

Example `plugin.yaml`:

```yaml
id: ingest.laravel
name: Laravel Ingest
version: 1.0.0
type: ingest
capabilities:
  - detect-framework
  - detect-routes
  - detect-models
  - detect-migrations
  - detect-blade-views
supports:
  languages: [php]
  frameworks: [laravel]
entrypoint: ./dist/plugin.js
schema_version: 1
```

Example generator plugin:

```yaml
id: generate.node.nestjs
name: NestJS Generator
version: 1.0.0
type: generate
capabilities:
  - generate-controllers
  - generate-services
  - generate-dtos
  - generate-tests
supports:
  targets:
    backend: [nestjs]
entrypoint: ./dist/plugin.js
schema_version: 1
```

## 10. Same-stack refactor support

This should be first-class, not a side effect.

Examples:

```bash
legacyctl generate \
  --workspace ./w \
  --mode refactor \
  --target-backend laravel \
  --target-frontend vue \
  --module auth --module billing
```

```bash
legacyctl generate \
  --workspace ./w \
  --mode refactor \
  --target-backend php.raw \
  --target-frontend raw \
  --module reporting
```

What it means:

* preserve the platform family
* modernize structure and conventions
* replace dead code
* consolidate duplicated logic
* improve tests
* insert TODOs only where uncertainty remains
* optionally keep routes/contracts stable

## 11. Recommended default source/target presets

### Preset: `php-legacy-rescue`

* ingest: raw PHP, Laravel, jQuery, Bootstrap, Blade/templates
* target: Laravel + Vue or Laravel + React
* alternate mode: same-stack raw PHP refactor

### Preset: `django-modernize`

* ingest: Django + template frontend + JS
* target: Django + React/Vue, or Django refactor

### Preset: `node-monolith-upgrade`

* ingest: Express + jQuery/React/Vue
* target: NestJS + React/Vue, or Express refactor

### Preset: `dotnet-modernize`

* ingest: ASP.NET Core + Angular/React
* target: ASP.NET Core + React/Vue, or ASP.NET Core refactor

### Preset: `frontend-salvage`

* ingest: raw HTML/JS, jQuery, AngularJS, React, Vue
* target: React, Vue, Svelte, or raw frontend cleanup

These choices align well with currently common modern stacks and still-common legacy estates. ([Stack Overflow][1])

## 12. Sample `workspace.yaml`

```yaml
schema_version: 1

project:
  name: Old CRM
  source: /projects/old-crm
  workspace: /projects/old-crm-modernization
  git_ref: main
  mode: modernize

profiles:
  default:
    ingest:
      backend:
        allow:
          - php.raw
          - laravel
          - symfony
          - django
          - aspnetcore
          - node.express
          - springboot
          - wordpress
      frontend:
        allow:
          - raw
          - jquery
          - react
          - vue
          - angular
          - svelte
          - nextjs
          - nuxt
          - astro

    targets:
      backend:
        preferred:
          - laravel
          - node.nestjs
          - django
          - fastapi
          - aspnetcore
          - springboot
          - php.raw
      frontend:
        preferred:
          - react
          - vue
          - svelte
          - angular
          - nextjs
          - nuxt
          - raw

    analysis:
      with_git: true
      with_blame: true
      detect_env: true
      detect_dependencies: true
      detect_entrypoints: true
      detect_routes: true
      detect_db: true
      detect_assets: true
      detect_tests: true
      confidence_threshold: 0.65
      moduleize: auto
      max_file_size_mb: 8
      respect_gitignore: true

    pseudo:
      format: markdown+yaml
      include_source_links: true
      include_issues: true
      include_dead_code: true
      include_bugs: true
      include_blame: true
      split_large_modules: true

    diagrams:
      from: pseudo
      formats:
        - mermaid
        - plantuml
        - drawio
        - svg
      module_graph: true
      entity_graph: true
      request_flows: true
      job_flows: true
      target_architecture: true

    generation:
      mode: modernize
      backend: laravel
      frontend: react
      tests: true
      openapi: true
      todo_for_uncertain: true
      orm_style: repository
      ui_style: spa
      preserve_routes_when_possible: true

    copilot:
      provider: openai
      model: gpt-5.4-thinking
      citations: true
      save_answers: true

plugins:
  enabled:
    - ingest.php.raw
    - ingest.laravel
    - ingest.symfony
    - ingest.django
    - ingest.aspnetcore
    - ingest.node.express
    - ingest.springboot
    - ingest.wordpress
    - ingest.frontend.raw
    - ingest.jquery
    - ingest.react
    - ingest.vue
    - ingest.angular
    - ingest.svelte
    - ingest.nextjs
    - ingest.nuxt
    - ingest.astro
    - analyze.tree-sitter
    - analyze.routes
    - analyze.orm
    - analyze.security
    - analyze.deadcode
    - diagram.mermaid
    - diagram.plantuml
    - diagram.drawio
    - generate.laravel
    - generate.node.nestjs
    - generate.react
    - export.pdf
  plugin_dirs:
    - ./.legacyctl/plugins
    - ~/.legacyctl/plugins

rules:
  include:
    - app/**
    - src/**
    - routes/**
    - resources/**
    - templates/**
    - public/**
    - config/**
    - database/**
  exclude:
    - vendor/**
    - node_modules/**
    - storage/**
    - bootstrap/cache/**
    - dist/**
    - build/**

tags:
  defaults:
    - project:legacy
    - migration:candidate

decisions:
  require_approval_for_generation: true
  require_validation_before_generation: true
```

## 13. Example end-to-end runs

### A. Analyze only

```bash
legacyctl init \
  --source ~/code/old-crm \
  --workspace ~/work/old-crm-modernization \
  --mode document

legacyctl run \
  --workspace ~/work/old-crm-modernization \
  --scan --analyze --pseudo --diagrams
```

### B. Same-stack refactor

```bash
legacyctl init \
  --source ~/code/old-laravel-app \
  --workspace ~/work/old-laravel-refactor \
  --mode refactor \
  --target-backend laravel \
  --target-frontend vue

legacyctl run \
  --workspace ~/work/old-laravel-refactor \
  --scan --analyze --pseudo --generate
```

### C. Legacy PHP to modern Node + React

```bash
legacyctl init \
  --source ~/code/legacy-php \
  --workspace ~/work/legacy-php-modernize \
  --mode modernize \
  --target-backend node.nestjs \
  --target-frontend react

legacyctl run \
  --workspace ~/work/legacy-php-modernize \
  --scan --analyze --pseudo --diagrams --generate --export
```

## 14. My recommendation on initial launch scope

For v1, I would **ship broad ingest first, narrower generation second**.

Best v1 support split:

* **ingest:** raw PHP, Laravel, Symfony, Django, ASP.NET Core, Express, Spring Boot, WordPress, raw HTML/JS, jQuery, React, Vue, Angular, Svelte
* **generate first:** Laravel, NestJS, Django, FastAPI, React, Vue, Svelte
* **same-stack refactor:** raw PHP, Laravel, Django, ASP.NET Core, React, Vue

That gets you a strong commercial story fast:

* rescue ugly old apps
* explain them deeply
* refactor them in place
* or move them to a modern stack
* and keep the door open for more plugins later

The framework choices above are grounded by current survey data showing strong present-day usage for React, Vue, Angular, Svelte, Node.js, ASP.NET Core, Django, Laravel, Symfony, Spring Boot, and others, while also confirming that older estates like jQuery and AngularJS still matter enough to ingest. ([Stack Overflow][1])

Next, I can turn this into a **man-page style spec** (`legacyctl.1`) plus a **plugin SDK spec** with hook interfaces and JSON schemas.

[1]: https://survey.stackoverflow.co/2025/technology "Technology | 2025 Stack Overflow Developer Survey"
