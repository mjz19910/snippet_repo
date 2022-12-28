import {ParseUrlSearchParams} from "../search_params_parse/SearchParamsParse.js";
import {Decay} from "./Decay";
import {vv} from "./index";

export type url2_SearchParams_obj=Decay<ParseUrlSearchParams<typeof vv['search']>>;
