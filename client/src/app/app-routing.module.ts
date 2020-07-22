import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './pages/application/application.component';
import { ConfigComponent } from './pages/config/config.component';
import { LogComponent } from './pages/log/log.component';
import { BarcodeTestComponent } from './pages/test/barcode-test/barcode-test.component';
import { ModelsComponent } from './pages/models/models.component';

const routes: Routes = [
  { path: 'application', component: ApplicationComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'log', component: LogComponent },
  { path: 'models', component: ModelsComponent },
  { path: 'test', component: BarcodeTestComponent },
  { path: '', redirectTo: '/application', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: ApplicationComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
