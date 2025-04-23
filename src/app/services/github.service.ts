import { Injectable, inject} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private API_URL = 'https://api.github.com/users/';

  http = inject(HttpClient);


  async obtenerUsuario(username: string): Promise<any> 
  {
    const url = `${this.API_URL}${username}`;
    return await firstValueFrom(this.http.get(url));
  }

  async obtenerRepo(username: string): Promise<any[]> 
  {
    const url = `${this.API_URL}${username}/repos`;
    return await firstValueFrom(this.http.get<any[]>(url));
  }
}