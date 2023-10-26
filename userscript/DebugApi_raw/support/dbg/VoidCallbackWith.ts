import {VoidCallback} from "./VoidCallback.ts";


export type VoidCallbackWith<T extends (...args: unknown[]) => unknown>=VoidCallback<Parameters<T>,ReturnType<T>>;
