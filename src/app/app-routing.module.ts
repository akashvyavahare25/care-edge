import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';
import { LayoutComponent } from './page/auth/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rating',
    data: { permission: '-' },
    pathMatch: 'full',
  },
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        // data: { permission: '-' },
        loadChildren: () =>
          import('src/app/page/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'rating',
        // data: { permission: '-' },
        loadChildren: () =>
          import('src/app/page/rating-model/rating.module').then(m => m.RatingModule),
      },
     
    ]
  },
];

@NgModule({
  imports: [SharedModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
