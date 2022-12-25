import {
	CommentsHeaderRendererHolder,CommentThreadRendererHolder,
	CompactPlaylistRendererHolder,CompactVideoRendererHolder,
	ContinuationItemRendererHolder
} from "./__global.js";

export type RendererContentItemDef=
	RichItemRendererHolder|
	RichSectionRendererHolder|
	CommentsHeaderRendererHolder|
	CommentThreadRendererHolder|
	ContinuationItemRendererHolder|
	CompactVideoRendererHolder|
	CompactPlaylistRendererHolder;

