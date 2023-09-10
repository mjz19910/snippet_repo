import {AsyncPluginEventDetail} from "../zb_plugin_types/types.js";

export type AsyncPluginInitEvent={
	type: "async-plugin-init";
	detail: AsyncPluginEventDetail;
	port: MessagePort;
};