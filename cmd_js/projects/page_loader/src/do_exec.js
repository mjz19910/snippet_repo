/** @arg {string} text
 * @arg {any} _ec_info */
export function do_exec(text,_ec_info) {
    while(1) {
        var func
        try {
            let eval_value=eval(text)
            return {
                error: false,
                value: eval_value,
                out: func
            }
        } catch(e) {
            console.log("ERROR")
            console.log(e)
            break
        }
    }
    return {
        error: true,
    }
}
