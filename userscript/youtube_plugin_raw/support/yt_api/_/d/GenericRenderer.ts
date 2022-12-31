import {GhostGridRenderer} from "../g/GhostGridRenderer.js";
import {VoiceSearchDialogRenderer} from "../o/VoiceSearchDialogRenderer.js";

export type GenericRenderer={
	trackingParams: string;
}|VoiceSearchDialogRenderer|GhostGridRenderer;
