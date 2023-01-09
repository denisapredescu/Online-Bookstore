import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { CategoryComponent } from './category/category.component';
import { AuthorComponent } from './author/author.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { PopupModule } from '../popup/popup.module';
import { HoverButtonDirective } from 'src/app/hover-button.directive';
import { BookComponent } from './book/book.component';


@NgModule({
  declarations: [
    CategoryComponent,
    AuthorComponent,
    HomeComponent,
    HoverButtonDirective,
    BookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialModule,
    PopupModule
  ],
  exports:[
    MaterialModule,
    HoverButtonDirective
  ]
 
})

export class BooksModule { }
