using Library.BLL.Interfaces;
using Library.DAL.Entities;
using Library.DAL.Interfaces;
using Library.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Collections.Generic;

using System.Linq;

using System.Threading.Tasks;

namespace Library.BLL.Managers
{
    public class BookManager: IBookManager
    {
        private readonly IBookRepository _bookRepository; //prin _ spunem ca e private

        public BookManager(IBookRepository bookRepository)  
        {
            _bookRepository = bookRepository;
        }

        //Adaug o noua carte
        public async Task<List<BookModel>> Create(Book book)
        {
            await _bookRepository.Create(book);
            
            var newList = await GetAllBooks();
            return newList;
        }

        //updatez o carte
        public async Task<List<BookModel>> Update(Book book)
        {
            await _bookRepository.Update(book);
            
            var newList = await GetAllBooks();
            return newList;
        }

        //sterg o carte din baza de date
        public async Task<List<BookModel>> Delete(Book book)
        {
            await _bookRepository.Delete(book);

            var newList = await GetAllBooks();
            return newList;
        }

        //se iau doar cartile care sunt incluse 
        public async Task<List<BookModel>> GetBooksWithGivenCategory(string category)
        {
            var books = await _bookRepository
                .GetBooksWithCategory()
                .Where(x => x.Category.Name == category)
                .Select(x => new BookModel
                {
                    Id = x.Book.Id,
                    Name = x.Book.Name,
                    Price = x.Book.Price,
                    NoPages = x.Book.NoPages,
                    Year = x.Book.Year,
                    NoVolume = x.Book.NoVolume,
                    SeriesName = x.Book.SeriesName,
                    AuthorId = x.Book.AuthorId
                })
                .ToListAsync();

            return books;
        }

        //iau doar cartile scrise de autorul respectiv
        public async Task<List<BookModel>> GetBooksWithGivenAuthor(int idAuthor)
        {
            var books = await _bookRepository
                .GetBooksWithAuthor()
                .Where(x => x.Author.Id == idAuthor)
                .Select(x => new BookModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price,
                    NoPages = x.NoPages,
                    Year = x.Year,
                    NoVolume = x.NoVolume,
                    SeriesName = x.SeriesName,
                    AuthorId = x.AuthorId
                })
                .ToListAsync();
            return books;
        }

        //selectez toate cartile din BD
        public async Task<List<BookModel>> GetAllBooks()
        {
            var books = await _bookRepository.GetBooks()
                .Select(x => new BookModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price,
                    NoPages = x.NoPages,
                    Year = x.Year,
                    NoVolume = x.NoVolume,
                    SeriesName = x.SeriesName,
                    AuthorId = x.AuthorId
                })
                .OrderBy(x => x.Name)
                .ToListAsync();
            return books;
        }
        public async Task<BookModel> GetBookByName(string name)
        {
            var book =  _bookRepository.GetBooks()
                .Where(x => x.Name.Equals(name))
                .Select(x => new BookModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price,
                    NoPages = x.NoPages,
                    Year = x.Year,
                    NoVolume = x.NoVolume,
                    SeriesName = x.SeriesName,
                    AuthorId = x.AuthorId
                })
                .FirstOrDefault();
            return book;
        }

        public async Task<BookCategoryModel> AddCategoryToBook(BookCategory bookCategory)
        {
            await _bookRepository.AddCategoryToBook(bookCategory);

            var newInsertion =  _bookRepository
                .GetBooksWithCategory()
                .Where(x => x.BookId.Equals(bookCategory.BookId) && x.CategoryId.Equals(bookCategory.CategoryId))
                .Select(x => new BookCategoryModel
                {
                    BookId = x.BookId,
                    CategoryId = x.CategoryId
                })
                .FirstOrDefault();
            return newInsertion;
        }

        public async Task<List<string>> GeCategoriesForBook(int bookId)
        {
            var categories = await _bookRepository
                .GetBooksWithCategory()
                .Where(x => x.BookId == bookId)
                .Select(x => x.Category.Name)
                .ToListAsync();

            return categories;
        }
    }
}
