import moment from "moment";
import {ProcessImport,MatchType_Import1} from "../exports.js";

export type Import_BadResult=Exclude<ProcessImport<MakeImportPath<MatchType_Import1>>,BaseModuleType|typeof moment>;
