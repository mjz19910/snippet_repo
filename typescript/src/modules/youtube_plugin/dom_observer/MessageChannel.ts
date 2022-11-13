import {ReadonlyMessageChannel} from "./ReadonlyMessageChannel";

export interface MessageChannel {
	value: Readonly<ReadonlyMessageChannel>|null;
}
