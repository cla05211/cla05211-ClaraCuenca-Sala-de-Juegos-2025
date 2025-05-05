import { Component, inject, signal, ViewChild, ElementRef} from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sala-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './sala-chat.component.html',
  styleUrl: './sala-chat.component.css'
})

export class SalaChatComponent 
{
    db = inject(DataBaseService);
    auth = inject(AuthService);
    chats = signal<any>([]);
    mensaje:string = "";
    @ViewChild('mensajeContenedor') mensajeContenedor!: ElementRef;
    
    constructor()
    {
        this.db.listarChat().then((data)=>
            {
                this.chats.set([...data]);
            });   
            
        this.scrollearMensajes();
    }

    ngOnInit()
{
    const canal = this.db.supabase.channel("table-db-changes");

    canal.on("postgres_changes", {
        event: "*",
        table: "chat",
        schema: "public",
    }, async (cambios: any) => { 
        const { data, error } = await this.db.supabase
            .from("chat")
            .select("id, mensaje, created_at, usuarios(correo, nombre)")
            .eq("id", cambios.new.id)
            .single();

        if (data) 
        {
            this.chats.update(valorAnterior => {
                valorAnterior.push(data);
                this.scrollearMensajes();
                return valorAnterior;
            });
        } 
    });

    canal.subscribe();
}

    async enviarMensaje()
    {
        await this.db.enviarChat(this.auth.usuarioActual?.email!, this.mensaje);
        this.mensaje = "";
    }

    scrollearMensajes(): void {
        setTimeout(() => {
            const contenedor = this.mensajeContenedor.nativeElement;
            contenedor.scrollTop = contenedor.scrollHeight;
        }, 0);
    }
}
