import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-tabs-content',
  templateUrl: './tabs-content.component.html',
  styleUrls: ['./tabs-content.component.scss'],
})
export class TabsContentComponent implements OnInit {
  activeIndex: number = 0;
  items: any = [];
  listofitems:any=[]
  Changedvalue: any;
  activeItem: any;

  score: number=0;
  factor: number=0;
  total: number=0;
  tableRowData: any = [
    { value: 'akash' },
    { value: 'aniket ' },
    { value: 'kiran' },
    { value: 'shubham' },
  ];

  constructor(private tabService: tabsService, private router: Router) {}
  ngOnInit(): void {
    // this.tabService.gettabs().subscribe(res=>{
    //   this.items=res
    //   console.log('tabs content ',res)
    // })
    // const d1=localStorage.getItem("datasource")
    // JSON.parse();
    const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string

    if (jsonString !== null) {
      const parsedObject = JSON.parse(jsonString, (key, value) => {
        if (key === 'parent') {
          // Handle circular reference
          return value; // Return the reference to the parent object
        }
        return value;
      });

      console.log(parsedObject);
      this.items = parsedObject;
    }
    this.activeItem = this.items[0];
  }

  onchangevalue(event: any, i: any, j: any) {
    let k=0
this.total=0
    console.log('event', event, i, j);
    for (let tab of this.items) {
      for (let child of tab.children) {
        if (child.data.type === "table") {

          if(child.data.rowdata[i][j].cellstyledata.hasOwnProperty('value')){
            child.data.rowdata[i][j].cellstyledata.value=event.target.value
          }else{
              child.data.rowdata[i][j].cellstyledata['value']=event.target.value
          }
              for(let row of child.data.rowdata){
              for(let k=0;k<row.length;k++){
              if(row[k].cellstyledata.hasOwnProperty('value')){
                this.total += +row[k].cellstyledata.value
              }
            }
          }
        
            }
      }
      this.listofitems.push(tab)  
    }
   
    
  }
  Navigate() {
    this.router.navigate(['/rating']);
  }
}
