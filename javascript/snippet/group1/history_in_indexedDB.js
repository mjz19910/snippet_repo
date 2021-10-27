out = [];
odb = indexedDB.open("history", 1);
ap_l = function(item) {
    var i = document.createElement('li');
    var l1 = document.createElement('div');
    var l2 = document.createElement('div');
    l1.innerHTML = item.url;
    l2.innerHTML = item.title;
    i.append(l1, l2);
    list.appendChild(i);
}
    ;
odb.onsuccess = function() {
    list = document.createElement("ul");
    document.body.prepend(list);
    tr = odb.result.transaction(['history'], "readonly");
    cur = tr.objectStore("history").openCursor();
    cur.onsuccess = function({target: {cursor: cursor}}) {
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
        ;
    console.log(cur);
}
    ;
