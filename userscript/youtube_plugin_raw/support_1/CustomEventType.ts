import {AsyncPluginInitEvent} from "./AsyncPluginInitEvent.js";
import {PluginActivateEvent} from "./PluginActivateEvent.js";

export type CustomEventType=AsyncPluginInitEvent|PluginActivateEvent;
