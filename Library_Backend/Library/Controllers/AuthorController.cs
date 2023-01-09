using Library.BLL.Interfaces;
using Library.DAL.Entities;
using Library.DAL.Interfaces;
using Library.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//cere functii din interfata: functiile sunt implementate in repositori
namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorManager _authorManager; 

        public AuthorController(IAuthorManager authorManager)  //constructorul controllerului: vom avea nevoie de un context oferit din StartUp
        {
            _authorManager = authorManager;
        }
        //Create, Update, Delete - trebuie facute doar de admin

        //POST
        //adaugarea unui scriitor
        [HttpPost("AddAuthor")]
        [Authorize("Admin")]
        public async Task<IActionResult> AddAuthor([FromBody] Author author)//async = se va deschide un thread separat si se va rula acel proces pe acel thread
        {
            if (string.IsNullOrEmpty(author.LastName))  
            {
                return BadRequest("Name is null");
            }

            var newAuthors = await _authorManager.Create(author);
            return Ok(newAuthors);
        }

        //Post
        [HttpPost("AddAuthorInfo")]
        [Authorize("Admin")]
        public async Task<IActionResult> AddAuthorInfo([FromBody] AuthorInfo authorInfo)//async = se va deschide un thread separat si se va rula acel proces pe acel thread
        {
            if (authorInfo.AuthorId == 0)
            {
                return BadRequest("Cannot be an author info without author");
            }

            var newAuthorInfo = await _authorManager.CreateAuthorInfo(authorInfo);
            return Ok(newAuthorInfo);
        }


        //UPDATE
        [HttpPut("UpdateAuthor")]
        [Authorize("Admin")]
        public async Task<IActionResult> UpdateAuthor([FromBody] Author author)
        {
            var newAuthors = await _authorManager.Update(author);
            return Ok(newAuthors);
        }

        //UPDATE
        [HttpPut("UpdateAuthorInfo")]
        [Authorize("Admin")]
        public async Task<IActionResult> UpdateAuthorInfo([FromBody] AuthorInfo authorInfo)
        {
            var newAuthors = await _authorManager.UpdateAuthorInfo(authorInfo);
            return Ok(newAuthors);
        }

        //DELETE
        [HttpDelete("DeleteAuthor")]
        [Authorize("Admin")]
        public async Task<IActionResult> DeleteAuthor([FromBody] Author author)   //se sterg automat si datele din AuthorInfo
        {
            var newAuthors = await _authorManager.Delete(author);
            return Ok(newAuthors);
        }

        //GET
        //determina selectarea tuturor scriitorilor
        [HttpGet("GetAuthors")]
        public async Task<IActionResult> GetAuthors()
        {
            var authors = await _authorManager.GetAllWithoutAuthorInfo();
            return Ok(authors);
        }


        //GET
        //iau doar informatiile din AuthorInfo
        [HttpGet("GetAuthorInfo/{id}")]
        public async Task<IActionResult> GetAuthorInfo([FromRoute] int id)
        {
            var authorInfo = await _authorManager.GetJustAuthorInfo(id);
            return Ok(authorInfo);
        }

        //GET
        //iau doar informatiile din AuthorInfo
        [HttpGet("GetAuthor/{firstname}/{lastname}")]
        public async Task<IActionResult> GetAuthor([FromRoute] string firstname, string lastname)
        {
            var authorInfo = await _authorManager.GetAuthor(firstname, lastname);
            return Ok(authorInfo);
        }

        ////POST
        ////adaugarea unui scriitor
        //[HttpPost("AddAuthorInfo")]
        //[Authorize("Admin")]
        //public async Task<IActionResult> AddAuthorInfo([FromBody] AuthorInfo authorInfo)//async = se va deschide un thread separat si se va rula acel proces pe acel thread
        //{
        //    if (string.IsNullOrEmpty(authorInfo.Nationality) && authorInfo.BirthYear == 0 && authorInfo.DeathYear == 0)  
        //    {
        //        return BadRequest("Not enought data to enter to database");
        //    }

        //    if(authorInfo.AuthorId == 0)
        //    {
        //        return BadRequest("Cannot be an author info without author");
        //    }

        //    var newAuthorInfo = await _authorManager.AddAuthorInfo(authorInfo);
        //    return Ok(newAuthorInfo);
        //}
    }
}
