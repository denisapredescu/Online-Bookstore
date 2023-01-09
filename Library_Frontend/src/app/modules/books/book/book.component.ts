import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/interfaces/author';
import { AuthorInfo } from 'src/app/interfaces/author-info';
import { Book } from 'src/app/interfaces/book';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ModityBookComponent } from '../../popup/modity-book/modity-book.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  
  public subscription: Subscription;
  public sharedEmail: string = '';   //se transmite date din AuthComponent => avem nevoie in HomeComponent de emailul celui logat
                                     //se transmit prin server
  
  public addToBasketText = "Add To Basket";
  public author: AuthorInfo = {
    id: 0,
    firstName: null,
    lastName: null,
    nationality: null,
    birthYear: null,
    deathYear: null,
    authorId: null
  };

  public categories: String[] = [];

  constructor(
    private router: Router,
    private bookService: BookService,
    public dialog: MatDialog,
    private sharedDataService: SharedDataService,
    private authorService: AuthorService
  ) { }

  @Input() book;     //primeste date de la parinte
  @Output() modifiedList = new EventEmitter<Book[]>();
  @Input() role;
 
  ngOnInit() {
    this.subscription = this.sharedDataService.currentEmailUser.subscribe((sharedEmail) => this.sharedEmail = sharedEmail);
  
    if (this.book.authorId !== null) {
      this.authorService.GetAuthorInfo(this.book.authorId).subscribe(
        (response) => {
          this.author = response;
        },
        (error) => {
          console.error(error);
        }
      ); 
    }

    this.bookService.geCategoriesForBook(this.book.id).subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public delete(book: Book): void{
    console.log(book);
    this.bookService.deleteBook(book).subscribe(
      (response)=>{
        this.modifiedList.emit(response);
      },
      (error) =>{
          console.error(error);
      }
    );
  }

  public edit(book: Book): void{
    this.openModal(book);

  }
  public add(): void{
    this.openModal();
  }

  public openModal(book?): void {
    console.log("intra aici");
    console.log(book);
    const data = {
      book
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.height = '700px';
    dialogConfig.data = data;
    
    const dialogRef = this.dialog.open(ModityBookComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        // this.modifiedList = result;
        console.log("succes");
        this.modifiedList.emit(result);
        // if (book !== null)
        //   this.book = book;
      }
    });
  }

  public addToBasket(book: Book): void{

    console.log(this.sharedEmail);

    if(this.sharedEmail == 'default email')
        this.router.navigate(['/auth']);
    else
    {
      this.bookService.addBasketToUser(this.sharedEmail).subscribe(
        (response)=>{
            this.bookService.addToBookBasket(book.id, this.sharedEmail).subscribe(
              (response) => {
                this.addToBasketText="Added To Basket";
                setTimeout(() => {
                  this.addToBasketText="Add To Basket";
                }, 3000);
              },
              (error)=>{
                console.error(error);
              });
        },
        (error)=>{
          console.error(error);
        });
    }
  }

}
