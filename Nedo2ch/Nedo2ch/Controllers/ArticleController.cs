using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nedo2ch.Models;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Nedo2ch.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticleController : Controller
    {
        private readonly ArticleContext context;
        public ArticleController(ArticleContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [SwaggerOperation("GetArticles")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Get()
        {
            return Json(await context.Articles.ToListAsync());
        }

        [HttpGet("{id}")]
        [SwaggerOperation("GetArticles")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> Get(int id)
        {
            Article article = await context.Articles.FirstOrDefaultAsync(x => x.ArticleId == id);
            if (article == null)
            {
                return NotFound();
            }
            return Json(article);
        }

        [HttpPost]
        [SwaggerOperation("PostArticles")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post(Article article)
        {
            if (article.ArticleTopic == "" && article.ArticleTopic == null)
            {
                ModelState.AddModelError("ArticleTopic", "Topic is required");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            context.Articles.Add(article);
            await context.SaveChangesAsync();
            return Ok(article);
        }

        [HttpPut]
        [SwaggerOperation("PutArticles")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [SwaggerResponse((int)HttpStatusCode.Created)]
        [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Put(Article article)
        {
            if (!context.Articles.Any(x => x.ArticleId == article.ArticleId))
            {
                return NotFound();
            }
            if (article.ArticleTopic == "" && article.ArticleTopic == null)
            {
                ModelState.AddModelError("ArticleTopic", "Topic is required");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            context.Update(article);
            await context.SaveChangesAsync();
            return Ok(article);
        }

        [HttpDelete("{id}")]
        [SwaggerOperation("DeleteArticles")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int id)
        {
            Article article = context.Articles.FirstOrDefault(x => x.ArticleId == id);
            if (article == null)
            {
                return NotFound();
            }
            context.Articles.Remove(article);
            await context.SaveChangesAsync();
            return Ok(article);
        }
    }
}
