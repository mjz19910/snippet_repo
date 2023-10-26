import {RequireModuleCache} from "../../../_module_cache/RequireModuleCache.ts";
import {MatchType_Import_Raw} from "../MatchType_Import_Raw.ts";

export type ProcessImport5<T extends MatchType_Import_Raw>=T[1] extends keyof RequireModuleCache? RequireModuleCache[T[1]]:T;
