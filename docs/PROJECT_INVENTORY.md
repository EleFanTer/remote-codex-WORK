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
