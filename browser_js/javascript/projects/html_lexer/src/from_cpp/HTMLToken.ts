// 0 "from_cpp/HTMLToken.cppts"
// 0 "<built-in>"
// 0 "<command-line>"
// 1 "from_cpp/HTMLToken.cppts"
import {HTMLTokenBase} from "../HTMLTokenBase.js";
// 1 "from_cpp/HTMLToken.pre.ts" 1
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
// 3 "from_cpp/HTMLToken.cppts" 2
// 1 "from_cpp/VERIFY.cppts" 1
function ak_verification_failed(msg: string) {
    throw new Error("Verify failure:"+msg);
}
// 4 "from_cpp/HTMLToken.cppts" 2

export class HTMLToken extends HTMLTokenBase {
    opt(): Optional<HTMLTokenBase> {
        return new Optional(this);
    }
    override add_attribute(attribute: super_.HTMLToken.Attribute) {
        (!(this.is_start_tag() || this.is_end_tag()) ? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()","\n","from_cpp/HTMLToken.cppts",":","10"].join("")) : void 0);
        this.ensure_tag_attributes().deref().append(move(attribute));
    }
    override ensure_tag_attributes(): Ref<Vector<HTMLTokenBase.Attribute>> {
        (!(this.is_start_tag() || this.is_end_tag()) ? ak_verification_failed(["this.is_start_tag() || this.is_end_tag()","\n","from_cpp/HTMLToken.cppts",":","14"].join("")) : void 0);
        // 3 == OwnPtr<Vector<Attribute>>
        let ptr: Ref<OwnPtr<Vector<HTMLTokenBase.Attribute>>> = Ref.wrap(this.m_data.get<3>().deref());
        if (ptr.is_null())
            ptr.assign(Ref.wrap(new Vector<HTMLTokenBase.Attribute>()).deref());
        return Ref.wrap_vec(ptr.deref().deref());
    }
}
