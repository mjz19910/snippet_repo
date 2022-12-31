import {AboutThisAdRenderer} from "../a/AboutThisAdRenderer.js";
import {AllPopups} from "../a/AllPopups.js";
import {GhostGridRenderer} from "../g/GhostGridRenderer.js";
import {ConfirmDialogRenderer} from "../n/ConfirmDialogRenderer.js";
import {VoiceSearchDialogRenderer} from "../o/VoiceSearchDialogRenderer.js";
import {NotificationActionRenderer} from "../t/NotificationActionRenderer.js";
import {TrackingOnlyRenderer} from "./TrackingOnlyRenderer";

export type GenericRenderer=
	TrackingOnlyRenderer|
	VoiceSearchDialogRenderer|
	GhostGridRenderer|
	AboutThisAdRenderer|
	NotificationActionRenderer|
	ConfirmDialogRenderer|
	AllPopups;

