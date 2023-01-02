type CustomEventType={
	type: "async-plugin-init";
	detail: {
		handle_types_fut: Future<any,HandleTypes>;
	};
	port: MessagePort;
}|{
	type: "plugin-activate";
	port: MessagePort;
};
