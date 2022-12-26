import {CommandToken} from "./CommandToken";

export type ContinuationCommand=CommandToken&{
	request: string;
};
