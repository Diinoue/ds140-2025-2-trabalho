import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { Clienteservice } from '../services/clienteservice';

@Component({
  selector: 'app-rf002-login',
  templateUrl: './rf002-login.html',
  styleUrl: './rf002-login.css',
  imports: [ReactiveFormsModule],
})
export class Rf002Login {

  constructor(private clienteService: Clienteservice) {
    email: '';

  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit (){
    this.clienteService.salvarLogin(this.loginForm.value.email!, this.loginForm.value.password!)
    alert(
      this.loginForm.value.email + ' | ' + this.loginForm.value.password
    )
  }
}