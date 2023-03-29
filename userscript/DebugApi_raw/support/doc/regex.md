# remove newlines
   remove newline from function `(function \w+ \((\s*\w+,\s*){0})\n\s*` and replace with `$1`

# remove jsDoc comments
  `/\*\*([^!]|$\n)+?\*/` replace with `[empty]`

# misc
```regexp
 \n\t*;
```

```regexp
var \w+ = function 
```

