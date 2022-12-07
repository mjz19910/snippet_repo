import * as super_ from "../HTMLToken.js";
import {move} from "../move.js";
import {Optional} from "../Optional.js";
import {OwnPtr} from "../OwnPtr.js";
import {Vector} from "../Vector.js";
import {Ref} from "./Ref.js";

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
