import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-rf002-login',
  templateUrl: './rf002-login.html',
  styleUrl: './rf002-login.css',
  imports: [ReactiveFormsModule],
})
export class Rf002Login {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit (){
    alert(
      this.loginForm.value.email + ' | ' + this.loginForm.value.password
    )
  }
}