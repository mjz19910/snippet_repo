import { HTMLTokenBase } from "./HTMLTokenBase.js";
import { Optional } from "./Optional.js";
export class HTMLToken extends HTMLTokenBase {
    opt() {
        return new Optional(this);
    }
}
(function (HTMLToken) {
    class Attribute {
        prefix;
        local_name = "";
        namespace_;
        value = "";
        name_start_position = new Position(0, 0);
        value_start_position = new Position(0, 0);
        name_end_position = new Position(0, 0);
        value_end_position = new Position(0, 0);
    }
    HTMLToken.Attribute = Attribute;
    let Type;
    (function (Type) {
        Type[Type["Invalid"] = 0] = "Invalid";
        Type[Type["DOCTYPE"] = 1] = "DOCTYPE";
        Type[Type["StartTag"] = 2] = "StartTag";
        Type[Type["EndTag"] = 3] = "EndTag";
        Type[Type["Comment"] = 4] = "Comment";
        Type[Type["Character"] = 5] = "Character";
        Type[Type["EndOfFile"] = 6] = "EndOfFile";
    })(Type = HTMLToken.Type || (HTMLToken.Type = {}));
    class Position {
        static from(arg0, arg1) {
            return new this(arg0, arg1);
        }
        column;
        line;
        constructor(column, line) {
            this.column = column;
            this.line = line;
        }
    }
    HTMLToken.Position = Position;
})(HTMLToken || (HTMLToken = {}));
