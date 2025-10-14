import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { Clienteservice } from '../../services/clienteservice';
import { Funcionarioservice } from '../../services/funcionarioservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../../shared/models/login.model';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-rf002-login',
  templateUrl: './rf002-login.html',
  styleUrl: './rf002-login.css',
  imports: [ReactiveFormsModule],
})
export class Rf002Login implements OnInit{
login: Login = new Login();
loading: boolean = false;
message!: string;

  constructor
  (
    private loginService: Loginservice,
    private clienteService: Clienteservice,
    private funcionarioService: Funcionarioservice,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
ngOnInit(): void {
  /*  CHECK SE USUÁRIO ESTÁ LOGADO
  // Caso logado, redireciona inicialmente pra algum lugar
  //
  if (this.loginService.usuarioLogado) {
    // (791) Redirecionar para página inicial dependendo do tipo de usuário
    // this.router.navigate( ["/home"] );
  }
  else {
    this.route.queryParams.subscribe(
      params => {
        this.message = params['error'];
      }
    )
  }
   */
}


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit (){
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