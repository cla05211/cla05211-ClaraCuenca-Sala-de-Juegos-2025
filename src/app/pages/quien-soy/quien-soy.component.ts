import { Component, inject, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { HttpClientModule } from '@angular/common/http'; //
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class QuienSoyComponent implements OnInit
{
    username: string = 'cla05211'; 
    dataUsuario: any;
    repos: any[] = [];
    githubService = inject(GithubService);

    ngOnInit(): void 
    {
        this.cargarDatos();
    }

    async cargarDatos() 
    {
    try 
    {
        this.dataUsuario = await this.githubService.obtenerUsuario(this.username);
        this.repos = await this.githubService.obtenerRepo(this.username);
    } catch (error) 
    {
        console.error('Error al cargar datos de GitHub:', error);
    }
    }
}
