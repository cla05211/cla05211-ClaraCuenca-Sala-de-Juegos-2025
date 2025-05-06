import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from './services/http.service';

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalaDeJuegos';
  router = inject(Router);
  auth = inject(AuthService)
  httpService = inject(HttpService);

  cerrarSesion()
  {
      this.auth.CerrarSesion();
      this.router.navigate(['/login']);
  }
}
