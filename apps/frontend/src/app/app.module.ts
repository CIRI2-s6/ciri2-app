import {
  NgModule,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { NotifierModule } from 'angular-notifier';
import { notifierOptions } from './options/notifierOptions';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BackgroundComponent } from './components/background/background.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BackgroundComponent,
    NavbarComponent,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        audience: environment.audience,
        redirect_uri: window.location.origin,
      },
      httpInterceptor: {
        allowedList: [
          `${environment.apiUrl}/component*`,
          `${environment.apiUrl}/account*`,
        ],
      },
    }),
    HttpClientModule,
    NotifierModule.withConfig(notifierOptions),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    provideExperimentalZonelessChangeDetection(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
