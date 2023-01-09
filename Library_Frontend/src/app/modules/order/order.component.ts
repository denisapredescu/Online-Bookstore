import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookBasket } from 'src/app/interfaces/book-basket';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public email: string = '';
  public orders: BookBasket[];
  public displayedColumns = ["rowIndex",'Order', "Price"]
  constructor(
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private route: Router
  ) { }

  ngOnInit() {
    //pentru ruta cu parametru
    this.activatedRoute.params.subscribe((params: any) => {
      console.log('param', params);
      this.email = params['email'];
    });

    console.log(this.email);
    this.basketService.GetOrders(this.email).subscribe(
      (response) => {
        console.log(response);
        this.orders =  response;

          console.log(this.orders[0][0].name);
        
      },
      (error)=>{
        console.error(error);
      });
  }

  public calculateTotal(order: BookBasket[]) {
    var total = 0;
    order.forEach(book => {
      total += book.priceOfNoCopies;
    });
    return total;
  }

  public goBack(): void{
    this.route.navigate(['/books']);
  }
}
