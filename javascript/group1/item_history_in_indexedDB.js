out = [];
odb = indexedDB.open("history", 1);
function ap_l(item) {
    var i = document.createElement('li');
    var l1 = document.createElement('div');
    var l2 = document.createElement('div');
    l1.innerHTML = item.url;
    l2.innerHTML = item.title;
    i.append(l1, l2);
    list.appendChild(i);
}
function open_complete() {
    list = document.createElement("ul");
    document.body.prepend(list);
    tr = odb.result.transaction(['history'], "readonly");
    cur = tr.objectStore("history").openCursor();
    function cursor_done({target: {cursor: cursor}}) {
        if(cursor) {
            //cursor.continue();
            console.log(cursor.value);
            setTimeout(function() {
                cursor.continue();
            }, 100);
            out.push(cursor.value);
        } else {
            console.log('Got all data, length:', out.length);
        }
    }
    cur.onsuccess = cursor_done;
    console.log(cur);
}
odb.onsuccess = open_complete;
