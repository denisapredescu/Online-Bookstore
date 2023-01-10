import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/author';
import { AuthorInfo } from '../interfaces/author-info';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private getOptions(author: any): any{
    const options = {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken')),
      body: author,
    };
    return options;
  }

  public url = "https://localhost:44326/api/author";

  constructor(
    private http: HttpClient
  ) { }


  //POST
  public AddAuthor(author: Author) :Observable<any>{
    const options = this.getOptions(author);
    console.log(options);
    return this.http.post<Author[]>(`${this.url}/AddAuthor`, author, options);
  }

  //POST
  public AddAuthorInfo(authorInfo: AuthorInfo) :Observable<any>{
    const options = this.getOptions(authorInfo);
    console.log(options);
    return this.http.post<AuthorInfo>(`${this.url}/AddAuthorInfo`, authorInfo, options);
  }

  //UPDATE
  public UpdateAuthor(author: Author) :Observable<any>{
    const options = this.getOptions(author);
    console.log(options);
    return this.http.put<Author[]>(`${this.url}/UpdateAuthor`, author, options);
  }

  //UPDATE
  public UpdateAuthorInfo(authorInfo: AuthorInfo) :Observable<any>{
    const options = this.getOptions(authorInfo);
    console.log(options);
    return this.http.put<AuthorInfo>(`${this.url}/UpdateAuthorInfo`, authorInfo, options);
  }

  //DELETE
  public DeleteAuthor(author) :Observable<any>{
    const options = this.getOptions(author);
    console.log(options);
    return this.http.delete<any>(`${this.url}/DeleteAuthor`, options);  
  }

  //GET
  public GetAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(`${this.url}/GetAuthors`);
  }

  //GET
  public GetAuthor(firstname: string, lastname: string): Observable<Author>{
    return this.http.get<Author>(`${this.url}/GetAuthor/${firstname}/${lastname}`);
  }

  //iau datele din authorInfo
  public GetAuthorInfo(id : number): Observable<AuthorInfo>{
    const options = {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
    };
    return this.http.get<AuthorInfo>(`${this.url}/GetAuthorInfo/${id}`, options);
  }



}
