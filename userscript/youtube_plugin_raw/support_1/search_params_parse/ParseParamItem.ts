import {ParseParam} from "./ParseParam.ts";

export type ParseParamItem<T extends string>=T extends `${infer U}&${infer Z}`? ParseParam<U>&ParseParamItem<Z>:T extends `${infer U}`? ParseParam<U>:never;
