import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {YtTextType} from "../s/YtTextType.js";

export type ConfirmDialogRenderer={
	title: YtTextType;
	trackingParams: string;
	dialogMessages: {}[];
	confirmButton: ButtonRenderer;
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};
