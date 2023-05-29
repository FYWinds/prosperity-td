import { HelpScreen } from "../ui/screens/helpScreen";
import { MainScreen } from "../ui/screens/mainScreen";
import { ScreenManager } from "../ui/screens/screenManager";
import { SettingScreen } from "../ui/screens/settingScreen";

export function initGame() {
    new MainScreen();
    new HelpScreen();
    new SettingScreen();
    ScreenManager.registerScreen(MainScreen.instance);
    ScreenManager.registerScreen(HelpScreen.instance);
    ScreenManager.registerScreen(SettingScreen.instance);
    ScreenManager.showScreen(MainScreen.instance);
}