import {ProcessImport} from "../../base_require_raw/ProcessImport.ts";

export async function imp_test() {
	const t3: ProcessImport<"./YTPlugin_HandleTypes.user">=await import("./YTPlugin_HandleTypes.user.js");
	t3;
}
