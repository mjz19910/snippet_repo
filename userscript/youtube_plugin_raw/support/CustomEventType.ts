type CustomEventType={
	type: "async-plugin-init";
	detail: {
		handle_types_fut: import("../youtube_plugin.user.js").Future<any,import("../youtube_plugin.user.js").HandleTypes>;
	};
	port: MessagePort;
}|{
	type: "plugin-activate";
	port: MessagePort;
};
