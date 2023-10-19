import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [{
    id: 1,
    nome: 'Alex Costa',
    cpf:  '689.194.850-97',
    email: 'alex.b.costa28@gmail.com',
    senha: '1234',
    perfis:['0'],
    dataCriacao: '07/07/2017'
  }
]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'opcoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
}
