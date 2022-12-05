#!/bin/zsh
#set -x
git_root=(.git)
git_objects=($git_root/objects)
git_pack_root=($git_root/objects/pack)
tmp_pack=$git_pack_root/.tmp-$$
pack_objects_args=(
    --window=10000
    --depth=4095
    --no-reuse-delta
    --no-reuse-object
    --delta-base-offset
    --keep-true-parents
    --non-empty
    --all
    --indexed-objects
    --compression=9
    --all-progress
    --unpack-unreachable=now
)
rm_if(){
    [ -f $1 ] && rm $1
}
backup-pack () {
    for ext in pack idx
    do
        rm_if "$git_pack_root/old-$1.$ext"
        cp "$git_pack_root/pack-$1.$ext" "$git_pack_root/old-$1.$ext"
        rm "$git_pack_root/pack-$1.$ext"
    done
}
repack-compress () {
    {
        pack_info=("${(@f)$(<"$git_objects/info/packs")}")
        first_pack_item=${pack_info[1]}
        first_pack_item_parsed=($(echo $first_pack_item))
        first_pack_item_hash=("${first_pack_item_parsed[2]}")
        first_pack_item_hash=("${(@s/-/)first_pack_item_hash}")
        first_pack_item_hash=("${(@s/./)first_pack_item_hash}")
        first_pack_item_hash=("${first_pack_item_hash[2]}")
        printf "compress pack hash:%s\n" ${first_pack_item_hash}
        echo compress $1
        rm $tmp_pack.*(N)
        # backup-pack "${first_pack_item_hash}"
        git pack-objects "${(@)pack_objects_args}" "$tmp_pack" <&- > "$tmp_pack.hash"
    } &&
    {
        pack_hash=$(<$tmp_pack.hash)
        for ext in pack idx
        do
            rm_if .git/objects/pack/old-$pack_hash.$ext
            if [ -f .git/objects/pack/pack-$pack_hash.$ext ]
            then
                rm_if .git/objects/pack/old-$pack_hash.$ext
                # cp .git/objects/pack/pack-$pack_hash.$ext .git/objects/pack/old-$pack_hash.$ext
            fi
            rm_if .git/objects/pack/pack-$pack_hash.$ext
            cp $tmp_pack-$pack_hash.$ext .git/objects/pack/pack-$pack_hash.$ext
            rm $tmp_pack-$pack_hash.$ext
        done
        echo P pack-$pack_hash.pack$'\n' > .git/objects/info/packs
        rm_if $tmp_pack.hash
    } &&
    {
        du -ba --apparent-size .git/objects/pack
    }
}
repack-compress 9
#set +x
