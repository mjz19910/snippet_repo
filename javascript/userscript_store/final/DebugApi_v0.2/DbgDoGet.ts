import {DbgGetRes} from "./DbgGetRes";

export interface DbgDoGet {
	get(x: string): DbgGetRes;
}
