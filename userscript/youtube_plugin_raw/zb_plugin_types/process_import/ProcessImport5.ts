import {MatchType_Import_Raw} from "./MatchType_Import_Raw.js";

export type ProcessImport5<T extends MatchType_Import_Raw>=T[1] extends keyof PluginStore? PluginStore[T[1]]:T;
