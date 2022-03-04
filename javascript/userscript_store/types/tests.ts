import {run_tests as ecma_12_8_6_run_tests} from "./ecma_262/section_12_8_6";
import {run_tests as ecma_12_6_run_tests} from "./ecma_262/section_12_6";
import {run_tests as ecma_terminal_run_tests} from "./ecma_262/section_12";
import {mod_entry} from "./tests_mod/main";
mod_entry([
	["section_12_8_6", ecma_12_8_6_run_tests]
])
