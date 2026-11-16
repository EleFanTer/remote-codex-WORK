# Сталкинг / GitHub + MCP: технический паспорт
**Снимок инвентаризации:** 2026-11-16  
**GitHub account:** `EleFanTer` (user ID 74524848)  
**Назначение документа:** единая опорная карта GitHub-репозиториев, доступных интеграций ChatGPT/MCP и облачной рабочей станции. Обновлять при каждом изменении инфраструктуры.  
**Правило безопасности:** сюда не записывать токены, пароли, OAuth JSON, API keys, session cookies и их значения. Фиксировать только имена секретов и места хранения.

## 1. Проверенный GitHub аккаунт и репозитории

GitHub-коннектор ChatGPT авторизован как `EleFanTer`. На момент проверки `list_repositories(owner=EleFanTer)` вернул 10 репозиториев. Все права в выдаче: admin/maintain/push/pull/triage.

| Репозиторий | Видимость | Ветка | Размер (GitHub size) | Проверенное содержимое / назначение |
|---|---|---:|---:|---|
| [My-yt-music-API](https://github.com/EleFanTer/My-yt-music-API) | private | main | 0 | Пустой репозиторий, Contents API вернул 404 «repository is empty». |
| [YTubeMusicAPI](https://github.com/EleFanTer/YTubeMusicAPI) | private | main | 4 | Небольшой FastAPI сервис YouTube Music на ytmusicapi. README описывает /health, /search, /playlists, /playlists/add; защита X-API-Key; предполагаемый деплой Render. OAuth/ключи должны храниться только в секретах хостинга. В истории проекта зафиксировано, что Render ещё не подключён и сервис не развёрнут/не протестирован. |
| [img2threejs](https://github.com/EleFanTer/img2threejs) | public | main | 36361 | Проект/CLI + агентский skill для реконструкции объектов и персонажей из изображения в процедурную, animation-ready Three.js геометрию кодом. README и SKILL.md прочитаны частично. Package: `img2threejs@0.2.0`, Apache-2.0, CLI `bin/img2threejs.mjs`, Node >=18, npm public. Skill указывает поддержку Hermes, Claude Code, Codex, OpenCode; использует локальное состояние .img2threejs/state.json и обязательные этапы/quality gates. |
| [wetty](https://github.com/EleFanTer/wetty) | public | main | 6057 | WeTTY: терминал в браузере через HTTP(S), xterm.js и WebSocket. README прочитан. Важные настройки: явный trusted `--allowed-origin` обязателен; SSH host/user/port/auth; рекомендуется HTTPS reverse proxy. Есть предупреждение, что SSH private key option может быть небезопасной. Это веб-терминал, а не MCP-сервер. |
| [vscode](https://github.com/EleFanTer/vscode) | public | main | 1759988 | Большой fork/checkout VS Code. README и структура всего репозитория не исследованы полностью. В корне присутствуют .agents, .config, .devcontainer, .github, src, extensions, remote и др. Прочитан .mcp.json: один MCP server `component-explorer`, stdio, запускается через npm exec и fixtures `./test/componentFixtures/component-explorer.json`, с `--use-daemon -vv`. Это конфигурация в репозитории, не доказательство, что сервер сейчас запущен или подключён в Codex. .devcontainer использует desktop-lite, Rust, sshd; форвардит 6080 (noVNC web client) и 5901 (VNC TCP), hostRequirements memory 9gb. |
| [congenial-invention](https://github.com/EleFanTer/congenial-invention) | private | main | 0 | Пустой репозиторий, Contents API вернул 404 «repository is empty». |
| [KasmVNC](https://github.com/EleFanTer/KasmVNC) | public | master | 5910 | KasmVNC: удалённый Linux desktop/app через современный браузер. README прочитан. Поддерживает vncserver, web access, YAML config; документация рекомендует смотреть версию release. Не является сам по себе готовой защищённой рабочей станцией: нужны настройка TLS, аутентификация, сетевой периметр и хост. |
| [remote-codex-workstation](https://github.com/EleFanTer/remote-codex-workstation) | private | main | 27 | Целевой репозиторий облачной рабочей станции. Корень: .env.example, .gitignore, LICENSE, README.md, apps/, docs/, package.json, packages/, tsconfig.base.json. Package: private npm workspace, scripts dev/build/lint/format; concurrently, Prettier, TypeScript. Файлы .env.example и README.md выглядят перепутанными: README.md содержит шаблон переменных окружения (PORT=4000, HOST=0.0.0.0, OPENAI_API_KEY placeholder, OPENAI_MODEL=gpt-4o-mini, APP_URL, JWT_SECRET placeholder, SESSION_SECRET placeholder); .env.example содержит TypeScript функцию OpenAI Chat Completions с fallback-ответом, если OPENAI_API_KEY отсутствует. Требует отдельного внимательного аудита apps/, packages/, docs/ и безопасности перед запуском. |
| [ios](https://github.com/EleFanTer/ios) | public | main | 1039143 | Bitwarden iOS Password Manager & Authenticator repository. README подтверждает проект Bitwarden iOS, а не собственную iOS app пользователя. |
| [Repacks](https://github.com/EleFanTer/Repacks) | public | main | 1508872 | README и package.json указывают на Bitwarden Clients monorepo (browser, CLI, desktop, web и др.), package `@bitwarden/clients`. README указывает, что мобильные клиенты вынесены отдельно в ios/android. Это fork/копия исходного проекта, не подтверждение собственного сервиса пользователя. |

### Наблюдения по репозиториям
- В аккаунте есть два пустых private repo: `My-yt-music-API` и `congenial-invention`.
- `remote-codex-workstation` создан и доступен коннектору; он не пустой.
- `YTubeMusicAPI` и `My-yt-music-API` — разные репозитории, не путать.
- В `vscode/.mcp.json` найден ровно один объявленный MCP server: `component-explorer`. Проверка конфигурации не равна проверке runtime.
- Большие форки `ios` и `Repacks` относятся к Bitwarden; `KasmVNC`, `wetty`, `img2threejs` — проекты с самостоятельными функциями, которые могут быть полезны в инфраструктуре, но пока не подтверждены как развернутые/используемые сервисы.

## 2. Интеграции и инструменты, доступные в текущем ChatGPT

В среде инструментов текущего проекта обнаружено 38 namespaces (интеграций/встроенных инструментальных групп). Это перечень доступности из ChatGPT, а не перечень серверов, уже установленных в Codespaces или локальном Codex.

- GitHub — 89 доступных действий; коннектор авторизован под EleFanTer. Есть чтение репозиториев, файлов, коммитов, issues/PR и операции записи; create repository action в доступном наборе не обнаружен.
- Firecrawl — доступен набор действий поиска, scrape/crawl, browser interaction, research, developer search, monitors и credit usage. Баланс на 2026-11-16: 1,026 credits; плановый объём 1,000; billing period 2026-11-15T06:45:52.852Z — 2026-12-15T06:45:52.852Z. Активных Firecrawl monitors: 0.
- GitHub/Firecrawl — подтверждённые внешние коннекторы; не путать с локальными MCP процессами в Codex.
- Остальные namespaces, доступные ChatGPT в момент снимка: get_user_settings, set_setting, Gmail, Canva, AI_Voice_Generator, MyFonts, sync, Midify, 123_Piano, VisualSong, Mirelo, Sonilo, Subdivide, SoundBreak, Vivin, VeyrPiano, Tonk, Drums_kit, ElevenLabs, Sider_Recorder, Awesome_Record, Glance, TG_Finder, Lemma_Telepath, Exa, Metricool, Vercel, PayPal, Automations, Plugin_Management, files (list/search/read/find/materialize/manage_library).
- Этот список описывает инструменты, доступные в ChatGPT runtime. Он не означает, что пользователь сам создавал или отдельно настраивал каждый из этих MCP.

## 3. Firecrawl: проверенное состояние
- Авторизованный Firecrawl connector отвечает.
- Current credits: 1,026; plan credits: 1,000.
- Период: 15 Nov 2026 — 15 Dec 2026 (UTC).
- Monitor list вернул пустой список.
- Исторические использования по endpoint/API key и список API keys ещё не выгружены.

## 4. Codex / Codespaces: состояние из истории проекта
- Цель: удалённая рабочая станция с iPhone как единственным устройством управления; домашний ПК не должен быть обязательным.
- Создан GitHub Codespace из Blank template; Ubuntu Linux, 2 CPU, 8 GB RAM.
- Версии в Codespace: Node.js 24.22.2, npm 11.19.2, Python 3.14.2.
- Codex CLI установлен: `@openai/codex`, версия `0.169.0`.
- Выполнен `codex login --device-auth`; статус сообщал `Logged in`.
- Попытка `codex mcp login github` не сработала: `Dynamic client registration not supported`.
- Пользователь сообщил, что создал Codespaces secret с именем `_GITHUB_PAT_TOKEN`. Не подтверждено, что secret доступен в текущем Codespace или что у него включён доступ к `remote-codex-workstation`.
- Не подтверждено, что GitHub MCP добавлен в Codex CLI.
- Не подтверждено, что Firecrawl MCP добавлен в Codex CLI.
- Не подтверждено, что Playwright MCP установлен/запущен в Codespace.
- В истории ранее предлагался endpoint Firecrawl MCP `https://mcp.firecrawl.dev/v2/mcp`, но перед настройкой требуется сверить актуальный официальный способ и авторизацию.
- Codespaces не следует считать круглосуточным VPS: есть квоты, idle timeout и ограничения времени сессии; текущие лимиты не проверены в этом снимке.

## 5. Безопасность и правила обращения с секретами
- Никогда не просить пользователя присылать PAT, OpenAI API key, Firecrawl key, OAuth token JSON, JWT/session secrets, пароли или cookies.
- Проверять наличие env var только условным тестом, не печатать значение.
- В репозитории обнаружены placeholders `replace-me` и `change-this-secret`; они не являются действующими секретами. Не запускать приложение с такими значениями в production.
- `YTubeMusicAPI` README требует хранить APP_API_KEY, YTMUSIC_OAUTH_JSON, YTMUSIC_CLIENT_ID и YTMUSIC_CLIENT_SECRET только в secret settings хостинга, не коммитить их.
- Для WeTTY/KasmVNC обязательно отдельно проверить HTTPS, origin, доступ, пароли/ключи и публичные порты прежде чем открывать сервис в интернет.

## 6. Не завершённые части аудита
1. Полностью изучить дерево и ключевые файлы `remote-codex-workstation/apps/`, `packages/`, `docs/`; проверить API, web UI, auth, permissions, persistence, deployment, tests.
2. Изучить все конфиги MCP в репозиториях: поиск `.mcp.json`, `mcpServers`, `mcp-server`, `AGENTS.md`, конфиги Codex/Claude/Hermes/OpenCode, devcontainer.
3. Разобрать назначение и состояние `img2threejs`, `wetty`, `KasmVNC`, `vscode`, `ios`, `Repacks` глубже: origin/upstream, fork status, commits, branches, releases, deployment state.
4. Проверить GitHub Codespaces secret availability без раскрытия значения; проверить repository access для `_GITHUB_PAT_TOKEN`.
5. Подключить GitHub MCP в Codex CLI через env var, если пользователь подтвердит доступ и команда соответствует версии Codex.
6. Проверить официальный актуальный setup Firecrawl MCP и подключить его в Codex.
7. Установить и проверить Playwright MCP/headless Chromium в Codespace; не публиковать незащищённый порт.
8. Проверить текущие лимиты Codespaces и стоимость/квоты всех внешних сервисов.
9. Выгрузить Firecrawl historical credit usage по endpoint и API key (без публикации секретных значений).
10. Сверить список всех MCP, которые пользователь действительно сам установил/создал, с просто доступными в ChatGPT tools.

## 7. Рабочий протокол проекта
- Считать этот документ центральной картой проекта и обновлять его после каждого существенного изменения.
- При начале новой сессии в проекте сначала сверяться с этим паспортом и последними сообщениями/состоянием GitHub, а не просить пользователя повторять уже известное.
- Отмечать у каждого компонента: назначение, где работает (ChatGPT / Codex / Codespaces / внешний VPS / iPhone), статус (проверен / настроен / запущен / не проверен / отключён), зависимости, секреты только по именам, следующие шаги.
- Не смешивать: (a) инструменты ChatGPT connectors, (b) MCP servers в `.mcp.json`, (c) MCP servers в Codex config, (d) GitHub repositories, (e) работающие сервисы.
- Не изменять существующие репозитории и не запускать/деплоить сервисы без согласования, если действие может повлиять на данные, безопасность или расходы.


## 8. Подробный аудит remote-codex-workstation (исходники, 2026-11-16)

### Структура
- `apps/api`: Express API, TypeScript; зависимости express 4.21.1, cors, dotenv; dev через tsx watch; build через tsc.
- `apps/web`: React 18 + Vite 5 + TypeScript; dev на 0.0.0.0:5173; прокси `/api` направлен на localhost:4000.
- `packages/shared`: общие типы задач, AI request/response, remote services и утилиты.
- `docs/architecture.md`: схема мобильного web/PWA → API/auth/session → OpenAI adapter, media queue, storage/DB, protected service router → VS Code/KasmVNC/Wetty. Это целевая архитектура, не свидетельство развернутых сервисов.

### Реально прочитанные исходники и поведение
- `apps/api/src/index.ts`: Express сервер; маршруты /health, /auth/login, /auth/logout, /auth/me, /api/services, /api/tasks, /api/jobs, /api/ai/chat, /api/jobs/:id/approve. Задачи и сессии хранятся в памяти процесса; демо-задачи создаются при старте. Логин принимает email/password, но пароль не проверяется; выдаётся случайный demo-session token. AI endpoint в этом файле пока возвращает шаблонный текст, а не вызывает OpenAI. Approve меняет статус задачи на done.
- `apps/api/src/openai.ts`: содержимое неожиданно дублирует почти весь API server code из index.ts, включая login/tasks/services; это не ожидаемая реализация отдельного OpenAI adapter. Важно: import `./openai.js` в этом файле создаёт самоссылочную/циклическую структуру. Вероятная ошибка генерации/копирования, требует исправления до запуска.
- `apps/web/src/App.tsx`: iPhone-friendly dashboard (React) с логином, чатом, созданием jobs, approve, отображением services. API URL жёстко задан как `http://localhost:4000`, token хранится в localStorage. Для реального удалённого iPhone-доступа это нерабочая production-конфигурация: localhost на iPhone будет означать сам iPhone, а не Codespace/server. Нужен относительный API URL или корректный публичный base URL под HTTPS.
- `apps/web/src/App.tsx`: login отправляет фиксированный `demo-password`; это демо, не полноценная аутентификация. Services используют placeholder URLs `*.example.internal`.
- `packages/shared/src/index.ts`: экспортирует типы TaskType, WorkflowTask, AiRequest, AiResponse, RemoteService. Одновременно импортирует Node `http` и `net` в shared package ради getHostPort; это может быть несовместимо с browser bundle, если модуль подключён фронтендом.
- `.gitignore`: исключает .env и .env.*, но разрешает .env.example.
- `docs/architecture.md`: требует private service access, approval gates, server-side AI mediation, no direct public access to VNC/terminal. Эти принципы пока не реализованы в текущем коде.

### Критические замечания безопасности/готовности (аудит кода, не penetration test)
1. API login сейчас демо-режим: пароль фактически не проверяется, пользователь может получить сессию, прислав любые непустые email/password. Не публиковать сервис в интернете.
2. Сессии хранятся в памяти и пропадают при перезапуске; нет срока действия, refresh/revocation model beyond in-memory logout, secure cookie flow или durable identity store.
3. CORS настроен как `origin: true, credentials: true`, то есть разрешает отражать origin. Для production нужен строгий allowlist.
4. Нет rate limiting, brute-force protection, CSRF strategy (если credentials/cookies будут применяться), schema validation и role-based authorization.
5. `express.json({ limit: '50mb' })` без upload pipeline/streaming; лимит большой.
6. AI response и service URLs в коде частично демо/placeholder. `openai.ts` не является корректным adapter в текущем виде.
7. Web UI жёстко обращается к `http://localhost:4000`; это не годится для удалённого доступа с iPhone через Codespaces.
8. Текущие задачи хранятся в памяти, нет DB, очереди, файлового storage, persistence, media worker или реального job lifecycle.
9. `/api/jobs/:id/approve` только меняет статус на done, не запускает внешнее действие и не проверяет ownership конкретной задачи пользователя.
10. Не обнаружено готовой интеграции с Codex CLI, GitHub MCP, Firecrawl MCP или Playwright MCP внутри API/Web app.

**Статус проекта:** каркас/прототип, не production-ready, не подтверждён как развёрнутый. Не подключать публичный URL и не помещать реальные секреты, пока не закрыты пункты выше.

## 9. Точная граница того, что проверено
- GitHub account list, репозитории, видимость, ветки, размеры, несколько README/package/config/source files — проверены через GitHub connector.
- Firecrawl current credit balance и monitors — проверены живым запросом.
- Инструментальные namespaces текущего ChatGPT runtime — перечислены; это не экспорт всех личных MCP настроек GitHub/Codex.
- Полный список MCP-серверов, установленных пользователем в аккаунте GitHub, GitHub Marketplace, ChatGPT Settings, Codex config или других приложениях, не может быть автоматически выведен только из GitHub repo list и доступных коннекторов. Для полного подтверждения нужно отдельно прочитать соответствующие настройки/конфиги. Никакие secrets values не требуются.


## 10. Дополнительный аудит EleFanTer/vscode (2026-11-16)

### MCP-конфигурации в репозитории
- Поиск по полному Git tree ветки `main` (26,065 entries, tree не truncated) нашёл один явный корневой файл конфигурации MCP: `.mcp.json`.
- В `.mcp.json` объявлен один stdio сервер `component-explorer`.
  - command: `npm`
  - args: `exec --no -- component-explorer mcp -p ./test/componentFixtures/component-explorer.json --use-daemon -vv`
  - Это локальный инструмент для component explorer/fixtures, а не универсальный GitHub/Firecrawl/browser server.
  - Конфигурация хранится в репозитории, но фактический запуск в текущем Codespace не проверен.
- Других явных файлов `.mcp.json`, `mcp.json`, `mcp.yaml`, `mcp.yml`, `codex.toml`, `config.toml` в полном дереве `vscode` не найдено по поиску имён. Это не исключает конфигурации, задаваемые UI/user settings, переменными окружения или иными форматами.

### Integrated Browser в EleFanTer/vscode
- Найден skill `.github/skills/integrated-browser/SKILL.md`; это подробная архитектурная инструкция к встроенному браузеру VS Code (`browserView`).
- Это не отдельный MCP сервер и не расширение BrowserMCP. Это нативная функция VS Code, построенная на Electron `WebContentsView` и Chromium.
- Архитектура трёх процессов:
  - Main: владеет WebContentsView, browser sessions, trust, permissions, history, CDP, screenshots.
  - Shared: Playwright и remote/group automation services.
  - Renderer: editor pane/UI, agent tools, лёгкие proxies, общается через IPC.
- Страницы управляются агентами через Playwright/CDP и встроенные browser tools. Контент закрыт для агентов по умолчанию: требуется sharing/privacy gate; доступность полного набора инструментов зависит от chat/agent/settings gates. URL фильтруются network filter; контент рассматривается как untrusted input (prompt injection).
- Browser sessions управляют cookies/cache/storage, разрешениями и trust; groups ограничивают, какие вкладки видит отдельный automation client; CDP проксируется, а не отдаётся как raw connection.
- Skill явно говорит: Desktop-only, в web эта реализация не работает.
- Практический вывод: этот встроенный браузер может быть интересен для управления браузером внутри desktop VS Code, но нельзя автоматически считать его доступным в GitHub Codespaces web editor на iPhone. Это отдельная Electron/desktop архитектура.
- Для нашей cloud workstation с iPhone по-прежнему нужен браузерный automation сервис, который реально работает в headless Linux/Codespaces (например, Playwright MCP), либо проверка поддержки конкретной remote browser архитектуры. Встроенный VS Code browserView сам по себе не заменяет это.

### Devcontainer из vscode fork
- `.devcontainer/devcontainer.json` использует desktop-lite, Rust, sshd; `privileged: true`; `overrideCommand: false`; named volume `vscode-dev`; postCreate `./.devcontainer/post-create.sh`.
- Автоматически forward ports 6080 (noVNC web client) и 5901 (VNC TCP), оба silent.
- hostRequirements.memory = 9gb.
- Это devcontainer для разработки/тестирования Code - OSS с desktop/VNC окружением, а не лёгкий профиль для нашего 2 CPU / 8 GB Codespace. Требует отдельной оценки ресурсов и защиты перед переносом.
- Наличие sshd/VNC ports и `privileged: true` не означает, что среда сейчас запущена или безопасно опубликована.

### MCP implementation внутри VS Code fork
- В дереве присутствует substantial MCP support в Copilot extension: `extensions/copilot/src/extension/mcp`, `platform/mcp`, `githubMcp`.
- Прочитанный `mcp/vscode-node/commands.ts` реализует assisted MCP package setup: валидация пакетов из npm/PyPI/NuGet/Docker Hub, получение README/manifest, генерация конфигурации через tool-calling loop и запрос consent перед записью. Поддерживает форматы VS Code/workspaceRoot/copilotGlobal.
- Прочитанный `githubMcp/vscode-node/githubMcp.contribution.ts` регистрирует GitHub MCP Definition Provider через VS Code Language Model API, если экспериментальная настройка GitHub MCP включена. Это механизм самого VS Code/Copilot, не доказывает, что GitHub MCP включён в данном пользовательском Codespace.
- Это исходный код платформы и Copilot extension. Наличие кода в fork не означает, что опубликованная сборка построена, установлена или запущена.

## 11. Обновлённые выводы и следующие действия
1. Явная MCP-конфигурация, которую мы реально нашли в пользовательских репозиториях, пока одна: `component-explorer` в `EleFanTer/vscode/.mcp.json`.
2. Встроенный browserView в VS Code fork — отдельная нативная Electron browser/agent capability, не MCP server; она Desktop-only.
3. MCP support в Copilot source code не равен подключённому MCP в Codex CLI.
4. Следующий технический приоритет: изучить `img2threejs` skill и его Playwright capture pipeline; затем проверить все ветки/файлы конфигурации в остальных репозиториях и live Codex MCP config из самого Codespace.


## 12. Глубокий аудит img2threejs (2026-11-16)

### Назначение и архитектура
- README определяет проект как реконструкцию объекта/персонажа из reference image в code-only procedural Three.js model. Это не photogrammetry, не извлечение готовой сетки и не загрузка готовых art packs.
- Skill version: 2.0.1; npm package version: 0.2.0. Это разные версии: npm package описывает installer/updater, а версия самого skill берётся из frontmatter SKILL.md.
- package.json: Node >=18, CLI img2threejs ведёт на bin/img2threejs.mjs. Пакет публикует только CLI файл; основной skill и Python pipeline устанавливаются из Git checkout/release, а не поставляются как содержимое npm package.
- Skill заявляет совместимость с Hermes, Claude Code, Codex и OpenCode. Installer создаёт общий release checkout и symlink для обнаруженных host integrations. Для Hermes отдельно требуется profile-level link.
- Core pipeline использует Python 3.10+ stdlib. forge/requirements.txt и optional adapters нужно рассматривать отдельно от core.
- Каждый reconstruction run обязан использовать локальный .img2threejs/state.json, forge/next.py и forge/state.py. State gate отслеживает шаги, evidence и ограниченные correction loops; hard-stop нельзя обходить по памяти/контексту.
- Pipeline staged: intake → domain/quality assessment → spec → strict validation → locked build passes → browser review/capture → correction/acceptance. Один снимок не позволяет достоверно восстановить скрытые стороны; skill требует явно отмечать неопределённость и запрашивать дополнительные виды при необходимости.
- В дереве присутствуют substantial forge stages для intake, geometry, materials, review, rigging/animation, а также extensive tests. Это серьёзная специализированная 3D reconstruction toolchain, а не универсальная browser workstation.

### Playwright / browser capture: что реально делает
- scripts/capture_threejs_playwright.py — optional Playwright adapter для Python↔Three.js render bridge.
- Он импортирует Playwright динамически; при отсутствии пакета завершает работу с понятной ошибкой и предлагает установить Playwright в isolated environment либо использовать существующий Chrome DevTools MCP adapter.
- Target page должна выставить window.__IMG2THREEJS_READY__ = true и window.__IMG2THREEJS_CAPTURE__.setCamera(cameraSpec). Для GLB-mediated-v2 нужен также capturePass({passId, mode}); для reference mode требуется setReferenceMode.
- Скрипт запускает Chromium, открывает manifest runtime URL, ждёт readiness signal, устанавливает camera, ждёт animation frames, проверяет canvas, снимает screenshot и записывает capture/evidence в manifest. Сохраняет browser metadata и console/page errors; ненулевой код при ошибках.
- Следовательно, это не MCP server и не standalone browser UI. Это проектный adapter, которому нужны уже существующая web page/Three.js runtime и render manifest.
- grimoire/feedback/render_capture.md предписывает сначала использовать agent browser/screenshot tool (включая Browser MCP или in-app preview). Не устанавливать Playwright/Chromium только ради skill, если пользователь явно не разрешил или проект уже не зависит от них. Если in-app Browser отсутствует, запросить screenshot либо использовать browser tooling, уже имеющийся в целевом проекте.
- Документация требует deterministic camera/framing, screenshot per pass, comparison sheet и human/agent vision review. Автоматические pixel metrics могут диагностировать, но не должны сами утверждать визуальную приёмку.
- Дополнительный integrations/glb_character_pipeline/node/capture-character.mjs использует CloakBrowser, а затем локальный Playwright как fallback; он заточен под capture конкретного character demo, не универсальный browser server.
- В репозитории не найден явный .mcp.json или отдельный MCP server entrypoint по полному recursive tree. Упоминания Chrome DevTools MCP в skill/docs обозначают совместимый внешний инструмент, а не MCP, поставляемый самим img2threejs.

### Практическая ценность для нашей станции
- Высокая ценность как отдельный agent skill для 3D реконструкции и как пример качественно gated workflow с локальным state/evidence.
- Низкая прямая ценность для общей задачи iPhone → Codespaces → Codex control plane: это не удалённый desktop, не терминал и не универсальный браузер.
- Playwright capture script можно повторно использовать как архитектурный пример: headless browser + runtime readiness contract + deterministic capture + evidence manifest. Но подключать его в рабочую станцию следует только если появится конкретная задача Three.js/3D и подтверждённая среда исполнения.
- Статус установки skill в текущем Codespace/Codex не проверен. GitHub repo наличие не означает, что CLI/skill установлен в Codespace.

## 13. Дополнительные MCP-конфигурации и skills в остальных репозиториях (2026-11-16)

### EleFanTer/ios (Bitwarden iOS source fork)
- Полное recursive tree просмотрено: 4,861 файлов.
- Найден .mcp.json, объявляющий stdio server mobilebuildmcp: npx -y mobilebuildmcp@2.7.1 mcp; Sentry отключён через env flag.
- .mobilebuildmcp/config.yaml включает workflows simulator и ui-automation, defaults: Bitwarden.xcworkspace, scheme Bitwarden, simulator iPhone 17 Pro.
- .claude/skills/mobilebuildmcp/SKILL.md требует перед первым build/run/test вызвать session_show_defaults, использовать snapshot_ui перед UI interactions, проверять раскладку клавиатуры перед вводом символов, проверять фактический текст после ввода и никогда не вводить реальные vault credentials/TOTP URIs.
- Назначение: Xcode/iOS simulator/device/macOS build/debug/logging/UI automation через MobileBuildMCP. Это developer toolchain для Bitwarden iOS на macOS с Xcode, не удалённое управление нашим Codespace и не iPhone-side MCP.
- Наличие .mcp.json в fork не означает, что MobileBuildMCP установлен или доступен в текущем Codespace. Для его реальной работы необходимы совместимые macOS/Xcode host и соответствующие workflows.

### EleFanTer/Repacks (Bitwarden Clients monorepo fork)
- Полное recursive tree просмотрено: 10,309 файлов (в пределах доступной GitHub tree выдачи).
- Найден .mcp.json с тремя stdio Chrome DevTools MCP configurations:
  1. electron-devtools-attach: chrome-devtools-mcp@1.2.0, attach к http://localhost:9222, experimental screencast.
  2. chrome-devtools-attach: attach к Chrome на http://localhost:9200, experimental screencast и categoryExtensions.
  3. chrome-devtools-headless: отдельный headless isolated Chrome, experimental screencast и categoryExtensions.
- Это конфиги для browser debugging/automation в контексте разработки Bitwarden Clients. Они не подтверждают, что соответствующие браузеры слушают порты 9222/9200 или что MCP процессы запущены.
- В Repacks есть .devcontainer/browser-gui/devcontainer.json, browser app source (apps/browser) и workflow для browser build/tests. Это дополнительные browser-development assets, но не готовая публичная браузерная станция.
- .claude/CLAUDE.md содержит security rules Bitwarden: не отправлять незашифрованные vault data в API, не логировать decrypted data/keys/PII, не коммитить credentials/secrets. Эти ограничения важны при любых экспериментах с fork.

### EleFanTer/wetty
- Полное recursive tree просмотрено: 164 файлов. Явные .mcp.json, mcp.json, mcp.yaml, mcp.yml, Codex config и agent skill files по именам не найдены.
- package.json: WeTTY 3.0.0, Node engine ^22.23.4 || ^24.22.1 || >=26.12.1; Express 5, node-pty, xterm.js, Socket.IO. Это самостоятельный browser terminal server.
- MCP server в репозитории не обнаружен. Терминал доступен через HTTP(S), но для нашей станции потребуются отдельные auth, origin allowlist, HTTPS и network boundary.

### EleFanTer/YTubeMusicAPI
- README подтверждает private FastAPI service на ytmusicapi: public /health, защищённые X-API-Key endpoints /search, /playlists, /playlists/add.
- README требует OAuth JSON, OAuth client ID/secret и app API key хранить только в hosting provider secrets. Утверждается, что сервис не хранит music files; free host может засыпать.
- MCP config по дереву (4 файла) не обнаружен. Сервис пока не подтверждён как deployed/working; README предполагает Render deployment.
- Потенциально полезен как backend integration для музыкального workflow, но это не MCP server и не компонент удалённого управления рабочей станцией.

### Пустые репозитории
- My-yt-music-API и congenial-invention: Git tree API вернул 409 Git Repository is empty. Это подтверждает отсутствие commit/tree на проверенной default branch, а не наличие скрытого runtime.

## 14. Сводка MCP evidence по проверенным репозиториям

| Репозиторий | Обнаружено в репозитории | Тип / назначение | Runtime подтверждён? |
|---|---|---|---|
| vscode | component-explorer | stdio MCP, локальные component fixtures | Нет |
| ios | mobilebuildmcp | stdio MCP, Xcode/iOS Simulator automation | Нет; требует macOS/Xcode |
| Repacks | 2 attach + 1 headless Chrome DevTools MCP | browser debugging/automation | Нет |
| img2threejs | явного MCP config/server нет; поддерживает внешний Browser/Chrome DevTools MCP | agent skill + CLI + optional Playwright capture adapter | Нет |
| wetty | MCP config не найден | browser terminal, не MCP | Нет |
| KasmVNC | MCP config не найден в полном tree search по именам | browser remote desktop, не MCP | Нет |
| YTubeMusicAPI | MCP config не найден | FastAPI backend, не MCP | Не подтверждён |
| My-yt-music-API | пустой | отсутствует код | Нет |
| congenial-invention | пустой | отсутствует код | Нет |

**Важное разграничение:** найденные .mcp.json являются repo-level developer configurations в форках VS Code/Bitwarden. Они не доказывают, что MCP servers установлены в текущем Codex CLI или работают в Codespaces.

## 15. Следующий этап аудита
1. Проверить полные конфигурации Repacks/.mcp.json и ios/.mcp.json как reference patterns; оценить актуальность версий и возможность изолированного использования Chrome DevTools MCP в Codespaces.
2. Проверить KasmVNC tree/config/docs на deployment manifests, auth/TLS defaults, reverse proxy, Docker Compose, port exposure и release packaging; не запускать сервис.
3. Сверить GitHub repo list и все 10 репозиториев повторно, чтобы выявить изменения с прошлого снимка.
4. Вернуться к remote-codex-workstation: проверить полные исходники, исправность документации и определить минимальный безопасный vertical slice.
5. Live Codex MCP config и доступность _GITHUB_PAT_TOKEN можно проверить только из Codespace runtime; значения секретов не выводить. Подготовить пользователю одну короткую диагностическую команду, когда дойдём до этого этапа.
6. После repository audit перейти к официальным upstream docs для Chrome DevTools MCP / Playwright MCP / Firecrawl MCP и сопоставить актуальные способы установки, transport и auth.


## 16. KasmVNC deployment/security configuration audit (2026-11-16)

- Full recursive tree on master reviewed: 814 files. No obvious Docker Compose stack, Kubernetes/Helm deployment, or repo-level MCP configuration was found by filename search. The repository contains Docker build/test images and packaging workflows, not a ready-to-run personal workstation deployment.
- README explicitly says not to use master README as release documentation; use documentation matching the selected release. It describes KasmVNC as browser-only remote desktop/application access, with YAML server/user configuration.
- Default server config listens on network interface 0.0.0.0, protocol http, automatic websocket port, IPv4 and IPv6 enabled. SSL settings require SSL but point to snakeoil self-signed certificate/key by default. This is not production TLS identity; replace with correctly managed certificates or terminate TLS at a trusted reverse proxy.
- Server config uses kasm_password_file at ${HOME}/.kasmpasswd. README shows vncpasswd user creation and permissions. Brute-force protection defaults blacklist threshold 5 and timeout 10 (units/semantics must be checked in release-specific docs before tuning).
- Default idle timeout and auto-shutdown timeouts are never. A workstation session can remain alive indefinitely unless external lifecycle controls are configured. This matters for resource/cost exposure.
- Clipboard server-to-client and client-to-server are enabled by default, size unlimited; keyboard rate limit unlimited. The defaults config warns that verbose data-loss-prevention logging records private information such as keypresses and clipboard content. Avoid verbose logging and set clipboard/rate limits according to the threat model.
- Default config allows client override of selected runtime settings. Decide whether clients should be able to alter settings before exposing the service.
- builder/conf/nginx_kasm.conf is an example reverse proxy on port 8443 with a snakeoil certificate. It proxies UI to 127.0.0.1:5173 and Kasm API/WebSocket to 127.0.0.1:6901; websocket upgrade headers and long timeouts are configured. This is a build/test example, not proof of an externally hardened deployment.
- builder/README.md test package creates three demo users (foo, foo-ro, foo-owner) with the default password foobar. These are explicitly test credentials. Never use this test container setup as a live public workstation without replacing all defaults and reviewing auth/network controls.
- The project has a Web API and multi-user permissions per README, but the repo audit did not verify a deployed API or a production authorization design for our use case.
- KasmVNC remains a plausible remote desktop backend for a Linux GUI, but it is heavier and more operationally complex than a browser terminal. It requires a Linux desktop/X server, KasmVNC runtime, secure TLS/auth, network perimeter, and lifecycle management. Current Codespace is 2 CPU / 8GB; suitability and idle cost must be tested before adoption.
- Status: source audited, not built, not installed, not deployed, no runtime endpoint confirmed. Do not expose ports publicly until hardening and release-specific docs are reviewed.

## 17. Current repository audit checkpoint
- Deep review completed: img2threejs, vscode, ios, Repacks, wetty, KasmVNC, YTubeMusicAPI, and empty private repositories.
- Full source/runtime review still needed for remote-codex-workstation; prior code audit findings remain current until rechecked.
- No MCP server runtime in Codex/Codespaces has yet been proven by live process/config inspection. Repo-level .mcp.json findings are static configuration evidence only.
- Next sequence: recheck GitHub repository inventory and branch heads; audit exact current remote-codex-workstation files and tests; then perform a focused upstream-doc check for Chrome DevTools MCP, Playwright MCP and Firecrawl MCP; finally collect one safe Codespace diagnostic for actual Codex MCP config and secret presence (boolean only).


## 18. Upstream MCP documentation check (2026-11-16)

### Playwright MCP
- Official Playwright docs: https://playwright.dev/docs/getting-started-mcp
- Official documented stdio configuration: command npx, args @playwright/mcp@latest. Prerequisites: Node.js 20+ and an MCP client.
- Official docs also describe standalone HTTP mode with --port 8931 and endpoint /mcp. It uses heartbeat/ping behavior; proxy/client compatibility must be checked if used remotely.
- The Playwright MCP server exposes browser automation via structured accessibility snapshots, not only screenshots. This is a better fit for general web UI interaction than the img2threejs project-specific screenshot adapter.
- Current Codespace Node 24.22.2 meets the documented Node >=20 prerequisite, but browser binary/system dependencies and MCP client config remain unverified.
- For our cloud workstation, stdio is the simplest fit when Codex itself launches the server in the same Codespace. A remote HTTP listener should not be exposed publicly without authentication/network protection.

### Chrome DevTools MCP
- Official upstream docs: https://github.com/ChromeDevTools/chrome-devtools-mcp and https://developer.chrome.com/docs/devtools/agents/get-started/configuration
- The Repacks fork pins chrome-devtools-mcp@1.2.0 in its repository config. This is a repo-specific historical pin, not evidence that it is installed in our Codespace.
- Current upstream docs support headless mode, isolated temporary browser profile, channel selection, viewport, and attaching to a running Chrome via browserUrl or wsEndpoint. The current package documentation also offers a slim mode for basic browser tasks.
- Security-relevant upstream warning: the MCP config file and its parent directory should not be writable by the agent if it controls executablePath, chromeArg, allowedUrlPattern, blockedUrlPattern, or similar policy settings. Configuration integrity is part of the browser security boundary.
- For our use case, isolated + headless is preferable to attaching to a persistent browser profile containing personal sessions. Persistent browser contexts should be considered sensitive credential stores.
- Chrome DevTools MCP and Playwright MCP overlap. Do not install both by default: choose one after a small Codespace compatibility test and compare required capabilities. Chrome DevTools is especially relevant when Chrome-specific debugging/performance/screencast is needed; Playwright MCP is a straightforward general automation option.

### Firecrawl MCP
- Official upstream repository result: https://github.com/mcp/firecrawl/firecrawl-mcp-server
- Official docs currently advertise hosted endpoint https://mcp.firecrawl.dev/v2/mcp. Keyless free tier permits rate-limited scrape, search and parse; crawl/map/agent require credentials.
- Interactive account authorization endpoint is https://mcp.firecrawl.dev/v2/mcp-oauth. API-key mode uses the /v2/mcp endpoint and Authorization: Bearer header; never put the key in the URL.
- Firecrawl docs explicitly distinguish OAuth access tokens from refresh tokens. For HTTP streamable transports the client sends a Bearer access token; stdio can use FIRECRAWL_OAUTH_TOKEN or FIRECRAWL_API_KEY.
- This clarifies the previously recorded endpoint, but does not prove that Codex can complete the Firecrawl OAuth flow. The earlier Codex GitHub login error “Dynamic client registration not supported” means we should not assume OAuth setup will work in Codex without testing.
- The user's existing Firecrawl connector inside ChatGPT is already a separate authenticated integration. It must not be confused with a Firecrawl MCP server configured in Codex.
- Before adding Firecrawl to Codex, prefer testing the keyless read-only tools first or use a proper OAuth/API-key flow only after confirming Codex support. Never request or print key values.

### Selection recommendation for the Codespace
1. Candidate general browser automation: Playwright MCP, stdio, headless browser, same Codespace process boundary.
2. Candidate Chrome-specific debugging alternative: Chrome DevTools MCP, headless + isolated.
3. Firecrawl: hosted remote MCP for web research/scrape; separate from browser automation and existing ChatGPT connector.
4. Do not configure all three blindly. First verify Codex CLI's supported MCP config format/commands for installed version 0.169.0, then add one browser server and verify its tools; Firecrawl can be a separate optional server.

## 19. GitHub inventory recheck (2026-11-16)
- A fresh list_repositories(owner=EleFanTer, page_size=100) returned 11 repositories, not the previous 10.
- Newly visible repository: remote-codex-workstation2, private, default branch main, size 0. Git tree cannot be read because repository is empty (no commit/tree). No evidence that it is a second implementation or successor to remote-codex-workstation.
- Existing 10 repository names, default branches and GitHub sizes matched the prior inventory snapshot. The account inventory table above should be amended to include remote-codex-workstation2 as an empty private repository.
- This is a static GitHub account check; it does not reveal Codespaces, local files, or runtime deployments.


## 20. Current Codex MCP configuration documentation (2026-11-16)

- Current OpenAI MCP documentation: https://learn.chatgpt.com/docs/extend/mcp?surface=cli
- Codex stores MCP configuration in ~/.codex/config.toml; trusted projects may use .codex/config.toml. The ChatGPT desktop app, Codex CLI and IDE extension share this configuration.
- Supported transports include stdio and Streamable HTTP. CLI commands include codex mcp add, codex mcp list, codex mcp --help, codex mcp login, and codex mcp logout. In the TUI, /mcp shows active servers.
- For stdio servers, config supports command, args, env, env_vars and cwd. For Streamable HTTP, config supports url, bearer_token_env_var, http_headers/env_http_headers, OAuth auth and helper-based headers.
- Codex OAuth supports multiple flows, including Client ID Metadata Documents and Dynamic Client Registration where the authorization server/client flow is compatible. If a provider requires a pre-registered OAuth client, codex mcp add supports --oauth-client-id and --oauth-client-secret. Exact callback URL must be registered where applicable.
- Therefore the previously observed error “Dynamic client registration not supported” from codex mcp login github does not prove that Codex has no general MCP OAuth support. It indicates a mismatch/unsupported registration flow for that particular GitHub MCP endpoint/client configuration; diagnose the server's advertised auth metadata before choosing another route.
- The docs support per-server tool allow/deny lists and approval modes. For our security posture, default to minimal tool exposure and prompt approval for write-capable tools.
- Current installed Codex CLI version in the Codespace is recorded as 0.169.0 from earlier user terminal output. This version's actual help output and config parsing must still be checked in the live Codespace before relying on every current documentation field.
- No current Codex config.toml has been read in this audit. No MCP server has been confirmed active in the actual Codex runtime. Do not add servers until a read-only inventory command confirms existing state and avoids duplicate entries.

### Candidate minimal MCP config after live inspection
- Browser: choose one of Playwright MCP or Chrome DevTools MCP, not both initially.
- Research: Firecrawl hosted MCP is optional and separate from browser control.
- GitHub: use existing GitHub connector for ChatGPT tasks; Codex GitHub MCP is a separate integration and should only be added if there is a concrete need for Codex-side git hosting actions beyond git CLI.
- Keep remote GUI (KasmVNC), terminal (WeTTY), and web app services private behind the same auth boundary; MCP should not be used as a substitute for network security.


## 21. Live Codespace diagnostic: first terminal check (2026-11-16)

User supplied terminal screenshot from Codespace workspace /workspaces/remote-codex-workstation, branch main. The diagnostic command produced:
- `codex --version` → `bash: codex: command not found`.
- `codex mcp list` → same command-not-found error.
- Neither `~/.codex/config.toml` nor `.codex/config.toml` was reported as FOUND by the diagnostic loop; no repo-level or user-level Codex MCP config was observed at those paths in this shell.
- `_GITHUB_PAT_TOKEN` boolean check → NOT FOUND in this shell environment.
- This is a live observation for the current Codespace terminal only. It does not prove Codex is absent from every environment or that the GitHub Codespaces secret does not exist in account/repository settings; it may be unassigned to this Codespace or named differently.
- Earlier historical note that Codex CLI 0.169.0 had been installed/logged in is not confirmed in the current shell. Treat current shell observation as authoritative for this session until installation/PATH is diagnosed.
- Next safe step: inspect node/npm versions, npm global prefix/bin path, PATH presence, and search only likely Codex executable locations without printing secrets. Then decide whether to install Codex CLI into this Codespace. Separately verify Codespaces secret configuration in GitHub settings, ensuring repository access is enabled; do not ask user to paste token values.


## 22. Live Codespace runtime check: Node/npm and Codex package (2026-11-16)

User supplied second terminal screenshot from the active Codespace:
- Node.js v24.22.2; npm 11.19.1.
- Global npm prefix: /usr/local/share/nvm/versions/node/v24.22.2.
- Global npm root: /usr/local/share/nvm/versions/node/v24.22.2/lib/node_modules.
- `npm ls -g @openai/codex --depth=0` returned an empty global dependency tree; package not installed globally.
- `command -v codex` returned CODEX NOT IN PATH.
- No codex binary found under the global npm prefix bin directory.
- PATH includes Codespaces, Node v24.22.2 and VS Code remote CLI paths. The VS Code remote CLI and Copilot Chat extension are not Codex CLI.
- Current live shell state supersedes historical note of Codex CLI 0.169.0 being installed/logged in: that prior installation is not present in this active Codespace environment.
- Node 24 satisfies current Codex CLI Node runtime requirements as checked against package/docs context; npm 11 is present.
- Next step: install @openai/codex globally in this Codespace, then verify codex --version and codex login status. Do not add MCP servers until Codex is installed and authenticated and current config is inventoried.


## 23. Codex CLI reinstalled and device login initiated (2026-11-16)

- User screenshot shows Codex CLI v0.169.0 launched successfully in the active Codespace.
- `codex login --device-auth` started the OpenAI device authorization flow and displayed the official device URL. The CLI is waiting for the user to complete browser authorization.
- This supersedes the prior check showing `codex: command not found`; Codex is now executable in the active terminal.
- The one-time device code was visible in the user-provided screenshot. Do not store or repeat it in this inventory. User was advised to enter it only on the official OpenAI device page and not share it.
- Login completion is not yet confirmed. Next diagnostic after browser approval: `codex login status`, then `codex mcp list` and inspect MCP config headers. Do not add MCP servers until current state is confirmed.
