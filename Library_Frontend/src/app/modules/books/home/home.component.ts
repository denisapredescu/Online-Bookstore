import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/interfaces/author';
import { Book } from 'src/app/interfaces/book';
import { Category } from 'src/app/interfaces/category';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ModityBookComponent } from '../../popup/modity-book/modity-book.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


//Componenta Home trimite emailul catre Basket printr-o ruta cu param
//Componenta Home trimite emailul catre Order printr-o ruta cu param

//comunicarea dintre Author si Category cu Book se face prin relatia parinte-copil (input)
//Home (parinte) trimite informatii doar copilului Category (Output)

export class HomeComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public sharedEmail: string = '';   //se transmite date din AuthComponent => avem nevoie in HomeComponent de emailul celui logat
                                     //se transmit prin server
  public books: Book[];
  public role: string = localStorage.getItem('Role');
  public canDisplay: boolean = false;
  public categoriesList: Category[];   //trimit lista catre componenta Category 
  public authorsList: Author[]; 
  //HomeComponent primeste de la componentele copil: CategoryComponent, AuthorComponent datele selectate de user
  public givenFromAuthorComponent: Author[] = [];
  public givenNameFromCategoryComponent: Category[] = [];

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private bookService: BookService,
    public dialog: MatDialog,
    private changeDetection: ChangeDetectorRef,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.subscription = this.sharedDataService.currentEmailUser.subscribe((sharedEmail) => this.sharedEmail = sharedEmail);

    if (this.sharedEmail === 'default email') {
      localStorage.setItem('Role', 'User');
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      this.role = localStorage.getItem('Role');
    }

    this.bookService.getAllBooks().subscribe(
      (result: Book[]) => {
        this.books = result;
        console.log(this.books);
      },
      (error) => {
        console.error(error);
      });

    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categoriesList = response;
        console.log(this.categoriesList);
      },
      (error)=>{
        console.error(error);
      });

    this.authorService.GetAuthors().subscribe(
      (response)=>{
        console.log(response);
        this.authorsList = response;
      },
      (error)=>{
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public auth(): void{
    this.router.navigate(['/auth']);
  }

  public receiveMessageFromAuthor(event): void{
    console.log(event);
    this.givenFromAuthorComponent = event;
    this.changeDetection.detectChanges();
  }

  public receiveMessageFromCategory(event): void{
    console.log(event);
    this.givenNameFromCategoryComponent = event;
    this.changeDetection.detectChanges();
  }

  public receiveModifiedListOfBooks(event): void{
    if (event !== null)
      this.books = event;
      this.changeDetection.detectChanges();
  }

  public logout(): void{
    this.sharedDataService.changeUserData('default email');
    //pun valorile default
    localStorage.setItem('Role', 'User');
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    
    this.role = localStorage.getItem('Role');  //va disparea butonul de Add Book
  }

  public showFilters() {
    this.canDisplay = !this.canDisplay;
  }

  public add(): void{
    this.openModal();
  }

  public openModal(book?): void {
    console.log("openModal din home");
    const data = {
      book
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.height = '700px';
    dialogConfig.data = data;
    
    const dialogRef = this.dialog.open(ModityBookComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.books = result;
      }
    });
  }

  public saveChangings(): void{
    console.log("ne intoarcem cu filterle selectate");
    console.log(this.givenFromAuthorComponent);
    console.log(this.givenNameFromCategoryComponent);

    var listOfAuthorIds = [];
    var listOfCategories = [];
    this.givenFromAuthorComponent.forEach(author => {
      if (author.isChecked)
        listOfAuthorIds.push(author.id);
    }); 

    this.givenNameFromCategoryComponent.forEach(category => {
      if (category.isChecked)
        listOfCategories.push(category.name);
    }); 


    if (listOfAuthorIds.length !== 0 && listOfCategories.length === 0) {
        this.books = [];
        for (var i = 0; i < listOfAuthorIds.length; i++) {
          this.bookService.getBooksWithAuthor(listOfAuthorIds[i]).subscribe(
          (response) => {
            if (this.books.length === 0) {
              this.books = response;
            } else {
              response.forEach(newBook => {
                var isAlready = false;
                this.books.forEach(bookWithAuthor => {
                  if (newBook.id === bookWithAuthor.id) {
                    isAlready = true;
                  }
                });

                if(!isAlready) {
                  this.books.push(newBook);
                }
              });
            }
          },
          (error) => {
            console.error(error);
          });
        }
    }
    
    if (listOfAuthorIds.length === 0 && listOfCategories.length !== 0) {
        this.books = [];
        for (var i = 0; i < listOfCategories.length; i++) {
          this.bookService.getBookWithCategory(listOfCategories[i]).subscribe(
          (response) => {
            if(this.books.length === 0) {
              this.books = response;
            } else {
              response.forEach(newBook => {
                var isAlready = false;
                this.books.forEach(bookWithCategory => {
                  if (newBook.id === bookWithCategory.id) {
                    isAlready = true;
                  }
                });

                if (!isAlready) {
                  this.books.push(newBook);
                }
              }); 
            }
          },
          (error) => {
            console.error(error);
          });
        }
    }

    if (listOfAuthorIds.length !== 0 && listOfCategories.length !== 0) {

      var temporaryBooksAuthorList = [];
      var temporaryBooksCategoryList = [];
      for (var i = 0; i < listOfAuthorIds.length; ++i) {
        this.bookService.getBooksWithAuthor(listOfAuthorIds[i]).subscribe(
          (response) => {
          if (temporaryBooksAuthorList.length === 0) {
            temporaryBooksAuthorList = response;
          } else {
            response.forEach(newBook => {
              var isAlready = false;
              temporaryBooksAuthorList.forEach(bookWithAuthor => {
                if (newBook.id === bookWithAuthor.id) {
                  isAlready = true;
                }
              });

              if(!isAlready) {
                temporaryBooksAuthorList.push(newBook);
              }
            });
          }

          if (i >= listOfAuthorIds.length - 1) {
            
            for (var j = 0; j < listOfCategories.length; ++j) {
              this.bookService.getBookWithCategory(listOfCategories[j]).subscribe(
              (response) => {
                if(temporaryBooksCategoryList.length === 0) {
                  temporaryBooksCategoryList = response;
                } else {
                  response.forEach(newBook => {
                    var isAlready = false;
                    temporaryBooksCategoryList.forEach(bookWithCategory => {
                      if (newBook.id === bookWithCategory.id) {
                        isAlready = true;
                      }
                    });
    
                    if (!isAlready) {   // este si in category si in author => carte comuna dupa preferinte
                      temporaryBooksCategoryList.push(newBook);
                    }
                  }); 
                }
    
                if (j >= listOfCategories.length - 1) {
                  console.log(temporaryBooksCategoryList);
                  console.log("liste intermediare");
                  console.log(temporaryBooksAuthorList);
                  console.log(temporaryBooksCategoryList);

                  this.books = [];
                  var isCommon;
                  var indexA = 0, indexC = 0;
                  for (indexA = 0; indexA < temporaryBooksAuthorList.length; indexA++) {
                    isCommon = false;
                    for (indexC = 0; indexC < temporaryBooksCategoryList.length ; indexC++) {
                      if(temporaryBooksAuthorList[indexA].id === temporaryBooksCategoryList[indexC].id) {
                        isCommon = true;
                      }
                    }
                    if (isCommon) {
                      this.books.push(temporaryBooksAuthorList[indexA]);
                    }

                    console.log("lista oficiala", this.books);
                  }
                }
              },
              (error) => {
                console.error(error);
              });
            }
          }
        },
        (error) => {
          console.error(error);
        });
      }
    }
  }  

  //ruta cu parametri
  public goToUserBasket(): void{
    this.router.navigate(['basket/', this.sharedEmail]);
  }

  public goToOrders (): void{
    this.router.navigate(['orders/', this.sharedEmail]);
  }
}


