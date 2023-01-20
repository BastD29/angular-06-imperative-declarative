import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'declarative',
    loadChildren: () =>
      import('./home/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'imperative',
    loadChildren: () =>
      import('./imperative/imperative/imperative.module').then(
        (m) => m.ImperativePageModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
