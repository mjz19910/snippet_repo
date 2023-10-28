import {H} from "../Helpers.ts";

export function take<T extends H.ItemShape>(x: T): H.TakeAction<T> {return {fn: "take",item: x};}
