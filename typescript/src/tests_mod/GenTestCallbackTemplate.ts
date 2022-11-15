import {BaseTestRunner} from "./BaseTestRunner.js";

export type GenTestCallbackTemplate<T>=(test_runner: BaseTestRunner, extra_arg: T) => void
