import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: 'first-component', component: FirstComponent },
  // { path: 'second-component', component: SecondComponent },
  // { path: '', redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: FirstComponent },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page];
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
