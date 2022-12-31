import {UrlEndpointTargetType} from "./UrlEndpointTargetType";

export type UrlEndpointData={
	url: string;
}|{
	url: string;
	target: UrlEndpointTargetType;
};
