import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'

// dashboard
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'home', permission: '-' },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class HomeRouterModule { }
