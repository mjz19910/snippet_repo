import {AudioTrackItem} from "./AudioTrackItem.js";
import {CaptionTrackItem} from "./CaptionTrackItem.js";
export type PlayerCaptionsTracklistData={
	captionTracks: CaptionTrackItem[];
	audioTracks: AudioTrackItem[];
	translationLanguages: TranslationLanguage[];
	defaultAudioTrackIndex: number;
};