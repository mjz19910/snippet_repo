import {ServiceEndpointCreateComment} from "./ServiceEndpointCreateComment";
import {TextRunsSimple} from "./TextRunsSimple.js";

export type SubmitButton={
	buttonRenderer: {
		style: "STYLE_PRIMARY";
		size: "SIZE_DEFAULT";
		text: TextRunsSimple;
		serviceEndpoint: ServiceEndpointCreateComment;
		accessibility: {
			label: "Comment";
		};
		trackingParams: string;
	};
};
