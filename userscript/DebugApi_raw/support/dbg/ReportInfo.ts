import {ConnectionMessage} from "./ConnectionMessage.js";

export type ReportInfo<T>={
	data: ConnectionMessage;
	handler: T;
};
