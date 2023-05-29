//@ts-nocheck
import { Component, HostBinding, Input, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from '../../../app/data.service';
// import * as Reducers from '../../../../../../projects/contract-management/src/app/store/reducers'
// import * as UserActions from '../../../../../../projects/contract-management/src/app/store/user/actions'
// import * as SettingsActions from '../../../../../../projects/contract-management/src/app/store/settings/actions'
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
@Component({
    selector: '[appSidebar]',
    host: {
        'class': 'c-sidebar c-sidebar-dark'
    },
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    plant: any
    isView = false;
    omeVisible = false
    isLogin = true
    role: any
    plantvisible: boolean
    oemVisible1: boolean
    show = false
    loginrole: any
    loginVisible: boolean = true
    user: any
    routerUrl: any
    @HostBinding('class.c-sidebar-show') _alwaysShow = false;
    @HostBinding('class.c-sidebar-lg-show') _show = true;
    private _enableClickOutside = false;
    @Input()
    @HostBinding('class.c-sidebar-fixed') fixed = true;
    constructor(private eRef: ElementRef, private router: Router, private store: Store<any>) {
    
      
    }
  
    toggle(): void {
        const smalScreen = window && window.innerWidth <= 992;
        if (smalScreen) {
            if (this._alwaysShow) {
                this._alwaysShow = false;
                this._show = false;
            } else {
                this._show = true;
                this._alwaysShow = true;
                this._enableClickOutside = false;
                setTimeout(() => this._enableClickOutside = true, 150);
            }
        } else {
            if (this._show || this._alwaysShow) {
                this._alwaysShow = false;
                this._show = false;
            } else {
                this._show = true;
            }
        }
    }

    logout() {
        // this.router.navigate(['']);

        this.store.dispatch(new UserActions.Logout())
    }
    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (this._alwaysShow && this._enableClickOutside) {
            if (this.eRef.nativeElement.contains(event.target)) {
                // clicked inside
            } else {
                // clicked outside
                this._alwaysShow = false;
            }
        }
    }
}
