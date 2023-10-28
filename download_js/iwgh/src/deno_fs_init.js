import { expected_cwd } from "./file_paths.js";
export function deno_fs_init() {
	const cur_cwd = Deno.cwd();
	if (cur_cwd !== expected_cwd) Deno.chdir(expected_cwd);
	return Deno.mkdir("data", { recursive: true });
}
