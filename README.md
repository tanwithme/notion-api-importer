# Notion API Importer for Obsidian

This repository contains an Obsidian plugin that imports notes and databases from Notion via the official Notion API. It converts pages to Obsidian‑flavored Markdown and transforms Notion databases into Obsidian Bases (`.base` files) so you can work with your structured data natively in Obsidian.

## Features

- Authenticate with a Notion internal integration token.
- Progressive download of Notion pages and databases.
- Converts Notion rich text (headings, lists, code blocks, etc.) to Obsidian Markdown.
- Downloads attachments (images, files) into your vault's attachments folder.
- Converts Notion databases into folders of Markdown notes with YAML front‑matter and generates `.base` files with views, filters and sorts approximating your original database.
- Resolves cross‑note links between pages and relations.
- Logs progress to a human‑readable `notion-import.log` file in your vault.

## Installation

### Using the prebuilt plugin

To get started quickly, download [notion-api-importer.zip](./notion-api-importer.zip) from this repository and extract it into your Obsidian vault's `.obsidian/plugins` directory:

    # Navigate to your vault
    cd path/to/your/vault/.obsidian/plugins

    # Extract the plugin (this will create a notion-api-importer folder)
    unzip /path/to/notion-api-importer.zip -d notion-api-importer

Restart Obsidian or reload plugins, and enable **Notion API Importer** from the **Community Plugins** settings.

### Building from source

If you prefer to inspect or modify the source code:

1. Clone this repository:

    git clone https://github.com/tanwithme/notion-api-importer.git
    cd notion-api-importer

2. Install dependencies and compile the TypeScript sources:

    npm install
    npm run build

3. Copy the resulting plugin into your vault's plugins folder:

    cp -r dist manifest.json path/to/your/vault/.obsidian/plugins/notion-api-importer/

## Usage

1. In Obsidian, open **Settings → Community Plugins** and enable **Notion API Importer**.
2. Open **Settings → Notion API Importer**. Paste your Notion internal integration token into the **Notion Integration Token** field. You can create an internal integration from Notion's My Integrations. The integration needs **read** permissions.
3. Click the ribbon icon or run the command **Import from Notion API** to start the import. Depending on the size of your workspace, this may take several minutes. Progress is written to `notion-import.log` at the root of your vault.

Imported pages will appear as Markdown files in your vault. Notion databases will appear as folders containing notes for each row plus a `.base` file describing the views. Attachments will be downloaded into `attachments/` in your vault (configurable via the code).

## Contributing

PRs and feedback are welcome! Feel free to open issues or submit pull requests to improve this importer.

## License

MIT
