import {TextRunsSimple} from "../t/TextRunsSimple.js";
import {Icon} from "./Icon.js";

export type PageIntroductionRendererData={
	headerText: TextRunsSimple;
	headerIcon: Icon<"ACCOUNT_SHARING">;
}|{
	headerText: TextRunsSimple;
	bodyText: TextRunsSimple;
	pageTitle: TextRunsSimple;
}|{
	headerText: TextRunsSimple;
	pageTitle: TextRunsSimple;
	headerIcon: Icon<"ACCOUNT_ADVANCED">;
};
