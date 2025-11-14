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
message!: string;

  constructor
  (
    private loginService: Loginservice,
    private clienteService: Clienteservice,
    private funcionarioService: Funcionarioservice,
    private router: Router,
    private route: ActivatedRoute
  ) {}
ngOnInit(): void {
  /*  CHECK SE USUÁRIO ESTÁ LOGADO
      Caso logado, redireciona inicialmente pra algum lugar
  */
  this.redirecionar();
   
}


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit (){
    //corrigir a service aqui!!
    this.login.login = this.loginForm.value.email!
    this.login.senha = this.loginForm.value.password!
    
    this.carregarUsuario(this.login);

    this.redirecionar();

  }

  carregarUsuario(login: Login) {
  this.loginService.login(login).subscribe(data => {
    if(data !== null)
    this.loginService.usuarioLogado = data;
  });
  } 

  redirecionar() {
    if (this.loginService.usuarioLogado) {
    // (791) Redirecionar para página inicial
    // Fiz uma alteração para redirecionar para a página inicial dependendo do tipo de usuário
    // Se for um funcionário, redireciona para a página inicial de funcionário
    // Se for um cliente, redireciona para a página inicial de cliente
  if (this.loginService.usuarioLogado.perfil == "FUNC") {
      this.router.navigate( ["/funcionario"])
    } else {
      this.router.navigate( ["/cliente"])
    }
  }
  }

  //Função para ser aplicada quando o HTML estiver feito
/* 
  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe((usu) => {
        if (usu != null) {
          this.loginService.usuarioLogado = usu;
          this.loading = false;
          this.router.navigate( ["/home"] );
        }
        else {
          this.message = "Usuário/Senha inválidos.";
        }
      });
    }
  this.loading = false;
  }
 */

}