import {CommandMetadata} from "../b/CommandMetadata.js";

export type SettingsEndpoint={
	commandMetadata: CommandMetadata;
	clickTrackingParams: string;
};
