import {document_element_factory} from "./const.js";
import {FakeElement} from "./FakeElement.js";
import {
	intercept_setTimeoutAPI
} from "./setTimeout.js";
[
	FakeElement,
	intercept_setTimeoutAPI,
	document_element_factory,
];
export {
	intercept_setTimeoutAPI,
	FakeElement,
	document_element_factory,
};