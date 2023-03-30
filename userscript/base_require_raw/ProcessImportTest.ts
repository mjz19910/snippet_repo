export namespace Test2 {
	export type T2_Type=ProcessImport<"./YTPlugin_HandleTypes.user">;
	export async function run_test() {
		const t3: T2_Type=await import("../youtube_plugin_raw/zc_child_modules/YTPlugin_HandleTypes.user.js");
		t3;
	}
}
