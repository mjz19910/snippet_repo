import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";

export class Utf8View {
    m_value=[];
    end() {
        return new Utf8CodePointIterator(this.m_value,this.m_value.length);
    }
}
