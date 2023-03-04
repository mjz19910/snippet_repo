type J_CustomEventTargetEvents={
	"async-plugin-init"?: ((this: CustomEventTarget,event: AsyncPluginInitEvent) => void)[];
	"plugin-activate"?: ((this: CustomEventTarget,event: PluginActivateEvent) => void)[];
};
type J_HandlerInfoArgs=
	|["async-plugin-init",(this: CustomEventTarget,event: AsyncPluginInitEvent) => void]
	|["plugin-activate",(this: CustomEventTarget,event: PluginActivateEvent) => void]
	;
;