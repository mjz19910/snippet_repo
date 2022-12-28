import {ServiceEndpointCreateComment} from "../c/ServiceEndpointCreateComment";
import {TextRunsSimple} from "../t/TextRunsSimple.js";

export type SubmitButtonRenderer={
	style: "STYLE_PRIMARY";
	size: "SIZE_DEFAULT";
	text: TextRunsSimple;
	serviceEndpoint: ServiceEndpointCreateComment;
	accessibility: {
		label: "Comment";
	};
	trackingParams: string;
};
