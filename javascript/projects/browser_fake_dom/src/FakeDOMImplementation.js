import {fake} from "./fake.js/index.js";
import {FakeDocument} from "./FakeDocument.js";
import {FakeDocumentType} from "./FakeDocumentType";
import {get_FakeXMLDocument} from "./FakeXMLDocument";
import {BaseBadge} from "./BaseBadge.js/index.js";

export function get_FakeDOMImplementation() {
    let FakeXMLDocument=get_FakeXMLDocument();
    /**@implements {DOMImplementation} */
    class FakeDOMImplementation {
        X=new DOMImplementation;
        /**@type {"html"} */
        element_type_tag="html";
        /**
         * @returns {XMLDocument}
         * @param {string|null} namespace
         * @param {string | null} qualName
         * @param {DocumentType | null | undefined} doctype
         */
        createDocument(namespace,qualName,doctype) {
            let v=false;
            if(v) {
                this.X.createDocument(namespace,qualName,doctype);
            }
            new FakeXMLDocument(fake.window,new BaseBadge);
            throw new Error("TODO");
        }
        /**
         * @param {any} qualifiedName
         * @param {any} publicId
         * @param {any} systemId
         */
        createDocumentType(qualifiedName,publicId,systemId) {
            let v=false;
            if(v) {
                this.X.createDocumentType(qualifiedName,publicId,systemId);
            }
            return new FakeDocumentType({});
        }
        /**
         * @param {string} title
         */
        createHTMLDocument(title) {
            if(!fake.window) throw new Error("");
            let v=false;
            if(v) {
                this.X.createHTMLDocument(title);
            }
            let new_document=new FakeDocument(fake.window,new BaseBadge);
            new_document.m_title=title;
            return new_document;
        }
        /** @param {any[]} args @returns {true} */
        hasFeature(...args) {
            console.log('has feature request',...args,"pretending that it is supported");
            return true;
        }
    }
    return FakeDOMImplementation;
}