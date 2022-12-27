import {AllServiceTrackingParams} from "./AllServiceTrackingParams";
import {ParseParamItem} from "./search_params_parse/ParseParamItem.js";
import {UrlWrappedValue} from "./UrlWrappedValue";
import {CommentsHeaderRenderer} from "./yt_api/_abc/c/CommentsHeaderRenderer.js";
import {ReloadContinuationItemsCommand} from "./yt_api/_abc/r/ReloadContinuationItemsCommand.js";
import {Decay} from "./yt_api/_exact_data/Decay.js";

type U_0={
	url_type: "getDatasyncIdsEndpoint";
	json: {};
};

type ExampleChallengeVars=Decay<ParseParamItem<"a=5&a2=10&c=1672168861&d=1&t=7200&c1a=1&hh=AGgPIr3tBg27zD1qUi5VCCBryM_8oaCCrxDEXUyB9Kg">>;
const u: ExampleChallengeVars={
	"a": "5",
	"a2": "10",
	"c": "1672168861",
	"c1a": "1",
	"d": "1",
	"hh": "AGgPIr3tBg27zD1qUi5VCCBryM_8oaCCrxDEXUyB9Kg",
	"t": "7200",
}; u;

type GeneralContext={
	mainAppWebResponseContext: {
		datasyncId: `${number}||${number}`;
		loggedOut: boolean;
	};
	serviceTrackingParams: AllServiceTrackingParams;
	webResponseContextExtensionData: {
		hasDecorated: false;
	};
};

export type AttGetV={
	responseContext: GeneralContext;
	challenge: string;
	bgChallenge: {
		interpreterUrl: UrlWrappedValue<string>;
		interpreterHash: string;
		program: string;
		globalName: "trayride";
	};
};

type U_1={
	url_type: "att.get";
	// ['responseContext', 'challenge', 'bgChallenge']
	json: AttGetV;
};

type ReloadContinuationItemsCommandFor<T,U,V extends {continuationItems: any}>={
	slot: U;
	targetId: T;
	continuationItems: V['continuationItems'];
};

type AllResponseReceivedEndpoints={
	clickTrackingParams: string;
	reloadContinuationItemsCommand: ReloadContinuationItemsCommandFor<"comments-section","RELOAD_CONTINUATION_SLOT_HEADER",{
		continuationItems: [{
			commentsHeaderRenderer: CommentsHeaderRenderer;
		}];
	}>;
}|{
	clickTrackingParams: string;
	reloadContinuationItemsCommand: ReloadContinuationItemsCommandFor<"comments-section","RELOAD_CONTINUATION_SLOT_BODY",{
		continuationItems: {

		}[];
	}>;
};

type YtApiNext={
	onResponseReceivedEndpoints: AllResponseReceivedEndpoints[];
	responseContext: GeneralContext;
	trackingParams: string;
};

type U_2={
	url_type: "youtube.v1.next";
	json: YtApiNext;
};

type U_3={
	url_type: "youtube.v1.notification.get_notification_menu";
	json: {};
};

type U_4={
	url_type: "youtube.v1.notification.get_unseen_count";
	json: {};
};

type U_5={
	url_type: "youtube.v1.guide";
	json: {};
};

export type YtUrlBase={
	request: string|URL|Request;
	parsed_url: URL;
};

export type json_req=(U_0|U_1|U_2|U_3|U_4|U_5)&YtUrlBase;
