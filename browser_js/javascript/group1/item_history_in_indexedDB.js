function main() {
    /** @type {any[]} */
    let out=[]
    let odb=indexedDB.open("history",1)
    let list=document.createElement("ul");
    odb.onsuccess=()=>{
        open_complete(list,odb,out);
    }
}
/**
 * @arg {{url: string;title: string;}} item
 * @arg {{ appendChild: (arg0: HTMLLIElement) => void; }} list
 */
function ap_l(list,item) {
    var i=document.createElement('li')
    var l1=document.createElement('div')
    var l2=document.createElement('div')
    l1.innerHTML=item.url
    l2.innerHTML=item.title
    i.append(l1,l2)
    list.appendChild(i)
}
/**
 * @arg {Node} list
 * @arg {IDBOpenDBRequest} odb
 * @arg {any[]} out
 */
function open_complete(list,odb,out) {
    document.body.prepend(list)
    let tr=odb.result.transaction(['history'],"readonly")
    let cur=tr.objectStore("history").openCursor()
    function cursor_done() {
        if(cur.result&&cur.result.value) {
            console.log(cur.result.value)
            setTimeout(function() {
                cur.result?.continue()
            },100)
            out.push(cur.result.value)
        } else {
            console.log('Got all data, length:',out.length)
        }
    }
    cur.onsuccess=cursor_done
    console.log(cur)
}

