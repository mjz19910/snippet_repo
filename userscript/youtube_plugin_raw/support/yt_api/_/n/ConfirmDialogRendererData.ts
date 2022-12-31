import {ButtonRenderer} from "../b/ButtonRenderer.js";
import {TextRuns} from "../t/TextRuns.js";

export type ConfirmDialogRendererData={
	title: TextRuns;
	trackingParams: string;
	dialogMessages: {}[];
	confirmButton: ButtonRenderer;
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};
