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

        // Returns books with optional category filtering, sorting, and pagination
        [HttpGet("GetBooks")]
        public IActionResult GetBooks(string? category, int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(category) && category.ToLower() != "all")
            {
                query = query.Where(b => b.Category == category);
            }

            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }

            var totalNumBooks = query.Count();

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                books = books,
                totalNumBooks = totalNumBooks
            };

            return Ok(result);
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(string? category, int pageSize = 5, int pageNum = 1)
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(b => b.Category == category);
            }

            var totalNumBooks = query.Count();

            var books = query
                .OrderBy(b => b.Title)
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

        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToList();

            return Ok(categories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();

            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.FirstOrDefault(b => b.BookID == id);

            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found." });
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.BookID == id);

            if (book == null)
            {
                return NotFound(new { message = "Book not found." });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }
}