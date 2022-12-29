import {RichGridRenderer} from "../r/RichGridRenderer";
import {SectionListRenderer} from "../s/SectionListRenderer";

export type TabRenderer={
	content: SectionListRenderer|RichGridRenderer;
	selected: true;
	trackingParams: string;
};
