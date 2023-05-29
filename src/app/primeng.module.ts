import { NgModule } from '@angular/core'; 
import {PanelModule} from 'primeng/panel';
import { SlideMenuModule } from 'primeng/slidemenu';
import { PanelMenuModule } from 'primeng/panelmenu';

const MODULES = [ 
    PanelModule,
    SlideMenuModule,
    PanelMenuModule
  ] 
@NgModule({
  imports: [...MODULES],
  providers: [],
  exports: [...MODULES],
})
export class PrimeNgModule {}
