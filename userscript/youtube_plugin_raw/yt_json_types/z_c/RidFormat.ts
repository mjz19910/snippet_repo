type RidFormat<T extends string>=
	|`${T}_rid`
	|`Edit${T}_rid`
	|`Get${T}_rid`
	|`Record${T}_rid`
	|`Remove${T}_rid`
	|`Set${T}_rid`
	;