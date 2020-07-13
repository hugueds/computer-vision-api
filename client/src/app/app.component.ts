import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'cv-client';

  // TODO:
  // Carregar as informações do Device
  // Passar as informações para o APPBAR e possivel footer
  // Gerenciar os intervals da aplicação
  // Iniciar serviço que pinga o sistema para ver se esta online e manda para o navbar

  ngOnInit(): void {       
    
    
  }


}
