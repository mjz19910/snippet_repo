import {BoxTemplate} from "./template/BoxTemplate.ts";

export class CSSStyleSheetPromiseBox extends BoxTemplate<"promise_box",Promise<CSSStyleSheet>> {
	readonly type="promise_box";
	readonly inner_type="Promise<CSSStyleSheet>";
	readonly await_type="CSSStyleSheet";
}
