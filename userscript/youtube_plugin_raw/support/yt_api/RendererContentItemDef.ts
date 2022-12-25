import {CompactPlaylistRendererHolder} from "./CompactPlaylistRendererHolder";
import {CompactVideoRendererHolder} from "./CompactVideoRendererHolder";
import {ContinuationItemRendererHolder} from "./ContinuationItemRendererHolder";
import {CommentThreadRendererHolder} from "./CommentThreadRendererHolder";
import {CommentsHeaderRendererHolder} from "./CommentsHeaderRendererHolder";

export type RendererContentItemDef=
	RichItemRendererHolder|
	RichSectionRendererHolder|
	CommentsHeaderRendererHolder|
	CommentThreadRendererHolder|
	ContinuationItemRendererHolder|
	CompactVideoRendererHolder|
	CompactPlaylistRendererHolder;

