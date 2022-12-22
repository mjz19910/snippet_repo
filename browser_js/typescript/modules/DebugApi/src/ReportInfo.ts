import {RemoteOriginMessage} from "./RemoteOriginMessage";

export class ReportInfo<T> {
	constructor(
		public event: MessageEvent<RemoteOriginMessage>,
		public handler: T
	) {}
}
