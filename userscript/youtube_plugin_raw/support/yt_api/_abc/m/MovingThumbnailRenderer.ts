import {MovingThumbnailDetails} from "./MovingThumbnailDetails";

export interface MovingThumbnailRenderer {
	enableHoveredLogging: true;
	enableOverlay: true;
}

export interface MovingThumbnailRendererDetail extends MovingThumbnailRenderer {
	movingThumbnailDetails: MovingThumbnailDetails;
} 
