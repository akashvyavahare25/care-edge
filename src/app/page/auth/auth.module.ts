import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { AuthRouterModule } from './auth-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthlayoutComponent } from './authlayout/authlayout.component'
import { Error404PageComponent } from './error404-page/error404-page.component';
import { LayoutComponent } from './layout/layout.component'


@NgModule({
  imports: [SharedModule, AuthRouterModule, FormsModule, ReactiveFormsModule
    ],
  declarations: [ AuthlayoutComponent, Error404PageComponent,LayoutComponent],
})
export class AuthModule {}
