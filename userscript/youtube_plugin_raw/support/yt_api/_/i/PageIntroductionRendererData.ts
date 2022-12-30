import {TextRunsSimpleT} from "../t/TextRunsSimple.js";
import {Icon} from "./Icon.js";

export type PageIntroductionRendererData={
	headerText: TextRunsSimpleT<"Expand your experience">;
	headerIcon: Icon<"ACCOUNT_SHARING">;
}|{
	headerText: TextRunsSimpleT<"Control your download settings">;
	bodyText: TextRunsSimpleT<"Download settings apply to this browser only">;
	pageTitle: TextRunsSimpleT<"Downloads">;
}|{
	headerText: TextRunsSimpleT<"Manage what you share on YouTube">;
};
