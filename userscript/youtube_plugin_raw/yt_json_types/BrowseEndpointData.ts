import {BrowseIdType} from "./BrowseIdType";

export type BrowseEndpointData={
	browseId: BrowseIdType;
}|{
	browseId: BrowseIdType;
	params: string;
};
