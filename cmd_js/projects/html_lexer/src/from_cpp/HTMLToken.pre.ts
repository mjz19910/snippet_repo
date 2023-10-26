import * as super_ from "../HTMLToken.ts";
import {move} from "../move.ts";
import {Optional} from "../Optional.ts";
import {OwnPtr} from "../OwnPtr.ts";
import {Vector} from "../Vector.ts";
import {Ref} from "./Ref.ts";

export function use_types() {
    let ex=[
        Optional,
        super_,
        Ref,
        OwnPtr,
        move,
        Vector,
    ] as const;
    return ex;
}
