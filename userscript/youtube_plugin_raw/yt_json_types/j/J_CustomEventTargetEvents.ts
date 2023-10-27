// deno-lint-ignore-file
import {AsyncPluginInitEvent} from "../../support_1/AsyncPluginInitEvent.ts";
import {PluginActivateEvent} from "../../support_1/PluginActivateEvent.ts";
import {CustomEventTarget} from "../../zc_child_modules/YTPlugin_Base.user.js";

export type J_CustomEventTargetEvents={
	"async-plugin-init"?: ((this: CustomEventTarget,event: AsyncPluginInitEvent) => void)[];
	"plugin-activate"?: ((this: CustomEventTarget,event: PluginActivateEvent) => void)[];
};
export type J_HandlerInfoArgs=
	|["async-plugin-init",(this: CustomEventTarget,event: AsyncPluginInitEvent) => void]
	|["plugin-activate",(this: CustomEventTarget,event: PluginActivateEvent) => void]
	;
;