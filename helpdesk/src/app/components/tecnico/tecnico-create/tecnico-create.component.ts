import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id:          '',
    nome:        '',
    email:       '',
    cpf:         '',
    senha:       '',
    perfis:      [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);
  cpf: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);
  email: FormControl = new FormControl(null, [Validators.email, Validators.required]);
  senha: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);

  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  validarCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  addPerfil(perfil: any): void {

    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }else{
      this.tecnico.perfis.push(perfil);
    }
  }

  create(): void {
    this.service.create(this.tecnico).subscribe(resposta => {
    this.toast.success('Tecnico cadastrado com sucesso', 'Cadastro');
    this.router.navigate(['tecnicos'])
    }, excecao => {
      if (excecao.error.errors) {
        excecao.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(excecao.error.message);
      }
    })
  }
}
