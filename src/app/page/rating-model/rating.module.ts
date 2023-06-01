import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ratingRouterModule } from './rating-routing.module';
import { RatingComponentComponent } from './rating-component/rating-component.component';
import { TabsContentComponent } from './tabs-content/tabs-content.component';




@NgModule({
  declarations: [ RatingComponentComponent, TabsContentComponent],
  imports: [
    CommonModule,
    SharedModule,
    ratingRouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RatingModule { }
