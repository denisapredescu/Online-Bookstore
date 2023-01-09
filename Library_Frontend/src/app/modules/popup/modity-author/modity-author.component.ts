import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-modity-author',
  templateUrl: './modity-author.component.html',
  styleUrls: ['./modity-author.component.scss']
})
export class ModityAuthorComponent implements OnInit {

  public authorForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  public authorInfoForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    nationality: new FormControl(null),
    birthYear: new FormControl(null),
    deathYear: new FormControl(null),
    authorId: new FormControl(0)
  });

  public title;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private authorService: AuthorService,
    public dialogRef: MatDialogRef<ModityAuthorComponent>,
  ) {
    
    if (data.author) {
      this.title = 'Edit author';
      console.log(this.data.author);
      console.log(this.data.authorInfo);
      this.authorForm.patchValue(this.data.author);
      this.authorInfoForm.patchValue(this.data.authorInfo);
    } 
    else {
      this.title = 'Add author';
    }
  }

  ngOnInit() {
  }

  public add(): void{

    this.authorService.AddAuthor(this.authorForm.value).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close(response);

        this.authorService.GetAuthor(this.authorForm.value.firstName, this.authorForm.value.lastName).subscribe(
          (result) => {
            this.authorInfoForm.value.authorId = result.id;
            this.authorService.AddAuthorInfo(this.authorInfoForm.value).subscribe(
              (result) => {
                console.log(result);
              },
              (error) => {
                console.error(error);
              });
          },
          (error) => {
            console.error(error);
          });
      },
      (error)=>{
        console.error(error);
      });
  }

  public edit(): void{
    console.log("in edit author");
    console.log(this.authorForm.value);
    this.authorService.UpdateAuthor(this.authorForm.value).subscribe(
      (response)=>{
        console.log(response);

        this.authorInfoForm.value.authorId = this.authorForm.value.id;
        this.authorService.UpdateAuthorInfo(this.authorInfoForm.value).subscribe(
          (result) => {
            console.log(result);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error(error);
          });
      },
      (error)=>{
        console.error(error);
      });
  }
}

