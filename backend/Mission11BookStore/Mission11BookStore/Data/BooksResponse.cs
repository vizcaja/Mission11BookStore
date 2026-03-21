using Mission11BookStore.Data;

namespace Mission11BookStore.Models
{
    public class BooksResponse
    {
        public List<Book> Books { get; set; } = new List<Book>();
        public int TotalNumBooks { get; set; }
    }
}
