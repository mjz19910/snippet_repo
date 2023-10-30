export type TargetedMessage<T>={
	target: "ServerSocket";
	message: T;
	port: MessagePort;
};
