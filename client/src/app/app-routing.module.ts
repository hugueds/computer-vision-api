import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './pages/application/application.component';
import { ConfigComponent } from './pages/config/config.component';
import { LogComponent } from './pages/log/log.component';


// const routes: Routes = [
//   { path: 'operation', component: CameraComponent },
//   { path: 'config', component: ConfigComponent },
//   { path: 'log', component: LogComponent },
//   { path: 'test', component: VideoCameraComponent },
//   { path: '', redirectTo: '/operation', pathMatch: 'full' }, // redirect to `first-component`
//   { path: '**', component: CameraComponent },
//   // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page];
// ]

const routes: Routes = [
  { path: 'application', component: ApplicationComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'log', component: LogComponent },
  { path: '', redirectTo: '/application', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: ApplicationComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
