type UrlParts=ParseUrlSearchParams<Split<UrlParse<GoogleLoginExternalUrl>['search'],"?">[1]>;
