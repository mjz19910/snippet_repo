import {Optional} from "./Optional.js";
import {StringView} from "./StringView.js";
import {Vector} from "./Vector.js";

export namespace HTML {
    export class CodePointEntity {
        entity: any;
        code_points!: Vector<number>;
        static from(v: StringView) {
            return new Optional(new this(v))
        }
        x;
        constructor(x: StringView){
            this.x=x;
        }
    }
    export function code_points_from_entity (v:StringView) {
        return CodePointEntity.from(v);
    }
}
