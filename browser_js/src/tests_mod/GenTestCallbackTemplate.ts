import {BaseTestRunner} from "./BaseTestRunner.js";

export type GenTestCallbackTemplate<T extends any[],U>=(test_runner: BaseTestRunner, args: T) => U;
