# Group format

Described in `api/group_format.py`

# cSpell comments

```js
// cspell:disable-next-line
// cspell:disable
// cspell:enable
// spell:disable-next-line
// spell:disable
// spell:enable

// this checks the spelling config for changes
// cspell:enableCompoundWords
// spell:enableCompoundWords
```

# Commit format

G{group number as int}: {description} {%(commit prefix)s joined with %(+)t}:
{description}

%(commit prefix) can be any of

- G{int}
- README
- JSSnippet
- JSSnipReadme
- JSSnipGroup{int}
- CommitDSL
- Yak
- SnippetREADME

# CommitDSL

- the DSL for my commit format

```
syntax -u1 (...(1))
	...(1) is -u1 ((...) as -ty (inner token tree))
syntax -u1 (syntax -u0 (...(1)))
	end
syntax -u1 (...(1))
	...(1) is (char) (word)
syntax -u1 (...(1)) (as) (...(2))
	...(1) is (list type)
	...(2) is (syntax type)
syntax -u1 (syntax()) (...(1)) (...(2)) (...(3))
	defines syntax using 3 match types
	...(1) is (-u1 (...) (as) (@match) -> @ret with (described by) (match start))
	...(2) is (-u1 (...) (as) (@match) -> @ret with (described by) (match while))
	...(3) is (-u1 (...) (as) (@match) -> @ret with (described by) (match end))
syntax -u1 (...(1)) (is) (...(2))
	defines is relation
	can replace ...(1) with ...(2) and it does not change the meaning
syntax -u0 @word
	a sequence of tokens that is wordlike(any char bounded by whitespace)
syntax() (/"/ as @match) (/[^"]/ as @match) (/"/ as @match)
	regex matching the token for a string
	this is a single char, but parses as a token pair containing a string
	this starts the string, when it is encountered again
	it goes back to the previous token pair
syntax -u1 (token[])
	define a token list
	convert to token list
syntax -u1 (describe) (() as (@raw token[]))
	end
describe ()
	this can group tokens
syntax -u1 ((...) as (list @word) (seperated by) "|") -> @ret as (@word with (type word[]))
	end
syntax -u0 ((...(1))...(2))
	...(1)
		tokens parse in description mode
	...(2)
		greedy, uses all tokens until token tree end
		this is the token array that this syntax will match
syntax -u0 (...)
	groups tokens into a a group
syntax -u0 (...)
	end
syntax -u1 ([%(...)...])
	%(...) is ((@word with (type word[])) (seperated by) (whitespace))
	...
syntax -u0 [...]
	an optional value
syntax -u0 (%) is (syntax error)
	end
syntax -u0 %(...)[@suffix]
	@suffix is (...(1))
	...(1)
		- the inline suffix
		- the word-like tokens
		- (ends at) (current token tree @end)
		- (ends at) whitespace
syntax -u0 %(...)t
	... is (...(1))
	...(1) is (token list)
	- (token list) always (convert to string)
syntax -u0 %(...)s (joined with) %(...(2))t
  the first part can be defined with %(...)
  [joined with...]
```
