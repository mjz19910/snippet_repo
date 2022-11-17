// 0 "HTMLToken.cppts"
// 0 "<built-in>"
// 0 "<command-line>"
// 1 "HTMLToken.cppts"
// 1 "HTMLToken.pre.ts" 1
import {HTMLTokenBase} from "./HTMLTokenBase.js";
import {Optional} from "./Optional.js";
import {Variant} from "./Variant.js";

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
// 2 "HTMLToken.cppts" 2






export class HTMLToken extends HTMLTokenBase {
    opt(): Optional<HTMLToken> {
        return new Optional(this);
    }
}
