import {RequireModuleCache} from "../../../_module_cache/RequireModuleCache.js";
import {MatchType_Import_Mod} from "./MatchType_Import_Mod.js";

export type ProcessImport4<T extends MatchType_Import_Mod>=RequireModuleCache[`${T[0]}$${T[1]}`];
