﻿using Library.DAL.Entities;
using Library.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//in interfata se pun doar antetele functiilor
namespace Library.DAL.Interfaces
{
    public interface IAuthorRepository
    {
        Task Create(Author author);
        Task CreateAuthorInfo(AuthorInfo authorInfo);
        Task Update(Author author);
        Task UpdateAuthorInfo(AuthorInfo authorInfo);
        IQueryable<Author> GetAll();
        IQueryable<Author> GetIncludeAuthorInfo();
        Task Delete(Author author);
        Task DeleteAuthorInfo(AuthorInfo authorInfo);
        IQueryable<AuthorInfo> GetAuthorInfo();
    }
}
