import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Author } from 'src/app/interfaces/author';
import { Category } from 'src/app/interfaces/category';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-modity-book',
  templateUrl: './modity-book.component.html',
  styleUrls: ['./modity-book.component.scss']
})

export class ModityBookComponent implements OnInit {

  public bookForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    price: new FormControl(0),
    noPages: new FormControl(0),
    year: new FormControl(0),
    noVolume: new FormControl(0),
    seriesName: new FormControl(''),
    authorId: new FormControl(null)
  });

  // file: File;
  // nup

  public title;
  public authors: Author[];
  public categories: Category[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private bookService: BookService,
    public dialogRef: MatDialogRef<ModityBookComponent>,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) {
    console.log(this.data);
    if (data.book) {
      this.title = 'Edit book';
      this.bookForm.patchValue(this.data.book);
      // this.bookForm.value.authorId = this.data.book.authorId;
    } else {
      this.title = 'Add book';
    }

    // console.log("autori");
    // this.authorService.GetAuthors().subscribe(
    //   (response) => {
        
    //     // console.log(response);
    //     this.authors = response;
    //   },
    //   (error) => {
    //     console.error(error);
    //   });

    // console.log(this.authors);
  }

  ngOnInit() {
    // console.log("autori");
    this.authorService.GetAuthors().subscribe(
      (response) => {
        
        // console.log(response);
        this.authors = response;
        // console.log(response);
      },
      (error) => {
        console.error(error);
      });

    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log(this.authors);
  }

  // nup
  // onFileAdd(file: File) {
  //   this.file = file;
  //   console.log(this.file);
  // }

  // onFileRemove() {
  //   this.file = null;
  // }

  public add(): void {

    console.log(this.bookForm.value);
    if (this.bookForm.value.authorId === "null" || this.bookForm.value.authorId === "none") {
      this.bookForm.value.authorId = null;
    } else {
      this.bookForm.value.authorId = parseInt(this.bookForm.value.authorId);
    }

    this.bookService.addBook(this.bookForm.value).subscribe(
      (result) => {
        console.log(result);

        this.bookService.getBookByName(this.bookForm.value.name).subscribe(
          (response) => {

            this.categories.forEach(category => {
              if (category.isChecked) {
                var bookCategory = {
                  "bookId":  response.id,
                  "categoryId": category.id
                };

                this.bookService.addCategoryToBook(bookCategory).subscribe(
                  (response) => {
                    console.log("ajung aici");
                    console.log(response);
                  },
                  (error) => {
                    console.error(error);
                  });
              }
            });
          },

          (error) => {
            console.error(error);
          }
        );
        this.dialogRef.close(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public edit(): void {
    console.log("in modify");
    console.log(this.bookForm.value);
    if (this.bookForm.value.authorId === "null" || this.bookForm.value.authorId === "none") {
      this.bookForm.value.authorId = null;
    } else {
      this.bookForm.value.authorId = parseInt(this.bookForm.value.authorId);
    }
    this.bookService.updateBook(this.bookForm.value).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public changeValue(category: Category) {
    category.isChecked = !category.isChecked;
    console.log(category);
  }

}