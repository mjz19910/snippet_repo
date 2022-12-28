import {NavigationEndpoint} from "../n/NavigationEndpoint.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {makeText} from "./makeText";
import {MakeTextRuns} from "./MakeTextRuns";
import {InfoIcon} from "./InfoIcon";


export interface MenuNavigationItemRendererData extends TrackingParams {
	text: MakeTextRuns<[makeText<"My Ad Centre">]>;
	icon: InfoIcon;
	navigationEndpoint: NavigationEndpoint;
}
