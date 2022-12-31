import {BrowsePageResponseBase} from "./BrowsePageResponseBase";
import {BrowsePageResponseCsnInfo} from "./BrowsePageResponseCsnInfo";
import {BrowsePageResponseExpiryTime} from "./BrowsePageResponseExpiryTime";
import {BrowsePageResponseGraftedVes} from "./BrowsePageResponseGraftedVes";

export type BrowsePageResponse=BrowsePageResponseBase|BrowsePageResponseExpiryTime|BrowsePageResponseCsnInfo|BrowsePageResponseGraftedVes;
