import {ProcessImport} from "../exports.js";
import {S_AllImportPaths} from "./S_AllImportPaths.js";

export type P1Import<T extends S_AllImportPaths>=ProcessImport<T>;
