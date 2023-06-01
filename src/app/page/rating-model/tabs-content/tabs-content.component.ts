import { Component, OnInit } from '@angular/core';
import { tabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-tabs-content',
  templateUrl: './tabs-content.component.html',
  styleUrls: ['./tabs-content.component.scss']
})
export class TabsContentComponent implements OnInit {
  activeIndex: number = 0;
  items:any = [];
activeItem:any

  constructor(private tabService:tabsService){

  }
ngOnInit(): void {
  this.tabService.gettabs().subscribe(res=>{
    this.items=res
    console.log('tabs content ',res)
  })
  this.activeItem = this.items[0];
}




}
