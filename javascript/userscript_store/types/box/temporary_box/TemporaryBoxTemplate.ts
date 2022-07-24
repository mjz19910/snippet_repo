import {BoxTemplate} from "../BoxTemplate"
export abstract class TemporaryBoxTemplate<T extends void|object|Function> extends BoxTemplate<"temporary_box",T> {}
