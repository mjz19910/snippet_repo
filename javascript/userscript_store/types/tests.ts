import {run_tests as ecma_12_8_6_run_tests} from "./vm/ecma_12_8_6";
import {run_tests as ecma_12_6_run_tests} from "./vm/ecma_12_6";

function main():void {
	ecma_12_8_6_run_tests();
	ecma_12_6_run_tests();
}
main();
