type EventListenerInternal={
	listener: Function;
	once: boolean;
	passive: boolean;
	type: "string";
	useCapture: boolean;
};
