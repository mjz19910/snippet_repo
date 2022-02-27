import {RemoteWorkerMessage} from "./RemoteWorkerMessage";

export type RemoteWorkerMessage201 = {
	t: 201;
	v: {
		init(): void;
		onmessage(e: MessageEvent<RemoteWorkerMessage>): void;
	};
};
