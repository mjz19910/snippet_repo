import {StringView} from "./StringView.js";
import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";

export class Utf8View {
    /** @param {Utf8CodePointIterator} m_prev_utf8_iterator */
    byte_offset_of(m_prev_utf8_iterator) {
        return m_prev_utf8_iterator.pos;
    }
    begin() {
        let iter=new Utf8CodePointIterator;
        iter.target=this.m_value;
        iter.pos=0;
        return iter;
    }
    /**@arg {StringView} m_decoded_input */
    static from(m_decoded_input) {
        let val=new this;
        val.m_value=m_decoded_input;
        return val;
    }
    m_value=new StringView;
    end() {
        let iter=new Utf8CodePointIterator;
        iter.target=this.m_value;
        iter.pos=this.m_value.length;
        return iter;
    }
}
