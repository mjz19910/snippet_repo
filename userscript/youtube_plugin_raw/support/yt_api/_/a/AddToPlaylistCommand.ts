import {OnCreateListCommand} from "./OnCreateListCommand";

export type AddToPlaylistCommand={
	listType: string;
	onCreateListCommand: OnCreateListCommand;
	openListPanel: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};
