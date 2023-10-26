import {lit_valueT} from "./lit_valueT.ts"
import {ip_addr_idx_2} from "./types_todo.ts"

export type rangeT<T extends ([ip_addr_idx_2,ip_addr_idx_2]|lit_valueT<ip_addr_idx_2[]>)[]>=['range',...T]
