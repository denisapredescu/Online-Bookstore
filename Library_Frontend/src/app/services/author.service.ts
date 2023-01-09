import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/author';
import { AuthorInfo } from '../interfaces/author-info';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
  };

  public url = "https://localhost:44326/api/author";

  constructor(
    private http: HttpClient
  ) { }


  //POST
  public AddAuthor(author: Author) :Observable<Author[]>{
    return this.http.post<Author[]>(`${this.url}/AddAuthor`, author, this.httpOptions);
  }

  //POST
  public AddAuthorInfo(authorInfo: AuthorInfo) :Observable<AuthorInfo>{
    return this.http.post<AuthorInfo>(`${this.url}/AddAuthorInfo`, authorInfo, this.httpOptions);
  }

  //UPDATE
  public UpdateAuthor(author: Author) :Observable<Author[]>{
    return this.http.put<Author[]>(`${this.url}/UpdateAuthor`, author, this.httpOptions);
  }

  //UPDATE
  public UpdateAuthorInfo(authorInfo: AuthorInfo) :Observable<AuthorInfo>{
    console.log(authorInfo);
    return this.http.put<AuthorInfo>(`${this.url}/UpdateAuthorInfo`, authorInfo, this.httpOptions);
  }

  //DELETE
  public DeleteAuthor(author) :Observable<any>{
    const options = {
          headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken')),
          body: author,
        };
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
