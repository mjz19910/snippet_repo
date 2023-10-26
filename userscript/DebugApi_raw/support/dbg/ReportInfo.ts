import {ConnectionMessage} from "./ConnectionMessage.ts";

export type ReportInfo<T>={
	data: ConnectionMessage;
	handler: T;
};
