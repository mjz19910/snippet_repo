import {BoxTemplate} from "./template/BoxTemplate.ts";

export class NullBox extends BoxTemplate<"null",null>  {
	readonly type="null";
}
