type WrappedMessage<T>={
	type: typeof import("../../DebugApi.user.js").post_message_connect_message_type;
	data: T;
};
