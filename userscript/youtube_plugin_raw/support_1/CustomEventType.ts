import {AsyncPluginInitEvent} from "./AsyncPluginInitEvent.ts";
import {PluginActivateEvent} from "./PluginActivateEvent.ts";

export type CustomEventType=AsyncPluginInitEvent|PluginActivateEvent;
