import {AboutThisAdRenderer} from "../a/AboutThisAdRenderer.js";
import {GhostGridRenderer} from "../g/GhostGridRenderer.js";
import {VoiceSearchDialogRenderer} from "../o/VoiceSearchDialogRenderer.js";
import {NotificationActionRenderer} from "../t/NotificationActionRenderer.js";
import {TrackingOnlyRenderer} from "./TrackingOnlyRenderer";

export type GenericRenderer=TrackingOnlyRenderer|
	VoiceSearchDialogRenderer|
	GhostGridRenderer|
	AboutThisAdRenderer|
	NotificationActionRenderer;
