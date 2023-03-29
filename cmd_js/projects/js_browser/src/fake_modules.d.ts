declare module "path";
declare module "child_process" {
	type StdStream={
		on(a: string,b: (e: any) => void): void;
	};

	type SpawnResult={
		on(a: string,b: (e: any) => void): void;
		stdout: StdStream;
		stderr: StdStream;
	};

	function spawn(a: any,b: any,c: any): SpawnResult;
}
declare module "process";
