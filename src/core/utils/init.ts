import { CreditScreen } from '../ui/screens/creditScreen';
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

    ScreenManager.registerScreen(MainScreen.instance);
    ScreenManager.registerScreen(HelpScreen.instance);
    ScreenManager.registerScreen(SettingScreen.instance);
    ScreenManager.registerScreen(GameScreen.instance);
    ScreenManager.registerScreen(CreditScreen.instance);

    ScreenManager.showScreen(MainScreen.instance);
    initialized = true;
}
