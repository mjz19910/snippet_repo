import {MessageType} from "./MessageType.js";

export type ConnectionForward={
	type: "forward";
	client_id_path: [number,number,null][];
	data: MessageType|null;
};
