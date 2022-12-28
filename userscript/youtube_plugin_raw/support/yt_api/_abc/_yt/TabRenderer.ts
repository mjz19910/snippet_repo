import {SectionListRenderer} from "./SectionListRenderer";

export type TabRenderer={
	content: SectionListRenderer;
	selected: true;
	trackingParams: string;
};
