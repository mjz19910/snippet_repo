import {HTMLTokenBase} from "./HTMLTokenBase.js";
import {Optional} from "./Optional.js";

export class HTMLToken extends HTMLTokenBase {
    opt(): Optional<HTMLTokenBase> {
        return new Optional(this);
    }
}

export namespace HTMLToken {
    export class Attribute {
        prefix!: string;
        local_name="";
        namespace_!: string;
        value="";
        name_start_position=new Position(0,0);
        value_start_position=new Position(0,0);
        name_end_position=new Position(0,0);
        value_end_position=new Position(0,0);
    }

    export enum Type {
        Invalid,
        DOCTYPE,
        StartTag,
        EndTag,
        Comment,
        Character,
        EndOfFile
    }

    export class Position {
        static from(arg0: number,arg1: number) {
            return new this(arg0,arg1);
        }
        column;
        line;
        constructor(column: number,line: number) {
            this.column=column;
            this.line=line;
        }
    }
}
