import {ProcessImport} from "../../../base_require_raw/ProcessImport.ts";
import {S_AllImportPaths} from "./S_AllImportPaths.ts";

export type P1Import<T extends S_AllImportPaths>=ProcessImport<T>;
