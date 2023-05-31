export default class SettingsStore {
    private static instance: SettingsStore;
    private settings: Record<string, string>;

    private constructor() {
        this.settings = {};
    }

    public static getInstance(): SettingsStore {
        if (!SettingsStore.instance) {
            SettingsStore.instance = new SettingsStore();
        }
        return SettingsStore.instance;
    }

    public getSetting(key: string): string | undefined {
        return this.settings[key];
    }

    public setSetting(key: string, value: string): void {
        this.settings[key] = value;
        this.saveSettingsToCookies();
    }

    private saveSettingsToCookies(): void {
        const settingsString = JSON.stringify(this.settings);
        document.cookie = `settings=${settingsString}`;
    }

    public loadSettingsFromCookies(): void {
        const cookies = document.cookie.split(';');
        const settingsCookie = cookies.find((cookie) =>
            cookie.trim().startsWith('settings=')
        );
        if (settingsCookie) {
            const settingsString = settingsCookie.split('=')[1];
            this.settings = JSON.parse(settingsString);
        }
    }
}
