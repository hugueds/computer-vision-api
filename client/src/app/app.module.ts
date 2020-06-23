import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './containers/camera/camera.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './containers/navbar/navbar.component';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';


import { HomeComponent } from './containers/home/home.component';
import { ConfigComponent } from './containers/config/config.component';
import { LogComponent } from './containers/log/log.component';
import { BarcodeCameraComponent } from './components/barcode-camera/barcode-camera.component';
import { VideoCameraComponent } from './components/video-camera/video-camera.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    NavbarComponent,
    HomeComponent,
    ConfigComponent,
    LogComponent,
    BarcodeCameraComponent,
    VideoCameraComponent
  ],
  imports: [
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,    
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
