cpp -nostdinc -CC -DJS_MODE $1 | perl -pe 's:#://:g,s/<line>\s/\n\t\t/g,s/^[\t]+$//gm,s/\n\n/\n/g'
