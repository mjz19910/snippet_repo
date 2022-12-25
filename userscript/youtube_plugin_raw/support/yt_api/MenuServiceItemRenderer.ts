import {ServiceEndpoint} from "./ServiceEndpoint";
import {Icon,TextRuns} from "./__global";

export type MenuServiceItemRenderer={
	icon: Icon;
	serviceEndpoint: ServiceEndpoint;
	text: TextRuns;
	trackingParams?: string;
	hasSeparator?: boolean;
};
