import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public loginTabIsOn: boolean = true;
  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  public goToHome(): void{
    this.route.navigate(['/books']);
  }

  public goToLogin(): void {
    this.loginTabIsOn = true;
    console.log(this.loginTabIsOn);
  }

  public goToRegister(): void {
    this.loginTabIsOn = false;
    console.log(this.loginTabIsOn);
  }

  public receivePageStatus(event) {
    this.loginTabIsOn = event;
  }
}

