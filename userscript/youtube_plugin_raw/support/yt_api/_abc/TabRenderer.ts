import {RichGridRenderer} from "./RichGridRenderer";
import {SectionListRenderer} from "./SectionListRenderer";

export type TabRenderer={
	content: SectionListRenderer|RichGridRenderer;
	selected: true;
	trackingParams: string;
};
