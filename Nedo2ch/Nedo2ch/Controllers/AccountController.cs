using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Nedo2ch.Config;
using Nedo2ch.Models;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Nedo2ch.Controllers.Api
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private Person person = new Person { Email = "mail@mail.com", Password = "admin" };
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;

        public AccountController(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost]
        [SwaggerOperation("GenerateToken")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [SwaggerResponse((int)HttpStatusCode.Created)]
        public IActionResult Token([FromBody] Person p)
        {
            var identity = GetIdentity(p.Email, p.Password);
            if (identity == null)
            {
                return BadRequest(new { error = "Invalid login or password" });
            }

            var now = DateTime.Now;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Result.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Result.Name
            };

            return Json(response);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [SwaggerOperation("ValidateToken")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [SwaggerResponse((int)HttpStatusCode.Created)]
        private async Task<ClaimsIdentity> GetIdentity(string email, string password)
        {

            var result = await signInManager.PasswordSignInAsync(email, password, false, false);

            if (result.Succeeded)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Password)
                };

                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }

            return null;
        }


        [HttpPost]
        [SwaggerOperation("CreateUser")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [SwaggerResponse((int)HttpStatusCode.Created)]
        public async Task<IActionResult> Register([FromBody] Person person)
        {
            User user = new User { Email = person.Email, UserName = person.Email };
            var result = await userManager.CreateAsync(user, person.Password);
            if (result.Succeeded)
            {
                var response = new
                {
                    email = person.Email,
                    login = person.Email
                };
                return Ok(response);
            }
            return BadRequest();

        }
    }
}
