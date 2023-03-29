import {BoxTemplate} from "./template/BoxTemplate.js";

export class NullBox extends BoxTemplate<"null",null>  {
	readonly type="null";
}
