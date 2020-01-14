import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('app/auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
