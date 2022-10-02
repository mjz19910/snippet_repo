import {FakeEventTarget} from "./EventTarget.js"
export class Node extends FakeEventTarget {
    constructor() {
        var x={}
        super(x)
    }
}
