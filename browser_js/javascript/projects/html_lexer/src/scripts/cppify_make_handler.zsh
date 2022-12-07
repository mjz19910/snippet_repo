cpp -nostdinc -CC -DJS_MODE "$1" > "$2.01.tmp"
perl ${0%/*}/cppify_perl.pm > "$2" < "$2.01.tmp"
rm "$2.01.tmp"
