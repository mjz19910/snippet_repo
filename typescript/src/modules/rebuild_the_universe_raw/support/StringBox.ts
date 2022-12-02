import {BoxTemplate} from "./template/BoxTemplate.js";

export class StringBox extends BoxTemplate<"string",string> {
	readonly type="string";
}
