import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store'
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLogin = true;
  role:any 
  isHide:boolean=true
  year=new Date();
  cust_name:any ="Ease-i"
  items: any =[];
  constructor(private router: Router,private store: Store<any>,private config: PrimeNGConfig) {
    // this.store.pipe(select(Reducers.getUser)).subscribe(state => {
    //   this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
    //   this.role= this.role.split(',')
    //   if (state.logo) {
    //     this.logoImage = environment.baseUrl +imgUrl+ state.logo
    //     this.logoImage = this.logoImage.replace(/\\/g, "/")
    //   } else {
    //     this.logoImage = 'assets/images/logo1.png'
    //   }
    // })
    // if(this.isValid(this.role,this.roles)){
    //   this.isHide=true;
    // }
   }
 
  ngOnInit(): void {
    this.config.setTranslation({
        accept: 'Accept',
        reject: 'Cancel',
        //translations
    });
    this.items = [
      {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-fw pi-plus',
                  items: [
                      {
                          label: 'Bookmark',
                          icon: 'pi pi-fw pi-bookmark'
                      },
                      {
                          label: 'Video',
                          icon: 'pi pi-fw pi-video'
                      }
                  ]
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-trash'
              },
              {
                  separator: true
              },
              {
                  label: 'Export',
                  icon: 'pi pi-fw pi-external-link'
              }
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {
                  label: 'Left',
                  icon: 'pi pi-fw pi-align-left'
              },
              {
                  label: 'Right',
                  icon: 'pi pi-fw pi-align-right'
              },
              {
                  label: 'Center',
                  icon: 'pi pi-fw pi-align-center'
              },
              {
                  label: 'Justify',
                  icon: 'pi pi-fw pi-align-justify'
              }
          ]
      },
      {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-fw pi-user-plus'
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-user-minus'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-fw pi-users',
                  items: [
                      {
                          label: 'Filter',
                          icon: 'pi pi-fw pi-filter',
                          items: [
                              {
                                  label: 'Print',
                                  icon: 'pi pi-fw pi-print'
                              }
                          ]
                      },
                      {
                          icon: 'pi pi-fw pi-bars',
                          label: 'List'
                      }
                  ]
              }
          ]
      },
      {
          label: 'Events',
          icon: 'pi pi-fw pi-calendar',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {
                          label: 'Save',
                          icon: 'pi pi-fw pi-calendar-plus'
                      },
                      {
                          label: 'Delete',
                          icon: 'pi pi-fw pi-calendar-minus'
                      }
                  ]
              },
              {
                  label: 'Archieve',
                  icon: 'pi pi-fw pi-calendar-times',
                  items: [
                      {
                          label: 'Remove',
                          icon: 'pi pi-fw pi-calendar-minus'
                      }
                  ]
              }
          ]
      },
      {
          separator: true
      },
      {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off'
      }
  ];
  }
  switchApplication(event:any){
    if(event.value=="drone"){
      // this.router.navigate(['', { outlets: { applicationOutlet: 'front' } }]);
      this.router.navigate(['drone/home'])
    }
 
  }

  isValid(arr1:any, arr2:any) {
    return arr1.some((item:any) => arr2.includes(item))
  }
}
