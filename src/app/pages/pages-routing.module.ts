import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {PageComponent} from './page/page.component';
import {ContentComponent} from "./content/content.component";
import {AuthGuard} from "../auth/login/_helpers";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      redirectTo: 'page',
      pathMatch: 'full',
    },
    {
      path: 'page',
      component: PageComponent,
    },
    {
      path: 'content',
      component: ContentComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
