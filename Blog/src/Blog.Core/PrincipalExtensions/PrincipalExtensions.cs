using System.Security.Principal;
using System;
using System.Security.Claims;

namespace Blog.Core.PrincipalExtensions;

public static class PrincipalExtensions {
    public static long GetUserId(this IPrincipal user) {
        return user.TryGetUserId() ?? throw new ArgumentException("Can't get current user id");
    }

    private static long? TryGetUserId(this IPrincipal user) {
        var claimsIdentity = user.Identity as ClaimsIdentity;
        var claim = claimsIdentity?.FindFirst(x => x.Type == ClaimTypes.NameIdentifier);
        return long.TryParse(claim?.Value, out var result) ? result : null;
    }
}