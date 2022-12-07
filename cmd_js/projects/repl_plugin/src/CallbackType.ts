import {REPLServer} from 'repl';

export type CallbackType=(err: Error|null,_repl: REPLServer)=>void;
