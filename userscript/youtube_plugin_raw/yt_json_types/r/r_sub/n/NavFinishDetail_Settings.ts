import {E_VE23462} from "../../../e/GR_E_VE.js";
import {G_RS_SettingsPage} from "../../../ghi/group_G.js";

export type NavFinishDetail_Settings={
	pageType: "settings";
	endpoint: E_VE23462;
	response: G_RS_SettingsPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
