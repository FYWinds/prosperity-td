import { Drawable } from "../drawable";
import { BaseScreen } from "../screens/baseScreen";

export interface Component extends Drawable {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  parent: Component | BaseScreen | null;
}
