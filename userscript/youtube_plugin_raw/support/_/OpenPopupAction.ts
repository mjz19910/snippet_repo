import {ButtonRenderer} from "../yt_api/_/b/ButtonRenderer.js";
import {TextRuns} from "../yt_api/_/t/TextRuns.js";
import {MultiPageMenuRenderer} from "./MultiPageMenuRenderer";

type ConfirmDialogRendererData={
	title: TextRuns;
	trackingParams: string;
	dialogMessages: {}[];
	confirmButton: {};
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};

type ConfirmDialogRenderer={
	confirmDialogRenderer: ConfirmDialogRendererData;
};

export type OpenPopupAction={
	popup: MultiPageMenuRenderer;
	popupType: "DROPDOWN";
}|{
	popup: ConfirmDialogRenderer;
	popupType: "DIALOG";
};
