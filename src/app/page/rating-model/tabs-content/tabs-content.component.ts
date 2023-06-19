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
  listofitems: any = [];
  Changedvalue: any;
  activeItem: any;
  options: any = [];
  score: number = 0;
  factor: number = 0;
  newArray: any = [];
  colfactor:any
  columntotal: number[] = [];
  total: any;
  tableRowData: any = [
    { value: 'akash' },
    { value: 'aniket ' },
    { value: 'kiran' },
    { value: 'shubham' },
  ];
  
  tcol:any=[]
  colscore:any
  colName:any

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

     parsedObject.forEach((element:any) => {
      element.children.forEach((ele:any)=> {
      if (ele.data.type==='table'){
       this.columntotal=[]
            for(let j=0;j<ele.data.rowdata[0].length;j++){
              
              if(ele.data.rowdata[0][j].cellstyledata.inputtype==="number"){
                this.columntotal.push(j)
              }
                      
          } 
        
      
     for(let i=0;i<this.columntotal.length;i++){
      for(let j=0;j<ele.data.tabledata.length;j++){
        if(this.columntotal[i]===j){
          ele.data.tabledata[j]['columntotal']=0
          ele.data.tabledata[j]['factor']=0
          ele.data.tabledata[j]['score']=0
        }
      }
     }
    }
      });
     });
     
      console.log('items', parsedObject);
      this.items = parsedObject;
    }
    this.activeItem = this.items[0];
  }

  


  onchangevalue(
    event: any,
    rowIndex: any,
    columnIndex: any,
    rowdata: any,
    rowValue: any,
    tbdata:any
  ) {
    this.total=0
    let k=0
    this.colfactor=0
    rowValue.cellstyledata['value'] = parseInt(event.target.value);
    if (
      rowValue.cellstyledata.hasOwnProperty('value') &&
      rowValue.cellstyledata.inputtype === 'number'
    ) {
      rowdata.forEach((item: any) => {
        item.forEach((ele: any, i: any) => {
          if (
            ele.cellstyledata.hasOwnProperty('value') &&
            ele.cellstyledata.inputtype === 'number' &&
            i === columnIndex
          )
            if (!isNaN(ele.cellstyledata.value)) {
              k++
              this.total += ele.cellstyledata.value;
            }

        });
      });
      this.colfactor =this.total/k
      this.colscore=this.total/k
   
          tbdata[columnIndex].columntotal=this.total
           tbdata[columnIndex].factor=this.colfactor
           tbdata[columnIndex].score=this.colscore
     
    }
  }
  Navigate() {
    this.router.navigate(['/rating']);
  }
}
