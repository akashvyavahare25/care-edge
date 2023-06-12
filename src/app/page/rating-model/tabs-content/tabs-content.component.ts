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
  options:any=[]
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

onchangevalue(event: any, rowIndex: any, columnIndex:any ,rowdata:any,rowValue:any) {
  
  this.total=0
 rowValue.cellstyledata['value']=parseInt(event.target.value)
 if((rowValue.cellstyledata.hasOwnProperty('value')) && rowValue.cellstyledata.inputtype==="number"){
         rowdata.forEach((item:any )=> {
           item.forEach((ele:any,i:any)=>{
             if(ele.cellstyledata.hasOwnProperty('value') && ele.cellstyledata.inputtype==="number" && i=== columnIndex)
             if (!isNaN(ele.cellstyledata.value)){
             this.total=this.total + ele.cellstyledata.value
             }
             
           })
           
         });
  }
}
  Navigate() {
    this.router.navigate(['/rating']);
  }
}
