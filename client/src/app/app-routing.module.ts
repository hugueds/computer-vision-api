import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ConfigComponent } from './containers/config/config.component';
import { CameraComponent } from './containers/camera/camera.component';
import { LogComponent } from './containers/log/log.component';


const routes: Routes = [
  { path: 'operation', component: CameraComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'log', component: LogComponent },
  { path: '', redirectTo: '/operation', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: CameraComponent },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page];
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
