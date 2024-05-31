using Blog.Core.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Blog.Entities;

public class Role : IdentityRole<long>, IId<long>, IEntity;