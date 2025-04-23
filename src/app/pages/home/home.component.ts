import { Component , inject} from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
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
