import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageSrc: string = '/assets/images/experian_logo.png'
  userPermission: any
  dataArray: any = []
  userData: any
  isShown: boolean = false
  screenResponse: any = []
  items:any= [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
 
  ) {/* this.router.navigate(['appscreen/dashboard']) */
   
  }

  ngOnInit(): void {
   
    this.items = [
      {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
      },
      {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash'
      }
  ];
  }

 

}
