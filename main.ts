import { Plugin } from "obsidian";
import { SettingsTab } from "./settings";
import { render } from './lilypond';


interface LilypondPluginSettings {
	path: string;
}

const DEFAULT_SETTINGS: Partial<LilypondPluginSettings> = {
	path: "/usr/local/bin/lilypond",
};

export default class LilypondPlugin extends Plugin {
	settings: LilypondPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SettingsTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("lily", (source, el) => {
			render(source, this.settings.path, el);
		})
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
