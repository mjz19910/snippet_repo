import {FakeNode} from "./FakeNode.js";

/**@implements {DocumentType} */
export class FakeDocumentType extends FakeNode {
    /**@type {string}*/
    get name() {throw new Error("NoImpl");}
    /**@type {string}*/
    get publicId() {throw new Error("NoImpl");}
    /**@type {string}*/
    get systemId() {throw new Error("NoImpl");}
    after() {throw new Error("NoImpl");}
    before() {throw new Error("NoImpl");}
    remove() {throw new Error("NoImpl");}
    replaceWith() {throw new Error("NoImpl");}
    /**@returns {Document} */
    get ownerDocument() {
        throw new Error("TODO");
    }
}
