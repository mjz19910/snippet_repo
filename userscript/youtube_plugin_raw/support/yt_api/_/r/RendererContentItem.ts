import {RichItemRendererH} from "../../rich/RichItemRendererHolder.js";
import {RichSectionRendererH} from "../../rich/RichSectionRendererH.js";
import {CommentsHeaderRendererH} from "../c/CommentsHeaderRendererH.js";
import {CommentThreadRendererH} from "../c/CommentThreadRendererH.js";
import {CompactPlaylistRendererH} from "../c/CompactPlaylistRendererH.js";
import {CompactVideoRendererH} from "../c/CompactVideoRendererH.js";
import {ContinuationItemRenderer} from "../../../../yt_json_types/ContinuationItemRenderer.js";

export type RendererContentItem=
	RichItemRendererH|
	RichSectionRendererH|
	CommentsHeaderRendererH|
	CommentThreadRendererH|
	ContinuationItemRenderer|
	CompactVideoRendererH|
	CompactPlaylistRendererH|
	never;
