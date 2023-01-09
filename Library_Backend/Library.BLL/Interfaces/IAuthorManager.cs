using Library.DAL.Entities;
using Library.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.BLL.Interfaces
{
    public interface IAuthorManager
    {
        Task<List<AuthorWithFirstNameAndLastNameModel>> Create(Author author);
        Task<AuthorInfoModel> CreateAuthorInfo(AuthorInfo authorInfo);
        Task<List<AuthorWithFirstNameAndLastNameModel>> Update(Author author);
        Task<AuthorInfoModel> UpdateAuthorInfo(AuthorInfo authorInfo);
        Task<List<AuthorWithFirstNameAndLastNameModel>> GetAllWithoutAuthorInfo();
        Task<AuthorInfoModel> GetJustAuthorInfo(int id);
        Task<List<AuthorWithFirstNameAndLastNameModel>> Delete(Author author);
        Task<AuthorWithFirstNameAndLastNameModel> GetAuthor(string firstname, string lastname);
        //Task<AuthorInfoModel> AddAuthorInfo(AuthorInfo authorInfo);
    }
}
