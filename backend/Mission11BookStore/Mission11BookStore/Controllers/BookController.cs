using Microsoft.AspNetCore.Mvc;
using Mission11BookStore.Data;
using Mission11BookStore.Models;

namespace Mission11BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BookController(BookstoreContext context)
        {
            _context = context;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            var query = _context.Books.AsQueryable();

            query = sortOrder.ToLower() == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            var totalNumBooks = query.Count();

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new BooksResponse
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }
    }
}
