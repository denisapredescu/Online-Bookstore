import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from 'src/app/interfaces/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public notAdmin: boolean = this.NotAdmin();
  public error: string | boolean = false;
  public buttonText: string = "SIGN IN";
  public insertInBD: Register = {
    email: "",
    password: "",
    role: "User"
  };

  public registerForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required]),
    role: new FormControl('User', [Validators.required])
  });
  
  constructor(
    private authService: AuthService,
  ) { }

  @Input() loginTabIsOn;
  @Output() status = new EventEmitter<any[]>();

  ngOnInit(): void {
  }
  
  public NotAdmin() : any{
     if(localStorage.getItem('Role') == 'User'){ 
        return true; 
      }
    return false;
  }

  public register(): void{
    this.error =  false;    
    if (this.registerForm.value.role != 'User' && this.registerForm.value.role != 'Admin') {
      this.error = "Role field must contain just User or Admin words";
    }

    if (this.registerForm.value.password != this.registerForm.value.repeatPassword) {
      this.error = "The passwords are not the same. Please repet them";
    }

    if (this.error == false) {
      this.insertInBD.email = this.registerForm.value.email;
      this.insertInBD.password = this.registerForm.value.password;
      this.insertInBD.role = this.registerForm.value.role;
        
      this.authService.createRegister(this.insertInBD).subscribe(
        (response) =>{
        console.log(response);
        this.buttonText="SIGNED IN";
          setTimeout(() => {
            this.buttonText="SIGN IN";
          }, 5000);
      },
      (error) =>{
        this.error = "Unable to register"; 
        console.error(error);
      });
    }
  }

  public goToLogin(): void {
    this.loginTabIsOn = true;
    this.status.emit(this.loginTabIsOn);
  }
}
