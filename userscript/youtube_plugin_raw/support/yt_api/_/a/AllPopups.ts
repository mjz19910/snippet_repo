import {AboutThisAdRendererPopup} from "../d/AboutThisAdRendererPopup.js";
import {MultiPageMenuRenderer} from "../../../../yt_json_types/MultiPageMenuRenderer.js";
import {ConfirmDialogRenderer} from "../c/ConfirmDialogRenderer.js";
import {NotificationActionRenderer} from "../n/NotificationActionRenderer.js";
import {VoiceSearchDialogRenderer} from "../v/VoiceSearchDialogRenderer";

export type AllPopups=VoiceSearchDialogRenderer|NotificationActionRenderer|MultiPageMenuRenderer|AboutThisAdRendererPopup|ConfirmDialogRenderer;
