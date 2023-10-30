declare enum SeekMode {
	/* Seek from the start of the file/resource. */
	Start=0,
	/* Seek from the current position within the file/resource. */
	Current=1,
	/* Seek from the end of the current file/resource. */
	End=2,
}
declare namespace Deno {
	export interface OpenOptions {
		/** @default {true} */
		read?: boolean;
		/** @default {false} */
		write?: boolean;
		/** @default {false} */
		append?: boolean;
		/** @default {false} */
		truncate?: boolean;
		/** @default {false} */
		create?: boolean;
		/** @default {false} */
		createNew?: boolean;
		mode?: number;
	}
	export interface MkdirOptions {
		/** @default {false} */
		recursive?: boolean;
		mode?: number;
	}
	export interface FsFile {
		readonly rid: number;
		truncate(len?: number): Promise<void>;
		read(p: Uint8Array): Promise<number|null>;
		write(p: Uint8Array): Promise<number>;
		seek(offset: number|bigint,whence: SeekMode): Promise<number>;
		close(): void;
    readSync(p: Uint8Array): number | null;
    seekSync(offset: number | bigint, whence: SeekMode): number;
	}
	export function open(
		path: string|URL,
		options?: OpenOptions,
	): Promise<FsFile>;
	export function mkdir(
		path: string|URL,
		options?: MkdirOptions,
	): Promise<void>;
	export function chdir(directory: string|URL): void;
	export function cwd(): string;
	export function openSync(path: string|URL,options?: OpenOptions): FsFile;
}