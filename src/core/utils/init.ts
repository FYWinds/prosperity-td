import { GameScreen } from '../ui/screens/gameScreen';
import { HelpScreen } from '../ui/screens/helpScreen';
import { MainScreen } from '../ui/screens/mainScreen';
import { ScreenManager } from '../ui/screens/screenManager';
import { SettingScreen } from '../ui/screens/settingScreen';
import SettingsStore from './settings';

let initialized = false;

export function initGame() {
    if (initialized) return;

    SettingsStore.getInstance().loadSettingsFromCookies();

    const mainScreen = new MainScreen();
    const helpScreen = new HelpScreen();
    const settingScreen = new SettingScreen();
    const gameScreen = new GameScreen();

    ScreenManager.registerScreen(mainScreen);
    ScreenManager.registerScreen(helpScreen);
    ScreenManager.registerScreen(settingScreen);
    ScreenManager.registerScreen(gameScreen);

    ScreenManager.showScreen(mainScreen);
    initialized = true;
}
