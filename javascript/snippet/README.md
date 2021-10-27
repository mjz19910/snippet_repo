# Group format, described in python3
```py3
def group1(key):
	return f"$_{key.rev_printf("item_%s")}"
def group2(key):
	return f",{key.rev_printf("item_%s")}_"
```
# cSpell comments
```js

// cspell:disable-next-line
// cspell:disable
// cspell:enable

// this checks the spelling config for changes
// cspell:enableCompoundWords
```

# Commit format

G{group number as int}: {description}
{%(commit prefix)s joined with %(+)t}: {description}

%(commit prefix) can be any of
- G{int}
- README 
- JSSnippet
- CommitDSL
- Yak
- SnippetREADME

# CommitDSL
- the DSL for my commit format
```
syntax -raw (...(1))
	...(1) is  ((...) as (inner token tree))
syntax (...(1) as @word)
	end
syntax (...(1)) ((as) as @word with (group (3))) (...(2))
	...(1) is (list type)
	...(2) is (syntax type)
	(group (3)) (...(5))
	...(5) is ((...) (...(6)) (...(7)) (...(8)) (...(9)))
	...(6) is ((as) as @word)
	...(7) is ((type) as @type)
	...(8) is ((with) as @word)
	...(9) is ((...(4)) as (group define))
	...(4) is (group (...(10)))
	...(10) is (type int)
syntax() (...(1)) (...(2)) (...(3))
	defines syntax using 3 match types
	...(1) is (... (as type) @match (described by) (match start))
	...(2) is (... (as type) @match (described by) (match while))
	...(3) is (... (as type) @match (described by) (match end))
syntax (...(1)) is (...(2))
	defines is relation
	can replace ...(1) with ...(2) and it does not change the meaning
syntax @word
	a sequence of tokens that is wordlike(any char bounded by whitespace)
syntax @word from ((description) as @word)
	describes where the type is defined
syntax() (/"/ as @match) (/[^"]/ as @match) (/"/ as @match)
	regex matching the token for a string
	this is a single char, but parses as a token pair containing a string
	this starts the string, when it is encountered again
	it goes back to the previous token pair
describe ()
	this can group tokens
syntax (... as list of @word seperated by "|") as @word
	end
syntax -raw ((...(1))...(2))
	...(1)
		tokens parse in description mode
	...(2)
		greedy, uses all tokens until token tree end
		this is the token array that this syntax will match
syntax -raw (...)
	groups tokens into a a group
syntax ((@word)[]) @requires (in description)
	it defines something as an array
syntax ((-) as @match) (...(1)) ((\n\n) as @match)
	...(1) is ((...) include (match newline) as (syntax @match))
	this marks the start of a description option
syntax (...)
	end
syntax ([%(...)...])
	%(...)
		any word[] seperated by " "
	...
syntax [...]
	an optional value
syntax (%) is (syntax error)
	end
syntax -raw %(...)[@suffix]
	@suffix is (...(1))
	...(1)
		- the inline suffix
		- the word-like tokens
		- (ends at) (current token tree @end)
		- (ends at) whitespace
syntax -raw %(...)t
	... is (...(1))
	...(1) is (token list)
	- (token list) always (convert to string)
syntax %(...)s (joined) (with) %(...(2))t
  the first part can be defined with %(...)
  [joined with...]
```