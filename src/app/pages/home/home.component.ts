import { Component , inject} from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    auth = inject(AuthService)

    cerrarSesion()
    {
        this.auth.CerrarSesion();
    }
}
