let out=[]
let odb=indexedDB.open("history",1)
let list=document.createElement("ul")
/**
 * @param {{ url: string; title: string; }} item
 */
function ap_l(item) {
    var i=document.createElement('li')
    var l1=document.createElement('div')
    var l2=document.createElement('div')
    l1.innerHTML=item.url
    l2.innerHTML=item.title
    i.append(l1,l2)
    list.appendChild(i)
}
function open_complete() {
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
odb.onsuccess=open_complete
