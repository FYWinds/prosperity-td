import { GameScreen } from '../ui/screens/gameScreen';
import { HelpScreen } from '../ui/screens/helpScreen';
import { MainScreen } from '../ui/screens/mainScreen';
import { ScreenManager } from '../ui/screens/screenManager';
import { SettingScreen } from '../ui/screens/settingScreen';

export function initGame() {
    const mainScreen = new MainScreen();
    const helpScreen = new HelpScreen();
    const settingScreen = new SettingScreen();
    const gameScreen = new GameScreen();

    ScreenManager.registerScreen(mainScreen);
    ScreenManager.registerScreen(helpScreen);
    ScreenManager.registerScreen(settingScreen);
    ScreenManager.registerScreen(gameScreen);

    ScreenManager.showScreen(mainScreen);
}
