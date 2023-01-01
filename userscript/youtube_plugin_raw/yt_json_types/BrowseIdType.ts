import {SettingsEndpointPages} from "../support/yt_api/_/s/SettingsEndpointPages.js";
import {BrowseEndpointPages} from "./BrowseEndpointPages";
export type BrowseIdType=`FE${BrowseEndpointPages}`|`VL${string}`|`UC${string}`|`SP${SettingsEndpointPages}`;