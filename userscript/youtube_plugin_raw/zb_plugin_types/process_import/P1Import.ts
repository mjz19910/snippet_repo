import {ProcessImport} from "../../../base_require_raw/ProcessImport.js";
import {S_AllImportPaths} from "./S_AllImportPaths.js";

export type P1Import<T extends S_AllImportPaths>=ProcessImport<T>;
