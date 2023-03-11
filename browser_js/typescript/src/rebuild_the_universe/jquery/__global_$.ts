import {JQueryStatic} from "./JQueryStatic";

declare global {
	interface Window {
		$?: JQueryStatic;
	}
}
