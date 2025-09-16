import { App, Plugin, PluginSettingTab, Setting, Notice } from "obsidian";
import { importFromNotion, ImportOptions } from "./notionApiImporter";

interface NotionApiImporterSettings {
  notionToken: string;
}

const DEFAULT_SETTINGS: NotionApiImporterSettings = {
  notionToken: ""
};

export default class NotionApiImporterPlugin extends Plugin {
  settings: NotionApiImporterSettings;

  async onload() {
    await this.loadSettings();
    this.addRibbonIcon("download", "Import from Notion", () => this.runImport());
    this.addCommand({
      id: "import-notion-api",
      name: "Import from Notion API",
      callback: () => this.runImport()
    });
    this.addSettingTab(new NotionApiImporterSettingTab(this.app, this));
  }

  async runImport() {
    if (!this.settings.notionToken) {
      new Notice("Please configure your Notion integration token.");
      return;
    }
    const opts: ImportOptions = {
      attachmentsDir: "attachments",
      vaultPath: this.app.vault.adapter.getBasePath()
    };
    try {
      await importFromNotion(this.app, this.settings.notionToken, opts);
      new Notice("Notion import completed.");
    } catch (err) {
      console.error(err);
      new Notice("Notion import failed. See console for details.");
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class NotionApiImporterSettingTab extends PluginSettingTab {
  plugin: NotionApiImporterPlugin;
  constructor(app: App, plugin: NotionApiImporterPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Notion API Importer Settings" });

    new Setting(containerEl)
      .setName("Notion Integration Token")
      .setDesc("Enter the token from your Notion integration (keep it secret).")
      .addText(text => {
        text
          .setPlaceholder("secret_…")
          .setValue(this.plugin.settings.notionToken)
          .onChange(async value => {
            this.plugin.settings.notionToken = value.trim();
            await this.plugin.saveSettings();
          });
      });
  }
}
