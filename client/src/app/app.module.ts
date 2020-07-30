import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';

import { AppComponent } from './app.component';
import { ApplicationComponent } from './pages/application/application.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { InstanceInfoComponent } from './pages/application/components/instance-info/instance-info.component';
import { InstructionsComponent } from './pages/application/components/instructions/instructions.component';
import { LastResultComponent } from './pages/application/components/last-result/last-result.component';
import { InferencePreviewComponent } from './pages/application/components/inference-preview/inference-preview.component';
import { ConfirmationButtonsComponent } from './pages/application/components/confirmation-buttons/confirmation-buttons.component';
import { CameraComponent } from './pages/application/components/camera/camera.component';
import { CaptureButtonComponent } from './pages/application/components/capture-button/capture-button.component';
import { ConfigComponent } from './pages/config/config.component';
import { LogComponent } from './pages/log/log.component';
import { DeviceTableComponent } from './pages/config/components/device-table/device-table.component';
import { InstanceTableComponent } from './pages/config/components/instance-table/instance-table.component';
import { BarcodeTestComponent } from './pages/test/barcode-test/barcode-test.component';
import { ModelsComponent } from './pages/models/models.component';
import { DialogComponent } from './pages/models/components/dialog/dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ApplicationComponent,
    InstanceInfoComponent,
    InstructionsComponent,
    LastResultComponent,
    InferencePreviewComponent,
    ConfirmationButtonsComponent,
    CameraComponent,
    CaptureButtonComponent,
    ConfigComponent,
    LogComponent,
    DeviceTableComponent,
    InstanceTableComponent,
    BarcodeTestComponent,
    ModelsComponent,
    DialogComponent
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatStepperModule,
    BrowserModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
