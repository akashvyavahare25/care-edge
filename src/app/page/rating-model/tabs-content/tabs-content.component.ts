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
            for (let j = 0; j < ele.data.rowdata[0].length; j++) {
              if (ele.data.rowdata[0][j].cellstyledata.inputtype === 'number') {
                this.columntotal.push(j);
              }
            }

            for (let i = 0; i < this.columntotal.length; i++) {
              for (let j = 0; j < ele.data.tabledata.length; j++) {
                if (this.columntotal[i] === j) {
                  ele.data.tabledata[j]['columntotal'] = 0;
                  ele.data.tabledata[j]['factor'] = 0;
                  ele.data.tabledata[j]['score'] = 0;
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
    setTimeout(() => {
      this.accessTableRows()
},2000);
  
  }

  accessTableRows() {
    let rowspanData:any={arrayofindex:[]}
     this.items.forEach((item:any)=>{
       item.children.forEach((child:any)=>{
         console.log('child',child)
         if(child.data.type === 'table'){
         rowspanData= child.data.mergecolumnrow
         }
       })
     })
     console.log('rowspanData',rowspanData)
     this.tableRows.forEach((row, index) => {
       const rowElement = row.nativeElement as HTMLTableRowElement;
       const tdElements = rowElement.querySelectorAll('td');
  rowspanData.forEach((rowspanDataItem: any) => {
    if(rowspanDataItem.rowspan!==0){
    rowspanDataItem.arrayofindex.forEach((cellIndex: any) => {
      const { row, column } = cellIndex;

      if (index === row && tdElements.length > column) {
        const targetColumn = tdElements[column] as HTMLTableDataCellElement;
        if (index === rowspanDataItem.arrayofindex[0].row) {
          targetColumn.rowSpan = rowspanDataItem.rowspan; // Set rowspan for the specified row and column
          targetColumn.innerText = rowspanDataItem.arrayofindex[0].data.cellstyledata.rowNameValue;
          for (let i = 1; i < rowspanDataItem.rowspan; i++) {
            const nextRow =  this.tableRows.get(index + i)?.nativeElement as HTMLTableRowElement;
            const nextColumn = nextRow?.querySelectorAll('td')[column] as HTMLTableDataCellElement;
            targetColumn.innerText += ' ' + nextColumn.innerText; // Append the value of the next row's cell
          }
        } else {
          targetColumn.style.display = 'none'; // Hide the specified row and column
        }
      }
    });
  }else if(rowspanDataItem.colspan!==0){
    rowspanDataItem.arrayofindex.forEach((cellIndex: any) => {
      const { row, column } = cellIndex;

      if (index === row && tdElements.length > column) {
        const targetColumn = tdElements[column] as HTMLTableDataCellElement;
        targetColumn.colSpan = rowspanDataItem.colspan;
        targetColumn.innerText = rowspanDataItem.arrayofindex[0].data.cellstyledata.rowNameValue;
        for (let i = 1; i < rowspanDataItem.colspan; i++) {
          const nextColumn = tdElements[column + i] as HTMLTableDataCellElement;
          targetColumn.innerText += ' ' + nextColumn.innerText;
          nextColumn.style.display = 'none';
        }
      }
    })
  }
  });
    

  tdElements.forEach((td, tdIndex) => {
    const tdElement = td as HTMLTableDataCellElement;
   
});
  
});
}
  

  onchangevalue(
    event: any,
    rowIndex: any,
    columnIndex: any,
    rowdata: any,
    rowValue: any,
    tbdata: any
  ) {
    this.total = 0;
    let k = 0;
    this.colfactor = 0;
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
              k++;
              this.total += ele.cellstyledata.value;
            }
        });
      });
      this.colfactor = this.total / k;
      this.colscore = this.total / k;

      tbdata[columnIndex].columntotal = this.total;
      tbdata[columnIndex].factor = this.colfactor;
      tbdata[columnIndex].score = this.colscore;
    }
  }
  Navigate() {
    this.router.navigate(['/rating']);
  }
}
