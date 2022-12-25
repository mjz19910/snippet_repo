import {ThumbnailOverlayNowPlayingRenderer} from "./ThumbnailOverlayNowPlayingRenderer";
import {ThumbnailOverlayResumePlaybackRenderer} from "./ThumbnailOverlayResumePlaybackRenderer";
import {ThumbnailOverlayTimeStatusRenderer} from "./ThumbnailOverlayTimeStatusRenderer";
import {ThumbnailOverlayToggleButtonRenderer} from "./ThumbnailOverlayToggleButtonRenderer";

export type ThumbnailOverlay={
	thumbnailOverlayResumePlaybackRenderer: ThumbnailOverlayResumePlaybackRenderer;
}|{
	thumbnailOverlayTimeStatusRenderer: ThumbnailOverlayTimeStatusRenderer;
}|{
	thumbnailOverlayToggleButtonRenderer: ThumbnailOverlayToggleButtonRenderer;
}|{
	thumbnailOverlayNowPlayingRenderer: ThumbnailOverlayNowPlayingRenderer;
};
