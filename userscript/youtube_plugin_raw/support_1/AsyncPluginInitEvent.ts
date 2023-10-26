import {AsyncPluginEventDetail} from "../zb_plugin_types/types.ts";

export type AsyncPluginInitEvent={
	type: "async-plugin-init";
	detail: AsyncPluginEventDetail;
	port: MessagePort;
};