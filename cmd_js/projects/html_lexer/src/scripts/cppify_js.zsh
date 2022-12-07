cpp -nostdinc -CC -DJS_MODE $1 | perl ${0%/*}/cppify_perl.pm;
