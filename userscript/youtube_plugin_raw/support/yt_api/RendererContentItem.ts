import {CompactPlaylistRendererHolder} from "./CompactPlaylistRendererHolder";
import {CompactVideoRendererHolder} from "./CompactVideoRendererHolder";
import {ContinuationItemRendererHolder} from "./ContinuationItemRendererHolder";
import {CommentThreadRendererHolder} from "./CommentThreadRendererHolder";
import {CommentsHeaderRendererHolder} from "./CommentsHeaderRendererHolder";
import {RichSectionRendererHolder} from "./RichSectionRendererHolder";


export type RendererContentItem=
	RichItemRendererHolder|
	RichSectionRendererHolder|
	CommentsHeaderRendererHolder|
	CommentThreadRendererHolder|
	ContinuationItemRendererHolder|
	CompactVideoRendererHolder|
	CompactPlaylistRendererHolder|
	never;
