# Notion API Importer

Import pages and databases from Notion into Obsidian. This plugin connects via the official Notion API, converts pages into Obsidian‑flavored Markdown, and lays groundwork for converting databases into YAML‑backed Bases. **Status:** experimental; the importer currently verifies API connectivity and stubs core functions.

## Installation

### Using the prebuilt plugin

Download the latest `notion-api-importer.zip` from the Releases section on GitHub, extract `manifest.json` and the `dist/` folder into your Obsidian vault’s `.obsidian/plugins/notion-api-importer` directory. Restart Obsidian or reload plugins, then enable **Notion API Importer** under *Community Plugins*. Enter your Notion integration token in the plugin settings (create one via https://www.notion.so/my-integrations). **Do not share your token.**

### Building from source

1. Clone this repository and install dependencies with `pnpm install`.
2. Run `pnpm run build` to compile the TypeScript source into `dist/`.
3. Copy `manifest.json` and the `dist/` folder into your vault’s `.obsidian/plugins/notion-api-importer` directory.
4. Enable the plugin in Obsidian and configure your integration token as above.

## Development

- **Build:** `pnpm run build` — cleans and compiles the plugin into `dist/`.
- **Lint:** `pnpm run lint` — runs ESLint on the `src/` directory.
- **Format:** `pnpm run format` — applies Prettier formatting.
- **Test:** `pnpm test` — runs Jest test suites (none yet).
- **Release:** Tag a commit with a version like `v0.1.0` and push; GitHub Actions will build a zip and create a release.

## Roadmap

- [ ] Implement workspace discovery and block rendering.
- [ ] Convert databases into Bases YAML format.
- [ ] Download attachments to the configured attachments directory.
- [ ] Add tests and rollup configuration.

## License

MIT
