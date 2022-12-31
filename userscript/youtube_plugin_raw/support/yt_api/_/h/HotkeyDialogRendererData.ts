import {YtTextType} from "../../yt/YtTextType.js";
import {ButtonRenderer} from "./ButtonRenderer.js";
import {HotkeyDialogSectionRenderer} from "./HotkeyDialogSectionRenderer";

export type HotkeyDialogRendererData={
	title: YtTextType;
	sections: HotkeyDialogSectionRenderer[];
	dismissButton: ButtonRenderer;
	trackingParams: string;
};
