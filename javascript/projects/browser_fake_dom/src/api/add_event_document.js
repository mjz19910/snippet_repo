/**
 * @param {{[x:string]:{name:string;func:()=>void;ex?:string}[]}} ls
 * @param {[name:string, a:()=>void, b?:string]} args
 */
export function add_event_document(ls,args) {
    var [name,a,b]=args
    if(!ls[name])
        ls[name]=[]
    if(args.length==3) {
        ls[name].push({name,func: a,ex: b})
    } else {
        ls[name].push({name,func: a})
    }
}
