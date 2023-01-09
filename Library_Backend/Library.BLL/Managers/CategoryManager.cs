using Library.BLL.Interfaces;
using Library.DAL.Entities;
using Library.DAL.Interfaces;
using Library.DAL.Models;
using Library.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.BLL.Managers
{
    public class CategoryManager : ICategoryManager
    {
        private readonly ICategoryRepository _categoryRepository; //prin _ spunem ca e private

        public CategoryManager(ICategoryRepository categoryRepository)  //constructorul controllerului: vom avea nevoie de un context oferit din StartUp
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<CategoryModel>> Create(Category category)
        {

            var ok = _categoryRepository
              .GetAll()
              .Where(x => x.Name == category.Name).FirstOrDefault();  //introduc categoria doar daca nu este deja inserata

            if (ok == null)
                await _categoryRepository.Create(category);

            var cat = await GetAll();
            return cat;   
        }

        public async Task<List<CategoryModel>> Update(Category categ)
        {

            var category = await _categoryRepository.GetAll().FirstOrDefaultAsync(x => x.Id == categ.Id);

            category.Name = categ.Name;
            await _categoryRepository.Update(category);

            var cat = await GetAll();    //returnez lista de categorii updatata
            return cat;
        }

        //Delete
        public async Task<List<CategoryModel>> DeleteCategory(int categoryId)
        {
            var category = await _categoryRepository.GetAll()
                                    .Where(x => x.Id == categoryId)
                                    .Select(x => new Category
                                    {
                                        Id = x.Id,
                                        Name = x.Name
                                    })
                                    .FirstAsync();      

            await _categoryRepository.Delete(category);

            var cat = await GetAll();
            return cat;
        }

        //GET - iau toate categoriile
        public async Task<List<CategoryModel>> GetAll()
        {
            var counts = await _categoryRepository
                .GetAllBookCategories()
                .GroupBy(x => x.Category.Name)
                .Select(x => new NoBooksWithCategoryModel
                {
                    Name = x.Key,
                    Num = x.Count()
                }).ToListAsync();

            var categories = await _categoryRepository
                .GetAll()
                .Select(x => new CategoryModel
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToListAsync();

            for (int i = 0; i < categories.Count; i++)
            {
                for (int j = 0; j < counts.Count; j++)
                {
                    if (categories[i].Name.Equals(counts[j].Name))
                    {
                        categories[i].NumberOfBooks = counts[j].Num;
                    }
                }
            }
            return categories;
        }
    }
}
