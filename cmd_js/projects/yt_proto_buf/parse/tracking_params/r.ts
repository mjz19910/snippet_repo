import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

export const __dirname=dirname(fileURLToPath(import.meta.url));

export function r<T extends string>(path: T) {
	return resolve(__dirname,"../..",path) as `../../${T}`;
}
