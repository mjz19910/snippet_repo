import {BaseTestRunner} from "./BaseTestRunner.ts";

export type GenTestCallbackTemplate<T extends any[],U>=(test_runner: BaseTestRunner, args: T) => U;
