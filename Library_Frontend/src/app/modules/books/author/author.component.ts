import { EventEmitter ,Component, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Author } from 'src/app/interfaces/author';
import { AuthorInfo } from 'src/app/interfaces/author-info';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorDetailsComponent } from '../../popup/author-details/author-details.component';
import { ModityAuthorComponent } from '../../popup/modity-author/modity-author.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  public displayedColumns = [ 'Name', 'More details', 'edit', 'delete', 'select'];
  public authorInfo: AuthorInfo = {
    id: 0,
    firstName: null,
    lastName: null,
    nationality: null,
    birthYear: null,
    deathYear: null,
    authorId: null
  };

  @Input() authorsList;
  @Output() chosenAuthors = new EventEmitter<Author[]>();  //dau parintelui

  constructor(
    private authorService: AuthorService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public isAdmin(): boolean{
    if(localStorage.getItem('Role') === 'User')
      return false;
    
    return true;
  }

  public edit(author: Author): void{
    this.authorService.GetAuthorInfo(author.id).subscribe(
      (response) =>{
          this.authorInfo = response;
          
          console.log(this.authorInfo);
          this.openModal(author, this.authorInfo);
      },  
      (error)=>{
        console.error(error);
        
      });
  }

  public add(): void{
    this.openModal();
  }

  public openModal(author?, authorInfo?): void {
    const data = {
      author,
      authorInfo
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '600px';
    dialogConfig.data = data;
    
    const dialogRef = this.dialog.open(ModityAuthorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.authorsList = result;
      }
    });
  }

  public delete(author: Author): void{
    console.log(author);
    
    this.authorService.DeleteAuthor(author).subscribe(
      (response)=>{
        if (response !== null)
          this.authorsList=response;
      },
      (error)=>{
        console.error(error);
      });
  }

  public info(author: Author): void{
    console.log(author);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '400px';
    dialogConfig.data = author;
    
    const dialogRef = this.dialog.open(AuthorDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    }); 
  }

  public changeValue(author: Author) {
    author.isChecked = !author.isChecked;
    console.log(author);
    this.chosenAuthors.emit(this.authorsList);
  }

  public isChecked(author: AuthorComponent) {
    return author.isChecked;
  }
}
