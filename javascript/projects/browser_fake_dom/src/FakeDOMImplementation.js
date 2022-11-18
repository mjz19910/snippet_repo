import {fake} from "./fake.js";
import {FakeDocument} from "./FakeDocument.js";
import {FakeDocumentType} from "./FakeDocumentType.js";
import {get_FakeXMLDocument} from "./FakeXMLDocument.js";
import {BaseBadge} from "./BaseBadge.js";

export async function get_FakeDOMImplementation() {
    let FakeXMLDocument=await get_FakeXMLDocument();
    return FakeDOMImplementation;
}