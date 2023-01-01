import {YtTextType} from "../../json/YtTextType.js";
import {ButtonRenderer} from "../b/ButtonRenderer.js";

export type ConfirmDialogRendererData={
	title: YtTextType;
	trackingParams: string;
	dialogMessages: YtTextType[];
	confirmButton: ButtonRenderer;
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};
