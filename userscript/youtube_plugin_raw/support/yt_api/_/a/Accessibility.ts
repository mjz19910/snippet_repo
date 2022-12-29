import {AccessibilityData} from "./AccessibilityData";

export type Accessibility<T extends string>={
	accessibilityData: AccessibilityData<T>;
};
