type D_MovingThumbnail={
	movingThumbnailDetails?: D_Thumbnail|D_MovingThumbnail$Thumbnails;
	enableHoveredLogging: true;
	enableOverlay: true;
};
type D_MovingThumbnail$Thumbnails={
	thumbnails: {
		url: string;
		width: 320;
		height: 180;
	}[];
	logAsMovingThumbnail: true;
};