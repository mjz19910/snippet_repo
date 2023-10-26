import {CM} from "./CM.ts";

export type msg_ev_01=CM<MessageEvent<{
	type: string;
	data: unknown;
}>>|null;
