import repl from 'repl';
import {REPLServerRuntime} from './REPLServerRuntime.js';

export type CallbackType={
	(err: Error|null,_repl: repl.REPLServer&REPLServerRuntime): void;
	(err: Error|null,repl: repl.REPLServer): void;
};
