/**
 * @param {{[x:string]:{name:string;func:()=>void;ex?:string}[]}} ls
 * @param {[name:string,a:()=>void,b?:string]} args
 */
export function remove_event_doc(ls, args) {
    var [name, a, b] = args;
    var t = ls[name];
    if(!t)
        return;
    var r = t.filter((/** @type {{func:()=>void}} */ e) => e.func == a);
    if(r.length == 0)
        return;
    if(args.length == 3) {
        r = r.filter((/** @type {{ex?:string}} */ e) => e.ex === b);
        if(r.length == 0)
            return;
        console.log(r.length);
        var ix = t.indexOf(r[0]);
        t.splice(ix, 1);
    } else {
        var ix = t.indexOf(r[0]);
        t.splice(ix, 1);
    }
}
