declare global {
	export type ModuleDesc={
		identifier: string;
		shortIdentifier: string;
		resource: string;
		resourcePath: string;
		absoluteResourcePath:string;
		allLoaders: string;
		query: string;
		moduleId: number;
		hash: string;
		namespace: string;
	};
}

export {};
