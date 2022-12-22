import {VoidCallback} from "./VoidCallback";


export type VoidCallbackWith<T extends (...args: any[]) => any>=VoidCallback<Parameters<T>,ReturnType<T>>;
