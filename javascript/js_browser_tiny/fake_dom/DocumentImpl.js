import {fake} from "fake-dom-browse";
import {DOMBadge} from "fake-dom-implementation";
import {FakeDocument} from "./FakeDocument.js";
import {FakeNode} from "./FakeNode.js";

/**@implements {DocumentType} */
class FakeDocumentType extends FakeNode {
    /**
     * @type {any}
     */
    name;
    /**
     * @type {any}
     */
    publicId;
    /**
     * @type {any}
     */
    systemId;
    /**
     * @type {any}
     */
    after;
    /**
     * @type {any}
     */
    before;
    /**
     * @type {any}
     */
    remove;
    /**
     * @type {any}
     */
    replaceWith;
    /**@returns {Document} */
    get ownerDocument() {
        throw new Error("TODO");
    }
}
/**@implements {DOMImplementation} */
export class DocumentImpl {
    /**@type {"html"} */
    element_type_tag = "html";
    /**
     * @returns {XMLDocument}
     * @param {any} namespace
     * @param {any} qualName
     * @param {any} doctype
     */
    createDocument(namespace, qualName, doctype) {
        namespace;
        qualName;
        doctype;
        throw new Error("TODO");
    }
    /**
     * @param {any} qualifiedName
     * @param {any} publicId
     * @param {any} systemId
     */
    createDocumentType(qualifiedName, publicId, systemId) {
        qualifiedName;
        publicId;
        systemId;
        return new FakeDocumentType({});
    }
    /**
     * @param {any} title
     */
    createHTMLDocument(title){
        if(!fake.window)throw new Error("");
        /**@type {any} */
        let vv=new FakeDocument(fake.window, new DOMBadge);
        /**@type {Document} */
        let v_real=vv;
        return v_real;
    }
    /**
     * @returns {true}
     * @param {any[]} args
     */
    hasFeature(...args) {
        console.log('has feature request', ...args, "pretending that it is supported");
        return true;
    }
}
