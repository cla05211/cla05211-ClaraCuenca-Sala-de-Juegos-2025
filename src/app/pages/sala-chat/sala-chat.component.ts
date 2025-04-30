import { Component, inject } from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from '../../services/auth.service';
import { Chat } from '../../interfaces/chat';
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
    chats: Array<Chat>= [];
    mensaje:string = "";
    
    constructor()
    {
        this.obtenerUltimosChats();
    }

    async obtenerUltimosChats()
    {
        this.chats = [];
        const chats = await this.db.listarChat();
        for (const chat of chats!)
        this.chats.push({
            ...chat,
            fecha: new Date(chat.created_at)
            });
    }

    async enviarMensaje()
    {
        await this.db.enviarChat(this.auth.usuarioActual?.email!, this.mensaje);
        this.obtenerUltimosChats();
    }
}
