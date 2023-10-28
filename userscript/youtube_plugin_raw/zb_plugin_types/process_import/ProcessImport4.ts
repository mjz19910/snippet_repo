import {RequireModuleCache} from "../../../base_require_raw/RequireModuleCache.ts";
import {MatchType_Import_Mod} from "./MatchType_Import_Mod.ts";

export type ProcessImport4<T extends MatchType_Import_Mod>=RequireModuleCache[`${T[0]}$${T[1]}`];
