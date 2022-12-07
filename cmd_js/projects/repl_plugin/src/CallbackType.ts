<<<<<<< HEAD
import {REPLServer} from 'repl';

export type CallbackType=(err: Error|null,_repl: REPLServer)=>void;
=======
import repl from 'repl';
import {REPLServerRuntime} from './REPLServerRuntime.js';

export type CallbackType={
	(err: Error|null,_repl: repl.REPLServer&REPLServerRuntime): void;
	(err: Error|null,repl: repl.REPLServer): void;
};
>>>>>>> 19d8bcac (u)
