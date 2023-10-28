import { ConnectionMessage } from "./ConnectionMessage.ts";

export type ConnectionForward={
	type: "forward";
	forwarded_by_id: number;
	data: ConnectionMessage;
};
