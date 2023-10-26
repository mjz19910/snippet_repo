import {C_Innertube} from "../../abc/group_C.ts";
import {G_Text} from "../../ghi/group_G.ts";
import {T_EnumStr} from "../../stu/group_T.ts";
import {D_Thumbnail,D_LoggingDirectives} from "../group_D.ts";

export type D_MarkerItem={
	title: G_Text;
	startMillis: `${number}`;
	durationMillis: "10000";
	thumbnailDetails: D_Thumbnail;
	onActive: C_Innertube;
};
export type D_MarkersList={
	markerType: "MARKER_TYPE_TIMESTAMPS";
	markers: D_MarkerItem[];
	headerTitle: G_Text;
	onTap: C_Innertube;
	loggingDirectives: D_LoggingDirectives;
};
export type DS_EY_MacroMarkersList={key: string;}|{
	key: string;
	externalVideoId: string;
	markersList: D_MarkersList;
};
export type DS_EY_Subscription={key: string; subscribed: boolean;};
export type DS_EY_PlaylistLoop={key: string; state: T_EnumStr<"PLAYLIST_LOOP_STATE","ALL"|"NONE"|"ONE">;};
export type DS_EY_TranscriptTrackSelection={key: string; selectedTrackIndex: number; serializedParams: string;};
export type DS_EY_TranscriptSearchBox={key: string; isHidden: false;};
