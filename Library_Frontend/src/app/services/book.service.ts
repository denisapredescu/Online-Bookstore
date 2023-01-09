import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private getOptions(book: Book): any {
    const options = {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken')),
      body: book,
    };
    return options;
  }
  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
  };

  //metodele din tabelul asociativ sunt puse in service-urile tabelelor Book si Basket
  //de asemenea, iau si o metoda din BasketController pentru ca in pagina HomeComponent selectez cartile pe care vreau sa le pun in cos
  
  public urlBook = "https://localhost:44326/api/book";
  public urlBookBasket = "https://localhost:44326/api/bookbasket";   //pentru tabelul asociativ
  public urlBasket = "https://localhost:44326/api/basket";

  constructor(
    private http: HttpClient
    ) { }


  public addBook(book: Book): Observable<any> {
    // const options = {
    //   headers: new HttpHeaders()
    //       .set('Content-Type', 'application/json')
    //       .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken')),
    //   body: book,
    // };
    // console.log("ajunge in service");
    // console.log(book);
    // return this.http.post<Book[]>(`${this.urlBook}/AddBook`, options);
    const options = this.getOptions(book);
    console.log(options);
  
    return this.http.post<Book[]>(`${this.urlBook}/AddBook`, book, options);
  }

  public updateBook(book:Book):Observable<any> {
    
    console.log("ajunge in service");
    console.log(book);
    const token = localStorage.getItem('accessToken');
    // return this.http.put<Book[]>(`${this.urlBook}/UpdateBook`, book, this.httpOptions);

    // const options = {
    //   headers: new HttpHeaders()
    //       .set('Content-Type', 'application/json')
    //       .set('Authorization', 'Bearer ' + token),
    //   body: book,
    // };
    const options = this.getOptions(book);
    console.log(options);
    return this.http.put<Book[]>(`${this.urlBook}/UpdateBook`, book, options);
  }
  
  public deleteBook(book: Book): Observable<any> {
    console.log(book);
    // const options = {
    //   headers: new HttpHeaders()
    //       .set('Content-Type', 'application/json')
    //       .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken')),
    //   body: book,
    // };
    const options = this.getOptions(book);
    console.log(options);
    return this.http.delete<Book[]>(`${this.urlBook}/DeleteBook`, options);
  }

  public getAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.urlBook}/GetAllBooks`);
  }

  public getBookByName(name: string): Observable<Book>{
    return this.http.get<Book>(`${this.urlBook}/GetBookByName/${name}`);
  }

  public getBookWithCategory(category: string): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.urlBook}/GetBooksWithCategory/${category}`);
  }

  public getBooksWithAuthor(idAuthor: number): Observable<Book[]>{
    var books = this.http.get<Book[]>(`${this.urlBook}/GetBooksWithAuthor/${idAuthor}`);
    return books;
  }

  public addToBookBasket(id: number, email: string): Observable<any> {
    return this.http.post<any>(`${this.urlBookBasket}/AddBookBasket/${id}/${email}`, null);
  }

  public addBasketToUser(email: string): Observable<any> {
    return this.http.post<any>(`${this.urlBasket}/AddBasketToUser/${email}`, null);
  }

  public addCategoryToBook(bookCategory: any): Observable<any> {
    return this.http.post<any>(`${this.urlBook}/AddCategoryToBook`, bookCategory, this.httpOptions);
  }

  public geCategoriesForBook(bookId: number): Observable<String[]>{
    var categories = this.http.get<String[]>(`${this.urlBook}/GeCategoriesForBook/${bookId}`);
    return categories;
  }
}
