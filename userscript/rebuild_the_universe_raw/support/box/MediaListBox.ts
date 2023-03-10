import {BoxTemplate} from "./template/BoxTemplate.js";

export class MediaListBox extends BoxTemplate<"instance_box",MediaList> {
	readonly type="instance_box";
	readonly instance_type="MediaList";
}
