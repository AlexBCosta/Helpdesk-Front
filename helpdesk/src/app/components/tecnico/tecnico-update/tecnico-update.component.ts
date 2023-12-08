import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
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

  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
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

  findById(): void{
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }

  update(): void {
    this.service.update(this.tecnico).subscribe(resposta => {
    this.toast.success('Tecnico atualizado com sucesso', 'Atualizar');
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
