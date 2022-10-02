export class CSSStyleDeclaration {
    /**
     * @param {string} v
     */
    constructor(v) {
        if(!v) return
        var s=v.split(";")
        for(let i of s) {
            var [k,v]=i.split(":")
            // @ts-ignore
            this[k]=v
        }
    }
}
