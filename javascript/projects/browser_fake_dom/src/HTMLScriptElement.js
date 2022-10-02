import {HTMLElement} from "./FakeHTMLElement.js"
export class HTMLScriptElement extends HTMLElement {
    base
    constructor() {
        super()
        this.tagName="SCRIPT"
        this.base={
            type: 'open_tag',
            depth: -1,
            tagName: this.tagName.toLowerCase(),
            param: [],
            children: [],
            dom_props: {
                src: "",
                async: false,
            }
        }
    }
    set src(v) {
        if(v) {
            this.base.dom_props.src=v
        } else {
            this.base.dom_props.src=""
        }
    }
    get src() {
        var b=this.base
        return b.dom_props.src
    }
    set async(v) {
        var b=this.base
        b.dom_props.async=v
    }
    get async() {
        var b=this.base
        return b.dom_props.async
    }
}
