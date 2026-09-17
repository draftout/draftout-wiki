import { createElement } from "react";
import {
  Apple,
  Blocks,
  Boxes,
  ChartNoAxesCombined,
  CircleHelp,
  Compass,
  Dices,
  Eye,
  Flag,
  FlaskConical,
  Gamepad2,
  List,
  Map,
  PawPrint,
  Pickaxe,
  Play,
  Settings,
  Shapes,
  Shirt,
  Skull,
  Swords,
  Target,
  Trophy,
  Users,
} from "lucide-react";

const icons = {
  Apple,
  Blocks,
  Boxes,
  ChartNoAxesCombined,
  CircleHelp,
  Compass,
  Dices,
  Eye,
  Flag,
  FlaskConical,
  Gamepad2,
  List,
  Map,
  PawPrint,
  Pickaxe,
  Play,
  Settings,
  Shapes,
  Shirt,
  Skull,
  Swords,
  Target,
  Trophy,
  Users,
};

export function resolveWikiIcon(name: string | undefined) {
  if (!name || !Object.hasOwn(icons, name)) return undefined;
  return createElement(icons[name as keyof typeof icons], { "aria-hidden": true });
}
