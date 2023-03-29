type ConnectionMessage={
	type: "tcp";
	flags: ConnectFlag;
	seq: number;
	ack: number|null;
	client_id: number;
	data: MessageType|ConnectionForward|null;
};
