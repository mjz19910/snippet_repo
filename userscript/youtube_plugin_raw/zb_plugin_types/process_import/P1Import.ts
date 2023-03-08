import {S_AllImportPaths} from "./S_AllImportPaths.js";
import {ProcessImport} from "./ProcessImport.js";

export type P1Import<T extends S_AllImportPaths>=ProcessImport<T>;
