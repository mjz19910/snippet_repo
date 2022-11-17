import {HTMLTokenBase} from "./HTMLTokenBase.js";
import {Optional} from "./Optional.js";
import {Variant} from "./Variant.js";
import {cpp__stringify} from "./__stringify";

type u32=number;

export function use_types() {
    let u_types:u32|null=null;
    let ex=[
        u_types,
        Variant,
        Optional,
        HTMLTokenBase,
    ] as const;
    return ex;
}
