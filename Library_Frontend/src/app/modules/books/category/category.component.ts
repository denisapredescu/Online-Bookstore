import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ModityCategoryComponent } from '../../popup/modity-category/modity-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public displayedColumns = ['Category', 'edit', 'delete', 'select'];
  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
  ) { }

  @Input() categoriesList;     //primeste date de la parinte
  @Output() chosenCategories = new EventEmitter<any[]>();

  ngOnInit(): void {    
  }

  public isAdmin(): boolean{

    if(localStorage.getItem('Role') === 'User'){
        return false;
    };
    
    return true;
  }

  // public select(category: Category): void{
  //   this.chosenCategories.emit(category.name);
  // }

  public delete(category: Category): void{
    this.categoryService.deleteCategory(category.id).subscribe(
      (response) => {
        this.categoriesList= response;
      },
      (error)=>{
        console.error(error);
      });
  }

  public edit(category: Category): void{
    console.log("in edit");
    this.openModal(category);
  }

  public add(): void{
    this.openModal();
  }

  public openModal(category?): void {
    const data = {
      category
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';
    dialogConfig.height = '250px';
    dialogConfig.data = data;

    console.log("in openModal");
    
    const dialogRef = this.dialog.open(ModityCategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.categoriesList= result;
      }
    });
  }

  public changeValue(category: Category) {
    category.isChecked = !category.isChecked;
    console.log(category);
    // console.log(this.chosenCategories);

    this.chosenCategories.emit(this.categoriesList);
  }

  public isChecked(category: Category) {
    return category.isChecked;
  }
}
