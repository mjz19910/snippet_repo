type ProcessImport<T extends S_AllImportPaths>=[T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>] extends [never]? {}:T extends `.${string}`? ProcessWorkingDirImport<T>:ProcessGlobalImport<T>;

async function test_ProcessImport() {
	type ProcessImport_Test1=ProcessImport<"../base_require_raw/BaseRequire.user">;
	type ProcessImport_Test2=ProcessWorkingDirImport<"../base_require_raw/BaseRequire.user">;
	const t1: ProcessImport_Test1=await import("../base_require_raw/BaseRequire.user.js");
	const t2: ProcessImport_Test2=t1;
	t2;
}
