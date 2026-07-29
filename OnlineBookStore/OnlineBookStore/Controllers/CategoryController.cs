using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineBookStore.Infra.DBContext;

namespace OnlineBookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ApplicationDBContext _context;

        public CategoryController(ApplicationDBContext dbContext)
        {
            _context = dbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategory()
        {
            try
            {
                var category = await _context.Category.ToListAsync();

                return Ok(new
                {
                    Status = true,
                    Message = "Category retrieved successfully.",
                    Data = category
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
