using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineBookStore.Domain.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey(nameof(Id))]
        public int CategoryId { get; set; }
        [Required]
        public string Title { get; set; }
        
        public string Description { get; set; }        
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; }
        public double Price {  get; set; }
        public string? ImageUrl { get; set; }


    }
}
