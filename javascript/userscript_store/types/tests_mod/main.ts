import {run_tests as ecma_12_8_6_run_tests} from "../ecma_262/section_12_8_6";
import {run_tests as ecma_12_6_run_tests} from "../ecma_262/section_12_6";
import {run_tests as ecma_terminal_run_tests} from "../ecma_262/section_12";
import {TestRunner} from "./TestRunner";
import {do_runner_start_test} from "./do_runner_start_test";
export async function mod_entry(): Promise<void> {
	let run = new TestRunner;
	console.log(` --- Starting tests --- `);
	do_runner_start_test(run, "section_12_8_6", ecma_12_8_6_run_tests);
	do_runner_start_test(run, "ecma_12_8_6", ecma_12_8_6_run_tests);
	do_runner_start_test(run, "ecma_12_6", ecma_12_6_run_tests);
	do_runner_start_test(run, "ecma_terminal", ecma_terminal_run_tests);
	await run.wait();
	run.on_done();
}
