using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineBookStore.App.DTOs.Book;
using OnlineBookStore.Domain.Models;
using OnlineBookStore.Infra.DBContext;

namespace OnlineBookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDBContext _context;

        public BookController(ApplicationDBContext dbContext)
        {
            _context = dbContext;   
        }
        /*
        [HttpGet]
        public ActionResult Get()
        {
            var books = _dbContext.Book.ToList();
            return Ok(books);
        }

        [HttpGet]
        [Route("Details")]
        public ActionResult Get(int id)
        {
            var book = _dbContext.Book.FirstOrDefault(x => x.Id == id);
            if (book == null)
            {
                return NotFound($"Book not found for Id - {id}");
            }
            return Ok(book);
        }
        */

        // GET: api/books
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            try
            {
                var books = await _context.Book.ToListAsync();

                return Ok(new
                {
                    Status = true,
                    Message = "Books retrieved successfully.",
                    Data = books
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Status = false,
                    Message = ex.Message
                });
            }
        }

        //[HttpGet]
        //public async Task<IActionResult> GetCategory()
        //{
        //    try
        //    {
        //        var category = await _context.Category.ToListAsync();

        //        return Ok(new
        //        {
        //            Status = true,
        //            Message = "Category retrieved successfully.",
        //            Data = category
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new
        //        {
        //            Status = false,
        //            Message = ex.Message
        //        });
        //    }
        //}

        // GET: api/books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            try
            {
                var book = await _context.Book.FindAsync(id);

                if (book == null)
                {
                    return NotFound(new
                    {
                        Status = false,
                        Message = "Book not found."
                    });
                }

                return Ok(new
                {
                    Status = true,
                    Data = book
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Status = false,
                    Message = ex.Message
                });
            }
        }

        //public async Task<IActionResult> CreateBook(Book book)
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromForm] BookDto model)
        {
            try
            {
                string? imageName = null;

                if (model.Image != null)
                {
                    var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images");

                    if (!Directory.Exists(folder))
                        Directory.CreateDirectory(folder);

                    imageName = Guid.NewGuid() + Path.GetExtension(model.Image.FileName);

                    var filePath = Path.Combine(folder, imageName);

                    using var stream = new FileStream(filePath, FileMode.Create);

                    await model.Image.CopyToAsync(stream);
                }

                var book = new Book
                {
                    CategoryId = model.CategoryId,
                    Title = model.Title,
                    Description = model.Description,
                    Author = model.Author,
                    ISBN = model.ISBN,
                    Price = model.Price,
                    ImageUrl = imageName
                };

                _context.Book.Add(book);

                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetBook),
                    new { id = book.Id },
                    new
                    {
                        Status = true,
                        Message = "Book created successfully.",
                        Data = book
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //// POST: api/books
        //[HttpPost]
        //public async Task<IActionResult> CreateBook(Book book)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid)
        //            return BadRequest(ModelState);


        //        _context.Book.Add(book);
        //        await _context.SaveChangesAsync();

        //        return CreatedAtAction(
        //            nameof(GetBook),
        //            new { id = book.Id },
        //            new
        //            {
        //                Status = true,
        //                Message = "Book created successfully.",
        //                Data = book
        //            });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new
        //        {
        //            Status = false,
        //            Message = ex.Message
        //        });
        //    }
        //}

        // PUT: api/books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            try
            {
                if (id != book.Id)
                {
                    return BadRequest(new
                    {
                        Status = false,
                        Message = "Id mismatch."
                    });
                }

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var existingBook = await _context.Book.FindAsync(id);

                if (existingBook == null)
                {
                    return NotFound(new
                    {
                        Status = false,
                        Message = "Book not found."
                    });
                }

                existingBook.CategoryId = book.CategoryId;
                existingBook.Title = book.Title;
                existingBook.Description = book.Description;
                existingBook.Author = book.Author;
                existingBook.ISBN = book.ISBN;
                existingBook.Price = book.Price;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Status = true,
                    Message = "Book updated successfully.",
                    Data = existingBook
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Status = false,

                    Message = ex.Message
                });
            }
        }

        // DELETE: api/books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                var book = await _context.Book.FindAsync(id);

                if (book == null)
                {
                    return NotFound(new
                    {
                        Status = false,
                        Message = "Book not found."
                    });
                }

                _context.Book.Remove(book);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Status = true,
                    Message = "Book deleted successfully."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Status = false,
                    Message = ex.Message
                });
            }
        }

    }
}
