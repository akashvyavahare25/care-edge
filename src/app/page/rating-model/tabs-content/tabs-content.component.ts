import { Component, OnInit ,ViewChildren, QueryList, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { tabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-tabs-content',
  templateUrl: './tabs-content.component.html',
  styleUrls: ['./tabs-content.component.scss'],
})
export class TabsContentComponent implements OnInit {
  activeIndex: number = 0;
  @ViewChild('myDynamicId-0-0', { static: true }) myCellRef!: ElementRef;
  selectedTabData:any
  items: any = [];
  listofitems: any = [];
  Changedvalue: any;
  activeItem: any;
  options: any = [];
  score: number = 0;
  factor: number = 0;
  newArray: any = [];
  colfactor: any;
  columntotal: number[] = [];
  total: any;
  
  @ViewChildren('tableRow')
  tableRows!: QueryList<ElementRef>;
  tableRowData: any = [
    { value: 'akash' },
    { value: 'aniket ' },
    { value: 'kiran' },
    { value: 'shubham' },
  ];

  tcol: any = [];
  colscore: any;
  colName: any;

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

      parsedObject.forEach((element: any) => {
        element.children.forEach((ele: any) => {
          if (ele.data.type === 'table') {
            this.columntotal = [];
            
            for (let j = 0; j < ele.data.data[0].columns.length; j++) {  
              if (ele.data.data[0].columns[j].coltype === 'number') {
                this.columntotal.push(j);
              }
          }

            for (let i = 0; i < this.columntotal.length; i++) {
              for (let j = 0; j < ele.data.data.length; j++) {
                if (this.columntotal[i] === j) {
                  ele.data.data[0].columns[j]['columntotal'] = 0;
                  ele.data.data[0].columns[j]['factor'] = 0;
                  ele.data.data[0].columns[j]['score'] = 0;
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

  accessTableRows(selectedTab:any) {

    let rowspanData:any=[{arrayofindex:[]}]
    
    selectedTab.children.forEach((child:any)=>{
         console.log('child',child)
         if (child.data.type === 'table'){
          if(child.data.mergecolumnrow.length!==0){
            rowspanData = child.data.mergecolumnrow;
         
         }
        }
       })
     
     console.log('rowspanData',rowspanData)
     this.tableRows.forEach((row, index) => {
       const rowElement = row.nativeElement as HTMLTableRowElement;
       const tdElements = rowElement.querySelectorAll('td');
       if(rowspanData.length!==0){
  rowspanData.forEach((rowspanDataItem: any) => {
    if(rowspanDataItem.rowspan!==0){
    rowspanDataItem.arrayofindex.forEach((cellIndex: any) => {
      const { row, column } = cellIndex;

      if (index === row && tdElements.length > column) {
        const targetColumn = tdElements[column] as HTMLTableDataCellElement;
        if (index === rowspanDataItem.arrayofindex[0].row) {
          targetColumn.rowSpan = rowspanDataItem.rowspan; // Set rowspan for the specified row and column
        //  targetColumn.innerText = rowspanDataItem.arrayofindex[0].data.cellstyledata.rowNameValue;
          
          for (let i = 1; i < rowspanDataItem.rowspan; i++) {
            const nextRow =  this.tableRows.get(index + i)?.nativeElement as HTMLTableRowElement;
            const nextColumn = nextRow?.querySelectorAll('td')[column] as HTMLTableDataCellElement;
          //  targetColumn.innerText += ' ' + nextColumn.innerText; // Append the value of the next row's cell
          console.log("row")
          }
        } else {
          setTimeout(() => {
            targetColumn.style.setProperty('display','none','important')
            },50);
         console.log("none")
        }
      }
    });
  }
  else if (rowspanDataItem.colspan !== 0) {
    // rowspanDataItem.arrayofindex.forEach((cellIndex: any) => {
      const { row, column } =  rowspanDataItem.arrayofindex[0];
  
      if (index === row && tdElements.length > column) {
        const targetColumn = tdElements[column] as HTMLTableDataCellElement;

        targetColumn.colSpan = rowspanDataItem.colspan;
       // let cellValue = targetColumn.innerText;
        for (let i = 1; i < rowspanDataItem.colspan; i++) {
          const nextColumnIndex = column + i;
          if (nextColumnIndex <tdElements.length) {
            
            const nextColumn = tdElements[nextColumnIndex] as HTMLTableDataCellElement;
         //   cellValue += ' ' + nextColumn.innerText;
            nextColumn.style.display = 'none';
            console.log("nonetd")
          }
        }
  
       // targetColumn.innerText = cellValue;
      }
     
    
  }
  });
}

  tdElements.forEach((td, tdIndex) => {
    const tdElement = td as HTMLTableDataCellElement;
  
});
  
});
}
  

  onchangevalue(
    event: any,
    rowIndex: any,
    columnIndex: any,
    data: any,
    rowValue: any,
    tbdata: any
  ) {
    this.total = 0;
    let k = 0;
    this.colfactor = 0;
    this.colscore=0
    rowValue.value = parseInt(event.target.value);
    if (
      rowValue.hasOwnProperty('value') &&
      rowValue.colType === 'number'
    ) {
      data.forEach((item: any) => {
        item.columns.forEach((ele: any, i: any) => {
          if (
            ele.hasOwnProperty('value') &&
            ele.colType === 'number' &&
            i === columnIndex
          )
            if (!isNaN(ele.value)) {
              k++;
              this.total += ele.value;
            }
        });
      });
      this.colfactor = this.total / k;
      this.colscore = this.total / k;
     
      tbdata.columns[columnIndex].columntotal = this.total;
      tbdata.columns[columnIndex].factor = this.colfactor;
      tbdata.columns[columnIndex].score = this.colscore;
    }
  }
  Navigate() {
    this.router.navigate(['/rating']);
  }

  onTabChange(event: any) {
    const selectedTab = this.items[event.index];
    this.selectedTabData = selectedTab.data; // Store the selected tab's data
    setTimeout(() => {
      this.accessTableRows(selectedTab)
},50);
  }
}
