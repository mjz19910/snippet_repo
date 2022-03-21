import {document_element_factory} from "./const.js";
import {
	intercept_setTimeoutAPI
} from "./setTimeout.js";
[
	intercept_setTimeoutAPI,
	document_element_factory,
];
export {
	intercept_setTimeoutAPI,
	document_element_factory,
};