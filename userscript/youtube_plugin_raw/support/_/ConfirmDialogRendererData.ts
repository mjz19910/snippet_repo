import {ButtonRenderer} from "../yt_api/_/b/ButtonRenderer.js";
import {TextRuns} from "../yt_api/_/t/TextRuns.js";

export type ConfirmDialogRendererData={
	title: TextRuns;
	trackingParams: string;
	dialogMessages: {}[];
	confirmButton: ButtonRenderer;
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};
