import {BoxTemplate} from "./template/BoxTemplate.ts";

export class StringBox extends BoxTemplate<"string",string> {
	readonly type="string";
}
