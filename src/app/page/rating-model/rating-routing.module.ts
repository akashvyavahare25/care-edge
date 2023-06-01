import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RatingComponentComponent } from './rating-component/rating-component.component'
import { TabsContentComponent } from './tabs-content/tabs-content.component'


// dashboard
const routes: Routes = [
  {
    path: '',
    component: RatingComponentComponent,
    
  },
  {
    path: 'tabs',
    component: TabsContentComponent,
   
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class ratingRouterModule { }
