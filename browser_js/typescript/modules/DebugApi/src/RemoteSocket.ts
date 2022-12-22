import {RemoteHandler} from "./RemoteHandler";

export class RemoteSocket {
	constructor(
		public port: MessagePort,
		public handler: RemoteHandler,
		public client_id: number,
		public first_event: MessageEvent<unknown>
	) {}
}
