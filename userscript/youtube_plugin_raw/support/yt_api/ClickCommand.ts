import {UrlEndpoint} from "./UrlEndpoint";
import {CommandMetadata} from "./CommandMetadata";


export type ClickCommand={
	clickTrackingParams: string;
	"commandMetadata": CommandMetadata;
	"urlEndpoint": UrlEndpoint;
};
