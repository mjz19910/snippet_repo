type AsyncPluginInitEvent={
	type: "async-plugin-init";
	detail: AsyncPluginEventDetail;
	port: MessagePort;
};
