import {GhostGridRenderer} from "../g/GhostGridRenderer.js";
import {VoiceSearchDialogRenderer} from "../o/VoiceSearchDialogRenderer.js";
import {YtTextType} from "../s/YtTextType.js";
import {MakeRenderer} from "./MakeRenderer";

export type GenericRenderer=MakeRenderer<"",[never,never]>[""]|VoiceSearchDialogRenderer|GhostGridRenderer|MakeRenderer<"notificationActionRenderer",["responseText",YtTextType]>;
