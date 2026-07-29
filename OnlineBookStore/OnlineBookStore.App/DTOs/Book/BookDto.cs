using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace OnlineBookStore.App.DTOs.Book
{
    public class BookDto
    {
        public int CategoryId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;

        public string ISBN { get; set; } = string.Empty;

        public double Price { get; set; }

        public IFormFile? Image { get; set; }

    }
}
