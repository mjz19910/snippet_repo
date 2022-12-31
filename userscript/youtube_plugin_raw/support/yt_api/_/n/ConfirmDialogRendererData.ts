import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {YtTextType} from "../s/YtTextType.js";

export type ConfirmDialogRendererData={
	title: YtTextType;
	trackingParams: string;
	dialogMessages: YtTextType[];
	confirmButton: ButtonRenderer;
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};
