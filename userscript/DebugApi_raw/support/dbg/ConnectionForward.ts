import { ConnectionMessage } from "./ConnectionMessage.ts";

export type ConnectionForward={
	type: "forward";
	client_id_path: [number,number][];
	data: ConnectionMessage|null;
};
