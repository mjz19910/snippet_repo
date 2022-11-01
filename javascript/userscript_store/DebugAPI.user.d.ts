declare class DebugAPI {
	getData(a: 'd'): ChromeDevToolsDebug|null;
	getData(a: 'u'): ChromeDevToolsUnDebug|null;
	getData(a: 'getEventListeners'): ChromeDevToolsGetEventListeners|null;
	getData(a: '__k'): DebugInfoValue|null;
	setData(a: 'd',b: ChromeDevToolsDebug|null): boolean;
	setData(a: 'u',b: ChromeDevToolsUnDebug|null): boolean;
	setData(a: 'getEventListeners',b: ChromeDevToolsGetEventListeners|null): boolean;
	setData(a: '__k',b: DebugInfoValue|null): boolean;
}

export {}
