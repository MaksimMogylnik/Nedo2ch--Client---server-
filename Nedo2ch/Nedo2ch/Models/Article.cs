using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nedo2ch.Models
{

    [Serializable]
    public class Article
    {
        public int ArticleId { get; set; }

        [Required]
        public string ArticleTopic { get; set; }

        public string ArticleContent { get; set; }

        public string ArticleTopicPicture { get; set; }
    }
}
