import {resolve} from 'path';
import {__dirname} from './index';


export function r(path: string) {
	return resolve(__dirname,"..","..",path);
}
