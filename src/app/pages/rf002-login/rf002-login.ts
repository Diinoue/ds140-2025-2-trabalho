import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { Clienteservice } from '../../services/clienteservice';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rf002-login',
  templateUrl: './rf002-login.html',
  styleUrl: './rf002-login.css',
  imports: [ReactiveFormsModule],
})
export class Rf002Login {

  constructor
  (
    private clienteService: Clienteservice,
    private funcionarioService: Funcionarioservice,
    private router: Router,
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit (){
    /*  */
    if(this.clienteService.salvarLogin(this.loginForm.value.email!, this.loginForm.value.password!))
    {
      this.router.navigate(['/cliente']).then(() =>{
      window.location.reload();
      });
    }
    else if(this.funcionarioService.salvarLogin(this.loginForm.value.email!, this.loginForm.value.password!))
    {
      this.router.navigate(['/funcionario']).then(() =>{;
      window.location.reload();
      });
    }
    else{
      alert (
        'Login não existe.'
      )
    }
  }
}