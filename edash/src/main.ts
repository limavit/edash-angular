import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const updatedConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withFetch()),
    provideRouter(routes)
  ]
};

console.log('Iniciando a aplicação');

bootstrapApplication(AppComponent, updatedConfig)
  .catch((err) => console.error('Erro ao iniciar a aplicação:', err));