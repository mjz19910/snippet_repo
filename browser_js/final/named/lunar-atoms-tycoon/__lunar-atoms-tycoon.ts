import {GameFunctions} from "./GameFunctions";
import {IUpgrade} from "./IUpgrade";

// lunar-atoms-tycoon.js
declare global {
	var Upgrade: IUpgrade;
	var gameFunctions: GameFunctions;
}
export {};
