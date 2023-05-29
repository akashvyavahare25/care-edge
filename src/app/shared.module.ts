import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ToggleDirective } from './dashboard/sidebar/toggle.directive';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './page/auth/layout/layout.component';
import { PrimeNgModule } from './primeng.module';

const MODULES = [RouterModule,PrimeNgModule, CommonModule,FormsModule,ReactiveFormsModule]

@NgModule({
  declarations: [ToggleDirective],
  imports: [...MODULES],
  exports: [ToggleDirective,...MODULES],
})
export class SharedModule { }
