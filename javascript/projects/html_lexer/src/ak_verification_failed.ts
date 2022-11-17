import {dbgln} from "./dbgln";
import {__builtin_trap} from "./__builtin_trap";

export function ak_verification_failed(message: string) {
    dbgln("VERIFICATION FAILED: {}",message);
    __builtin_trap();
}
