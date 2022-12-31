import {AboutThisAdRendererPopup} from "../d/AboutThisAdRendererPopup.js";
import {MultiPageMenuRenderer} from "../m/MultiPageMenuRenderer.js";
import {ConfirmDialogPopup} from "../n/ConfirmDialogPopup.js";
import {NotificationActionRenderer} from "../t/NotificationActionRenderer.js";
import {VoicePopup} from "./VoicePopup";

export type AllPopups=VoicePopup|NotificationActionRenderer|MultiPageMenuRenderer|AboutThisAdRendererPopup|ConfirmDialogPopup;
