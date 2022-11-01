import {BoxTemplate} from "../../template/BoxTemplate.js"

export abstract class TemporaryBoxTemplate<T extends void|Record<never, never>|(()=>void)> extends BoxTemplate<"temporary_box",T> {}
