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
tableRowData:any=[{value:'akash'},{value:'aniket '},{value:'kiran'},{value:'shubham'}]

  constructor(private tabService:tabsService){

  }
ngOnInit(): void {
  
  // this.tabService.gettabs().subscribe(res=>{
  //   this.items=res
  //   console.log('tabs content ',res)
  // })
  // const d1=localStorage.getItem("datasource")
  // JSON.parse();
  const jsonString: string | null = localStorage.getItem("datasource"); // Replace with your method to obtain the JSON string

  if (jsonString !== null) {
    const parsedObject = JSON.parse(jsonString, (key, value) => {
      if (key === 'parent') {
        // Handle circular reference
        return value; // Return the reference to the parent object
      }
      return value;
    });
  
    console.log(parsedObject);
    this.items=parsedObject
  }
  this.activeItem = this.items[0];
}


}

