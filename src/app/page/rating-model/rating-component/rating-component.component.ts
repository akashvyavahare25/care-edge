import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tabsService } from 'src/app/services/tabs.service';

interface City {
  name: string;
  code: string;
}
interface Type {
  name: string;
}

@Component({
  selector: 'app-rating-component',
  templateUrl: './rating-component.component.html',
  styleUrls: ['./rating-component.component.scss'],
})
export class RatingComponentComponent implements OnInit {
  columnMergedIndex:any=[]
  files: any = [];
  @ViewChild('colorPicker') colorPicker!: ElementRef<HTMLInputElement>;
  selectedOption2: any;
  options: string[] = [
    'label',
    'text',
    'number',
    'checkbox',
    'radio',
    'date',
    'password',
    'email',
    'dropdown',
  ];
  textcaseoption: string[] = ['uppercase', 'lowercase', 'capitalize'];
  Fontweightoption: string[] = ['thin', 'normal', 'bold', 'heavy'];
  Fontstyleoption: string[] = ['normal', 'italic', 'oblique'];
  data: any = [];
  visible: boolean = false;
  isInputDisabled: boolean = false;
  IsMergePresent: boolean = false;
  colindex: any;
  tabName: any;
  newinputvalue: any;
  IsCheckbox: boolean = false;
  rowvaluetype: any;
  Mergecolumnname: any;
  updatedDatanew: any = [];
  newmergecolumnlist: any = [];
  selectedOption: string = 'container';
  selectedOption1: string = '';
  tabTitle: any;
  tData: any = [];
  selectedColor: string = '';
  RowselectedColor: string = '';
  selectedRowFontColor: string = '';
  IsFontcolor: boolean = false;
  IsFonttext: boolean = true;
  selectedFontColor: string = '';
  tabEditId: any;
  componentVisible: boolean = false;
  component: string = '';
  dependentComponent: string = '';
  containerName: any;
  Noofcolumns: any;
  Noofrows: any;
  indexArray: number[] = [];
  dynamicColumns: number[] = [];
  dynamicRows: number[] = [];
  scoreValue: any;
  factorValue: any;
  totalValue: any;
  columnvalue: any;
  IsMerge: boolean = false;
  outervar: any;
  innervar: any;
  CellStyleVisible: boolean = false;
  RowStyleVisible: boolean = false;
  tableName: any;
  tablerowNode: any = [];
  addcontainerdata: any = [];
  containerData: any = [];
  containerTitle: any;
  containerValue: any;
  data1: any;
  componentData: any = [{ name: 'Enable Overide', code: 'NY' }];
  dependantData: any = [{ name: 'New York', code: 'NY' }];
  containerVisible: boolean = false;
  IsContainer: boolean = true;
  IsTable: boolean = false;
  rowindex: any;
  Iscolor: boolean = false;
  Istext: boolean = true;
  IsRowtext: boolean = true;
  IsRowcolor: boolean = false;
  IsRowFonttext: boolean = true;
  IsRowFontcolor: boolean = false;
  tableForm: any;
  tableFormforrow: any;
  FormArray1: any = [];
  CellStyleformArray: any=[]
  RowstyleformArray:any=[]
  rangeArrayforRow: any = [];
  //formBuilder: any;
  IsCheckboxadd: boolean = true;
  IsLabel: boolean = true;
  CellformGroup: any;
  updaterowcolspandata: any = [];
  RowformGroup: any;
  copyRowTableValue:any=[]
  tooltipText: string[] = [];
  tooltipTextcolumn:string[] = [];
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tabService: tabsService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.tabService.gettabs().subscribe((res) => {
      this.files = res;
    });
    this.tableForm = this.fb.array([]);
    this.tableFormforrow = this.fb.array([]);
    this.FormArray1 = this.fb.array([]);
    this.CellformGroup = this.fb.group({
      rowNameValue: [''],
      inputtype: [''],
      BackGroundcolour: [''],
      Fontcolour: [''],
      checkboxvalid: this.formBuilder.array([]),
    });
    this.RowformGroup = this.fb.group({
      Fontsize: [''],
      textTransform: [''],
      Fontweight: [''],
      Fontstyle: [''],
      RowBackGroundcolour: [''],
      RowFontcolour: [''],
    });
    //this.CellformGroup = new FormGroup({});
    //this.CellStyleformArray = this.fb.array([]);
  }

  showDialog() {
    this.tabTitle = 'Add Tab';
    this.visible = true;
  }
  saveTabs() {
    this.visible = false;

    if (this.tabTitle === 'Add Tab') {
      let data = {
        data: {
          name: this.tabName,
          size: '200mb',
          type: 'tab',
          hide: true,
        },
        children: [],
      };
      this.tabService.savetabs(data).subscribe((res) => {
        console.log('res  ->>>>>>', res);
        this.files = [];
        this.files = res;
      });
    } else {
      let data = {
        data: {
          name: this.tabName,
          size: '200mb',
          type: 'tab',
          id: this.tabEditId,
          hide: true,
        },
        children: [],
      };

      const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string
      if (jsonString !== null) {
        const parsedObject = JSON.parse(jsonString, (key, value) => {
          if (key === 'parent') {
            // Handle circular reference
            return value; // Return the reference to the parent object
          }
          return value;
        });
        const parsedObject1 = parsedObject.map((tab: any) => {
          if (tab.data.id === data.data.id) {
            return {
              ...tab,
              data: data.data,
            };
          }
          return tab;
        });
        this.files = parsedObject1;

        const jsonString1 = JSON.stringify(this.files, jsonReplacer);
        this.tabService.SubmitTabs(jsonString1).subscribe((res) => {});
      }
    }
  }

  showTabs() {
    this.router.navigate(['/rating/tabs']);
  }

  dependantCompoentClick(rowData: any): void {
    this.componentVisible = true;
    // Handle eye icon click event for the corresponding row data
    console.log('Eye icon clicked:', rowData);
  }

  editTab(rowData: any, rowNode: any): void {
    if (rowData.type === 'container') {
      this.containerTitle = '';
      this.containerTitle = 'Edit Container';
      this.containerValue = 'container';
      this.containerName = rowData.name;
      this.containerVisible = true;

      this.containerData = rowNode.node;
    } else if (rowData.type === 'table') {
      this.containerTitle = '';
      this.IsMerge = false;
      this.containerTitle = 'Edit table';
      this.containerValue = 'table';
      this.tableName = rowData.name;
      this.containerVisible = true;
      this.Noofcolumns = rowData.tabledata.length;
      this.Noofrows = rowData.rowdata.length;
      (this.scoreValue = rowData.scoreValue),
        (this.factorValue = rowData.factorValue),
        (this.totalValue = rowData.totalValue),
        (this.containerData = rowNode.node);
      this.tablerowNode = rowNode.node;
      this.tableForm = this.fb.array([]);
      for (let i = 0; i < this.Noofcolumns; i++) {
        // this.dynamicColumns.push(i);
        const rangeArray = this.tableForm as FormArray;
        const formGroup = new FormGroup({});
        if (rowData.mergecol !== null) {
          this.IsMerge = true;
          formGroup.addControl(
            'mergecheckbox',
            new FormControl(false)
          );
          this.newmergecolumnlist = rowData.mergecol;
        } else {
          this.IsMerge = false;
          formGroup.addControl('mergecheckbox', new FormControl(''));
        }
        formGroup.addControl(
          'columnName',
          new FormControl(rowData.tabledata[i].columnName)
        );
        rangeArray.push(formGroup);
      }
      
      this.tableFormforrow = this.fb.array([]);
     

      for (let i = 0; i < this.Noofrows; i++) {
        this.FormArray1 = this.fb.array([]);
        for (let j = 0; j < this.Noofcolumns; j++) {
          const formGroup = new FormGroup({
            rowName: new FormControl(
              rowData.rowdata[i][j].cellstyledata.inputtype
            ),
            mergecheckbox:new FormControl(
              false
            )
          });
          //formGroup.addControl('rowName', new FormControl(''));
          this.FormArray1.push(formGroup);
        }
        this.tableFormforrow .push(this.FormArray1);
      }
   
    } else {
      this.tabTitle = '';
      this.tabName = rowData.name;
      this.tabTitle = 'Edit Tab';
      this.tabEditId = rowData.id;
      this.visible = true;
    }
   

  }

  onCellMouseEnter(event: MouseEvent, i: number, j: number): void {
    this.tooltipText = []; 
    if( this.tablerowNode.data.hasOwnProperty('mergecolumnrow')){
    this.tablerowNode.data.mergecolumnrow.forEach((element: any) => {
      element.arrayofindex.forEach((ele: any) => {
        if (ele.row === i && ele.column === j) {
         
          element.arrayofindex.forEach((e1:any) => {   
            this.tooltipText.push('Row:'+e1.row + ' ' +'Column:'+ e1.column); 
          });
          this.tooltipText.push(' is already merged:')
         
        }
      });
    });
  }else if(this.updaterowcolspandata.length!==0){
    this.updaterowcolspandata.forEach((element: any) => {
      element.arrayofindex.forEach((ele: any) => {
        if (ele.row === i && ele.column === j) {
         
          element.arrayofindex.forEach((e1:any) => {   
            this.tooltipText.push('Row:'+e1.row + ' ' +'Column:'+ e1.column); 
          });
          this.tooltipText.push(' is already merged:')
         
        }
      });
    });
  }
  }
  clickCheckbox(val:any,index:any){
    console.log('indexxxxxxxx',val.target.checked,index)
    if(val.target.checked === true){
         this.columnMergedIndex.push(index)
    }else{
      this.columnMergedIndex.splice(index,1)
    }
    console.log('colmerindex',this.columnMergedIndex)
  }
  onCellMouseEntercolumn(event: MouseEvent, i: number){
   
    this.tooltipTextcolumn=[]
    if( this.tablerowNode.data.hasOwnProperty('mergecol')){
    this.tablerowNode.data.mergecol.forEach((element:any)=> {
      element.columnindex.forEach((ele:any) => {
        if(ele===i){
          element.columnindex.forEach((e1:any) => { 
          
            this.tooltipTextcolumn.push('Column:' +e1); 
          });
          this.tooltipTextcolumn.push('is already merged:')

        }
        
      });
          });
        }else if(this.updatedDatanew.length!==0){
          this.updatedDatanew.forEach((element:any)=> {
            element.columnindex.forEach((ele:any) => {
              if(ele===i){
                element.columnindex.forEach((e1:any) => { 
                
                  this.tooltipTextcolumn.push('Column:' +e1); 
                });
                this.tooltipTextcolumn.push('is already merged:')
      
              }
              
            });
                });
        }
  }

  // checkmergecolumn(rowNode:any){
  //   console.log("rowN",rowNode)
  //  rowNode.node.data.mergecolumnrow.forEach((element:any) => {
  //   element.arrayofindex.forEach((ele:any) => {
  //     var dynamicId = 'DynamicId-' + ele.row + ele.column
  //     const cell = document.getElementById(dynamicId);
  //     if (cell) {
  //       cell.style.borderColor = 'green'; 
  //     }
  //   });
  //  });
  // }


  copyTab(rownode: any, rowData: any): void {
    console.log('rowData', rowData);
    console.log('rownode', rownode);
    if (rownode.level == 0) {
      this.files = [];
      let data = rownode.node;
      delete data.data.id;
      this.tabService.savetabs(data).subscribe((res) => {
        this.files = res;
        const jsonString1 = JSON.stringify(this.files, jsonReplacer);
        this.tabService.SubmitTabs(jsonString1).subscribe((res) => {});
      });
    } else if (rownode.level == 1) {
      if (rowData.type === 'container') {
        let data = {
          data: {
            name: rowData.name,
            size: rowData.size,
            type: 'container',
            hide: rowData.hide,
            id: rownode.node.parent.children.length + 1,
          },
        };

        rownode.node.parent.children.push(data);
      } else if (rowData.type === 'table') {
        let data = {
          data: {
            name: rowData.name,
            size: rowData.size,
            type: 'table',
            hide: rowData.hide,
            rowdata: rowData.rowdata,
            tabledata: rowData.tabledata,
            id: rownode.node.parent.children.length + 1,
            mergecol: rowData.mergecol,
            scoreValue: this.scoreValue,
            factorValue: this.factorValue,
            totalValue: this.totalValue,
          },
        };
        rownode.node.parent.children.push(data);
      }
    }
  }

  deletTab(rowNode: any, rowData: any): void {
    if (rowData.type === 'tab') {
      this.tabService.deleteTabs(rowData.id).subscribe((res) => {
        this.files = [];
        this.files = res;
        const jsonString1 = JSON.stringify(this.files, jsonReplacer);
        this.tabService.SubmitTabs(jsonString1).subscribe((res) => {});
      });
    } else {
      // rowNode.node.parent.children = rowNode.node.parent.children.filter(
      //   (tab: any) => tab.data.name !== rowData.name
      // );
      rowNode.node.parent.children = rowNode.node.parent.children.filter(
        (tab: any) => tab.data.id !== rowData.id
      );
      const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string
      if (jsonString !== null) {
        const parsedObject = JSON.parse(jsonString, (key, value) => {
          if (key === 'parent') {
            // Handle circular reference
            return value; // Return the reference to the parent object
          }
          return value;
        });
        for (var i = 0; i < parsedObject.length; i++) {
          if (parsedObject[i].data.id === rowNode.node.parent.data.id) {
            parsedObject[i].children = rowNode.node.parent.children;
          }
        }
        this.files = parsedObject;
      }
      const jsonString1 = JSON.stringify(this.files, jsonReplacer);
      this.tabService.SubmitTabs(jsonString1).subscribe((res) => {});
    }
  }
  AddData(rownode: any): void {
    this.componentVisible = true;
  }
  toggleEyeIcon(rowNode: any, rowData: any): void {
    if (rowData.type === 'container') {
      rowData.hide = !rowData.hide;
      let data = {
        data: rowData,
        children: [],
      };

      const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string
      if (jsonString !== null) {
        const parsedObject = JSON.parse(jsonString, (key, value) => {
          if (key === 'parent') {
            // Handle circular reference
            return value; // Return the reference to the parent object
          }
          return value;
        });

        const parsedObject1 = rowNode.node.parent.children.map((tab: any) => {
          if (tab.name === data.data.name) {
            return {
              ...tab,
              data: data.data,
            };
          }
          return tab;
        });
        for (var i = 0; i < parsedObject.length; i++) {
          if (parsedObject[i].data.id === rowNode.node.parent.data.id) {
            delete parsedObject[i].children;
            parsedObject[i].children = parsedObject1;
          }
        }

        this.files = parsedObject;
      }
    } else if (rowData.type === 'table') {
      rowData.hide = !rowData.hide;
      let data = {
        data: rowData,
        children: [],
      };

      const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string
      if (jsonString !== null) {
        const parsedObject = JSON.parse(jsonString, (key, value) => {
          if (key === 'parent') {
            // Handle circular reference
            return value; // Return the reference to the parent object
          }
          return value;
        });

        const parsedObject1 = rowNode.node.parent.children.map((tab: any) => {
          if (tab.name === data.data.name) {
            return {
              ...tab,
              data: data.data,
            };
          }
          return tab;
        });
        for (var i = 0; i < parsedObject.length; i++) {
          if (parsedObject[i].data.id === rowNode.node.parent.data.id) {
            delete parsedObject[i].children;
            parsedObject[i].children = parsedObject1;
          }
        }

        this.files = parsedObject;
      }
    } else {
      rowData.hide = !rowData.hide;
      let data = {
        data: rowData,
        children: [],
      };
      // this.tabService.updateTabs(data).subscribe(res =>{
      //   console.log('res  ->>>>>>',res)
      //   this.files=[]
      //   this.files=res
      //  })

      const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string
      if (jsonString !== null) {
        const parsedObject = JSON.parse(jsonString, (key, value) => {
          if (key === 'parent') {
            // Handle circular reference
            return value; // Return the reference to the parent object
          }
          return value;
        });
        const parsedObject1 = parsedObject.map((tab: any) => {
          if (tab.data.id === data.data.id) {
            return {
              ...tab,
              data: data.data,
            };
          }
          return tab;
        });
        this.files = parsedObject1;
      }
    }
  }
  saveComponents() {
    this.componentVisible = false;
  }

  AddContainer(rownode: any): void {
    this.tableForm.reset();
    this.tableFormforrow.reset();
    this.Noofcolumns = null;
    this.tableName = null;
    this.Noofrows = null;
    this.scoreValue = null;
    this.factorValue = null;
    this.totalValue = null;
    this.tablerowNode = rownode.node;
    this.onChangecolumn(this.Noofcolumns);
    this.onChangerow(this.Noofrows);
    this.containerData = rownode.node;
    this.containerValue = 'container';
    this.containerTitle = 'Add Container';
    this.containerVisible = true;
  }

  saveContainer() {
    if (this.containerValue === 'container') {
      console.log('constainer tiler----', this.containerTitle);
      if (this.containerTitle == 'Edit Container') {
        console.log('cont', this.containerData);
        this.containerData.data.name = this.containerName;
        this.containerName = '';
        this.containerData = {};
        this.containerVisible = false;
      } else if (this.containerTitle == 'Add Container') {
        console.log('container data ', this.containerData);

        this.containerData.children.push({
          data: {
            name: this.containerName,
            size: '10mb',
            type: 'container',
            hide: true,
            id: this.containerData.children.length + 1,
          },
        });
        console.log('containerdata', this.containerData);

        this.containerName = '';
        this.containerData = {};
        this.containerVisible = false;
      }
    } else {
      if (this.containerTitle == 'Edit table') {
        // const filteredData = this.tableForm.value.filter(
        //   (item: any) => item.mergecheckbox === true
        // );

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
            if (element.data.id === this.tablerowNode.parent.data.id) {
              element.children.forEach((ele: any) => {
                if (ele.data.id === this.tablerowNode.data.id) {
                  if (this.updatedDatanew.length === 0) {
                    ele.data.mergecol.forEach((e1: any) => {
                      this.updatedDatanew.push(e1);
                    });
                  }
                  if (this.updaterowcolspandata.length === 0) {
                    this.tablerowNode.data.mergecolumnrow.forEach((e1: any) => {
                      this.updaterowcolspandata.push(e1);
                    });
                  }
                }
              });
            }
          });
        }

        const tablecol = this.tableForm.value;
        const rowsdata = this.tableFormforrow.value;
        for (let i = 0; i < rowsdata.length; i++) {
          for (let j = 0; j < rowsdata[i].length; j++) {
            if (!rowsdata[i][j].hasOwnProperty('cellstyledata')) {
              if(this.tablerowNode.data.rowdata[i][j].length!==0){
              rowsdata[i][j]['cellstyledata'] =
                this.tablerowNode.data.rowdata[i][j].cellstyledata;
              }else{
                rowsdata[i][j]['cellstyledata'] =
                this.CellformGroup.value
              }
            }
            if (!rowsdata[i][j].hasOwnProperty('rowstyledata')) {
              if(this.tablerowNode.data.rowdata[i].length!==0){
                rowsdata[i][j]['rowstyledata'] =
                this.tablerowNode.data.rowdata[i][j].rowstyledata;
              }else{
                rowsdata[i][j]['rowstyledata'] = this.RowformGroup.value;
              }
             
            }
          }
        }

        console.log('rownode', this.tablerowNode);

        // const mergecheckboxCount = filteredData.length;

        // let updatedData;
        // if (filteredData.length > 0) {
        //   const mergedNames = filteredData
        //     .map((item: any) => item.columnName)
        //     .join(' ');
        //   updatedData = [
        //     {
        //       mergecheckbox: '',
        //       mergecheckboxCount: mergecheckboxCount,
        //       columnName: mergedNames,
        //     },
        //     ...this.tableForm.value.slice(mergecheckboxCount),
        //   ];
        // } else {
        //   updatedData = null;
        // }
        this.containerData.data.name = this.tableName;
        this.containerData.data.Noofcolumns = this.Noofcolumns;
        this.containerData.data.Noofrows = this.Noofrows;
        this.containerData.data.tabledata = tablecol;
        this.containerData.data.mergecol = this.updatedDatanew;
        this.containerData.data.rowdata = rowsdata;
        this.containerData.data.mergecolumnrow=this.updaterowcolspandata;
        (this.containerData.data.scoreValue = this.scoreValue),
          (this.containerData.data.factorValue = this.factorValue),
          (this.containerData.data.totalValue = this.totalValue),
          // this.containerData.children.push({
          //   data: {
          //     name: this.tableName,
          //     type: 'table',
          //     hide: true,
          //     tabledata: updatedData,
          //     rowdata: rowsdata,
          //     id:this.containerData.children.length+1
          //   },
          // });

          console.log('rowdata', rowsdata);
        //console.log('data form ', updatedData);
        this.tableName = '';
        this.containerData = {};
        this.containerVisible = false;
      } else {
        // const filteredData = this.tableForm.value.filter(
        //   (item: any) => item.mergecheckbox === true
        // );
        const rowsdata = this.tableFormforrow.value;
        //const mergecheckboxCount = filteredData.length;
        const tablecol = this.tableForm.value;
        // let updatedData;
        // if (filteredData.length > 0) {
        //   const mergedNames = filteredData
        //     .map((item: any) => item.columnName)
        //     .join(' ');
        //   updatedData = [
        //     {
        //       mergecheckbox: '',
        //       mergecheckboxCount: mergecheckboxCount,
        //       columnName: mergedNames,
        //     },
        //     ...this.tableForm.value.slice(mergecheckboxCount),
        //   ];
        // } else {
        //   updatedData = null;
        // }
        
      

        for (let i = 0; i < rowsdata.length; i++) {
          for (let j = 0; j < rowsdata[i].length; j++) {
            if (!rowsdata[i][j].hasOwnProperty('rowstyledata')) {
              if(this.copyRowTableValue.length!==0){
                rowsdata[i][j]['rowstyledata']=this.copyRowTableValue[i][j].rowstyledata
              }else{
              rowsdata[i][j]['rowstyledata'] = this.RowformGroup.value;
              }
            }
            if (!rowsdata[i][j].hasOwnProperty('cellstyledata')) {
              if(this.copyRowTableValue.length!==0){
                rowsdata[i][j]['cellstyledata']=this.copyRowTableValue[i][j].cellstyledata
              }else{
                rowsdata[i][j]['cellstyledata'] = this.CellformGroup.value;
              }
              
            }
          }
        }

        this.containerData.children.push({
          data: {
            name: this.tableName,
            type: 'table',
            hide: true,
            tabledata: tablecol,
            mergecol: this.updatedDatanew,
            mergecolumnrow: this.updaterowcolspandata,
            rowdata: rowsdata,
            scoreValue: this.scoreValue,
            factorValue: this.factorValue,
            totalValue: this.totalValue,
            id: this.containerData.children.length + 1,
          },
        });

        console.log('rowdata', rowsdata);
        // console.log('data form ', updatedData);
        this.tableName = '';
        this.containerData = {};
        this.containerVisible = false;
      }
    }
  }
  showcontaineronclick() {
    this.selectedOption = 'option';
    this.selectedOption1 = '';
    this.IsContainer = true;
    this.IsTable = false;
  }

  showTableonclick() {
    this.selectedOption1 = 'option1';
    this.selectedOption = '';
    this.IsContainer = false;
    this.IsTable = true;
  }
  SubmitTabs(): void {
    this.data = this.files;

    const jsonString = JSON.stringify(this.data, jsonReplacer);
    this.tabService.SubmitTabs(jsonString).subscribe((res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Data saved successful!',
      });
      setTimeout(() => {
        this.clearNotifications();
      }, 2000);
    });
  }
  clearNotifications() {
    this.messageService.clear();
  }
  onChangecolumn(event: any) {
    this.dynamicColumns = [];
    this.IsMerge = false;
    this.tableForm = this.fb.array([]);
    for (let i = 1; i <= this.Noofcolumns; i++) {
      // this.dynamicColumns.push(i);

      const rangeArray = this.tableForm as FormArray;
      const formGroup = new FormGroup({});
      formGroup.addControl('mergecheckbox', new FormControl(''));
      formGroup.addControl('columnName', new FormControl(''));
      rangeArray.push(formGroup);
    }
  }
  onChangerow(event: any) {
    this.dynamicRows = [];
  
    this.tableFormforrow = this.fb.array([]);
   // this.rangeArrayforRow = this.tableFormforrow as FormArray;

    for (let i = 1; i <= this.Noofrows; i++) {
      this.FormArray1 = this.fb.array([]);
      for (let j = 1; j <= this.Noofcolumns; j++) {
        const formGroup = new FormGroup({
          rowName: new FormControl(''),
          mergecheckbox: new FormControl(false),
        });
        //formGroup.addControl('rowName', new FormControl(''));
        this.FormArray1.push(formGroup);
      }
      this.tableFormforrow.push(this.FormArray1);
    }
    console.log('array', this.tableFormforrow);
  }
  EditCell(i: any, j: any) {
    this.clearFormArray();
    this.CellformGroup.reset();
    this.IsLabel = true;
    this.IsCheckbox = false;
    this.IsCheckboxadd = false;
    this.outervar = i;
    this.innervar = j;
    this.CellStyleVisible = true;
    this.IsFontcolor = false;
    this.IsFonttext = true;
    this.Iscolor = false;
    this.Istext = true;
    if (this.tablerowNode.data.hasOwnProperty('rowdata')) {
      if (this.tablerowNode.data.rowdata[i].length!==0){
      if (
        this.tablerowNode.data.rowdata[i][j].cellstyledata.inputtype ===
          'checkbox' ||
        this.tablerowNode.data.rowdata[i][j].cellstyledata.inputtype ===
          'radio' ||
        this.tablerowNode.data.rowdata[i][j].cellstyledata.inputtype ===
          'dropdown'
      ) {
        // this.CellformGroup.get('rowNameValue').setValue(this.tablerowNode.data.rowdata[i][j].cellstyledata.rowNameValue);
        this.IsLabel = false;
        this.IsCheckbox = true;
        this.IsCheckboxadd = true;
        this.CellformGroup.get('inputtype').setValue(
          this.tablerowNode.data.rowdata[i][j].cellstyledata.inputtype
        );
        this.CellformGroup.get('BackGroundcolour').setValue(
          this.tablerowNode.data.rowdata[i][j].cellstyledata.BackGroundcolour
        );
        this.CellformGroup.get('Fontcolour').setValue(
          this.tablerowNode.data.rowdata[i][j].cellstyledata.Fontcolour
        );
        //this.CellformGroup.get('Inputcheckbox').setValue(this.tablerowNode.data.rowdata[i][j].cellstyledata.Inputcheckbox);
        var checkboxvaliddata: any = [];
        if (
          this.tablerowNode.data.rowdata[i][j].cellstyledata.checkboxvalid
            .length != ''
        ) {
          this.tablerowNode.data.rowdata[i][
            j
          ].cellstyledata.checkboxvalid.forEach((ele: any) => {
            checkboxvaliddata.push({
              Label: ele.Label,
            });
            this.addcheckboxvalid();
            this.CellformGroup.get('checkboxvalid').setValue(checkboxvaliddata);
          });
        }
      } else {
        this.IsLabel = true;
        this.IsCheckbox = false;
        this.IsCheckboxadd = false;
        this.CellformGroup.get('rowNameValue').setValue(
          this.tablerowNode.data.rowdata[i][j].cellstyledata.rowNameValue
        );
        this.CellformGroup.get('inputtype').setValue(
          this.tablerowNode.data.rowdata[i][j].cellstyledata.inputtype
        );
        this.CellformGroup.get('BackGroundcolour').setValue(
          this.tablerowNode.data.rowdata[i][j].cellstyledata.BackGroundcolour
        );
        this.CellformGroup.get('Fontcolour').setValue(
          this.tablerowNode.data.rowdata[i][j].cellstyledata.Fontcolour
        );
      }
    }
    }
  }

  clickforrowstyle(index: any) {
    this.RowStyleVisible = true;
    this.colindex = this.Noofcolumns;
    this.rowindex = index;
    this.RowformGroup.reset();
    this.IsRowFontcolor = false;
    this.IsRowFonttext = true;
    this.IsRowcolor = false;
    this.IsRowtext = true;

    if (this.tablerowNode.data.hasOwnProperty('rowdata')) {
      const Fsize =
        this.tablerowNode.data.rowdata[this.rowindex][this.colindex - 1]
          .rowstyledata.Fontsize;
      let removedString = Fsize.replace(/[px]/g, '');
      this.RowformGroup.get('Fontsize').setValue(removedString);
      this.RowformGroup.get('Fontweight').setValue(
        this.tablerowNode.data.rowdata[this.rowindex][this.colindex - 1]
          .rowstyledata.Fontweight
      );
      this.RowformGroup.get('textTransform').setValue(
        this.tablerowNode.data.rowdata[this.rowindex][this.colindex - 1]
          .rowstyledata.textTransform
      );
      this.RowformGroup.get('Fontstyle').setValue(
        this.tablerowNode.data.rowdata[this.rowindex][this.colindex - 1]
          .rowstyledata.Fontstyle
      );

      this.RowformGroup.get('RowBackGroundcolour').setValue(
        this.tablerowNode.data.rowdata[this.rowindex][this.colindex - 1]
          .rowstyledata.RowBackGroundcolour
      );

      this.RowformGroup.get('RowFontcolour').setValue(
        this.tablerowNode.data.rowdata[this.rowindex][this.colindex - 1]
          .rowstyledata.RowFontcolour
      );
    }
  }

  saveRowStyle() {
    if (this.RowformGroup.value.Fontsize !== null) {
      this.RowformGroup.value.Fontsize =
        this.RowformGroup.value.Fontsize + 'px';
    }
    for (var i = 0; i < this.colindex; i++) {
    //   var obj: any = {};
    // obj['outervar'] = this.rowindex;
    // obj['innervar'] = i;
    // obj['rowstyledata'] = this.RowformGroup.value;
    // this.RowstyleformArray.push(obj)
      this.tableFormforrow.value[this.rowindex][i]['rowstyledata'] = this.RowformGroup.value;
        
    }

    this.RowStyleVisible = false;
    this.RowformGroup.reset();
  }

  mergecolumn() { 
    console.log("rownode",this.tablerowNode)
    if(this.copyRowTableValue.length === 0){
     // this.copyRowTableValue=this.tableFormforrow.value
if(this.tablerowNode.data.hasOwnProperty('rowdata')){
     this.tableFormforrow.value.forEach((r:any,i:any)=>{
      r.forEach((row:any,j:any)=>{
         if(!row.hasOwnProperty('cellstyledata')){
          row['cellstyledata']=this.tablerowNode.data.rowdata[i][j].cellstyledata
          row['rowstyledata']=this.tablerowNode.data.rowdata[i][j].rowstyledata
         }
      })
    })
    this.copyRowTableValue=this.tableFormforrow.value
    if(this.tablerowNode.data.mergecolumnrow.length!==0){
      this.updaterowcolspandata=this.tablerowNode.data.mergecolumnrow
    }
  }else{
    this.copyRowTableValue=this.tableFormforrow.value
  }
    }else{
      this.tableFormforrow.value.forEach((r:any,i:any)=>{
        r.forEach((row:any,j:any)=>{
          
            this.copyRowTableValue[i][j].mergecheckbox=row.mergecheckbox
            this.copyRowTableValue[i][j].rowName=row.rowName
          
        
        })
      })
    }
    console.log('rowform', this.tableFormforrow);
    if (this.IsMerge === true) {
      const filteredData = this.tableForm.value.filter(
        (item: any) => item.mergecheckbox === true
      );
      let filteredData1: any = [];
      let newarrayofmerge: any = [];
      var newdata = this.copyRowTableValue;
      console.log('this.copyRowTableValue',this.copyRowTableValue)
      if(this.updaterowcolspandata.length > 0){
        this.updaterowcolspandata.forEach((row:any,index:any)=>{
         console.log('testttttttttt',row)
          row.arrayofindex.forEach((ele:any,i:any)=>{
            for (var k = 0; k < newdata.length; k++) {
              for (var l = 0; l < newdata[k].length; l++) {
                if (newdata[k][l].mergecheckbox === true) {
                
                  if(ele.row !== k && ele.column !== l){ 
                    console.log('iffff elseee')
                    const newObject: any = {};
                    filteredData1.push(newdata[k][l]);
                    newObject['row'] = k;
                    newObject['column'] = l;
                    newObject['data']=newdata[k][l]
                    newarrayofmerge.push(newObject);
                    }
                
               
                 }
              }
            }
           
          })
        })
      }else{
      for (var k = 0; k < newdata.length; k++) {
        for (var l = 0; l < newdata[k].length; l++) {
          if (newdata[k][l].mergecheckbox === true) {
          
              console.log('elseeee')
              const newObject: any = {};
              filteredData1.push(newdata[k][l]);
              newObject['row'] = k;
              newObject['column'] = l;
              newObject['data']=newdata[k][l]
              newarrayofmerge.push(newObject);
          
         
           }
        }
      }
    }
      if (filteredData.length !== 0) {
        let arrayofindex: any = [];

        for (var i = 0; i < this.tableForm.value.length; i++) {
          if (this.tableForm.value[i].mergecheckbox === true) {
            arrayofindex.push(i);
          }
      }
        const mergecheckboxCount = filteredData.length;
        let updatedData;
        if (filteredData.length > 0) {
          updatedData = {
            mergecheckbox: '',
            mergecheckboxCount:this.columnMergedIndex.length,
            columnName: this.Mergecolumnname,
            columnindex: this.columnMergedIndex,
          };
        } else {
          updatedData = null;
        }
        this.updatedDatanew.push(updatedData);
        this.columnMergedIndex=[]
       
        if (this.updatedDatanew !== null || this.updatedDatanew.length !== 0) {
          this.newmergecolumnlist = this.updatedDatanew;
          this.IsMergePresent = true;
        }
       
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Column Merged successful!',
        });
        setTimeout(() => {
          this.clearNotifications();
        }, 2000);
     
        this.IsMerge = false;
        //this.tableForm.get('mergecheckbox').setValue(false);
        this.Mergecolumnname = null;
      } else {
        const mergecheckboxCount = filteredData1.length;
        let sameRowValue = true;
        const firstRowValue = newarrayofmerge[0].row;

        for (let i = 1; i < newarrayofmerge.length; i++) {
          if (newarrayofmerge[i].row !== firstRowValue) {
            sameRowValue = false;
            break;
          }
        }

        let colspan: any;
        let rowspan: any;
        if (sameRowValue === true) {
          colspan = mergecheckboxCount;
        } else {
          rowspan = mergecheckboxCount;
        }

        let updatedData;
        if (filteredData1.length > 0) {
          updatedData = {
            mergecheckbox: true,
            rowspan: rowspan ? rowspan : 0,
            colspan: colspan ? colspan : 0,
            arrayofindex: newarrayofmerge,
          };
        } else {
          updatedData = null;
        }
       
        this.updaterowcolspandata.push(updatedData);
     

        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Column Merged successful!',
        });
      
         this.updaterowcolspandata.forEach((row:any)=>{
       console.log('row',row)
          row.arrayofindex =this.removeDuplicates(row.arrayofindex);
        
        })
       
        setTimeout(() => {
          this.clearNotifications();
        
        }, 2000);
        
        this.IsMerge = false;

      }
    } else {
      this.IsMerge = true;
    }
  }

   removeDuplicates(array:any) {
    return array.filter((item:any, index:any) => {
      return !array.some((obj:any, idx:any) => {
        return (
          idx < index &&
          obj.row === item.row &&
          obj.column === item.column
        );
      });
    });
  }

  selectedoption(event: any) {
    this.newinputvalue = event.target.value;
    if (
      this.newinputvalue === 'checkbox' ||
      this.newinputvalue === 'radio' ||
      this.newinputvalue === 'dropdown'
    ) {
      this.IsCheckbox = true;
      this.IsLabel = false;
    } else {
      this.IsLabel = true;
      this.IsCheckbox = false;
      this.IsCheckboxadd = false;
    }
  }

  isRightMergeCheckedcolumn(i:any):boolean{
    let checked=false
    if( this.tablerowNode.data.hasOwnProperty('mergecol')){
     
      this.tablerowNode.data.mergecol.forEach((element:any)=> {
        element.columnindex.forEach((ele:any,index:any) => {
          if(ele===i){
            if(index === 0){
             
              checked=true
             }else{
              checked=false
             }
          }
          
        });
            });
          }else if(this.updatedDatanew.length!==0){
            this.updatedDatanew.forEach((element:any)=> {
              element.columnindex.forEach((ele:any,index:any) => {
                if(ele===i){
                  if(index === 0){
                   
                    checked=true
                   }else{
                    checked=false
                   }
                }
              });
                  });
          }
          else{
            checked=false
          }
          return checked
    
      }
  isLeftMergeCheckedcolumn(i:any):boolean{
    let checked=false
    if( this.tablerowNode.data.hasOwnProperty('mergecol')){
      this.tablerowNode.data.mergecol.forEach((element:any)=> {
        element.columnindex.forEach((ele:any,index:any) => {
          if(ele===i){
            if(index === element.columnindex.length-1){
              checked=true
              }else{
              checked=false
              }
          }
          
        });
            });
          }else if(this.updatedDatanew.length!==0){
            this.updatedDatanew.forEach((element:any)=> {
              element.columnindex.forEach((ele:any,index:any) => {
                if(ele===i){
                  if(index === element.columnindex.length-1){
                    checked=true
                    }else{
                    checked=false
                    }
                }
              });
                  });
          }
          else{
            checked=false
          }
          return checked
    
      }

  isRightLeftMergeCheckedcolumn(i:any):boolean{
    let checked=false
    if( this.tablerowNode.data.hasOwnProperty('mergecol')){
      this.tablerowNode.data.mergecol.forEach((element:any)=> {
        element.columnindex.forEach((ele:any,index:any) => {
          if(ele===i){
            if( element.columnindex.length >=3 && index >=1 && element.columnindex.length-1 !=  index){
              checked=true
              }else{
              checked=false
              }
          }
          
        });
            });
          }else if(this.updatedDatanew.length!==0){
            this.updatedDatanew.forEach((element:any)=> {
              element.columnindex.forEach((ele:any,index:any) => {
                if(ele===i){
                  if( element.columnindex.length >=3 && index >=1 && element.columnindex.length-1 !=  index){
                    checked=true
                    }else{
                    checked=false
                    }
                }
              });
                  });
          }
          else{
            checked=false
          }
          return checked
    
      }

  isMergeCheckedcolumn(i:any):boolean{
let checked=false
if( this.tablerowNode.data.hasOwnProperty('mergecol')){
  this.tablerowNode.data.mergecol.forEach((element:any)=> {
    element.columnindex.forEach((ele:any) => {
      if(ele===i){
      checked=true
      }
      
    });
        });
      }else if(this.updatedDatanew.length!==0){
        this.updatedDatanew.forEach((element:any)=> {
          element.columnindex.forEach((ele:any) => {
            if(ele===i){
             checked=true
            }
          });
              });
      }
      else{
        checked=false
      }
      return checked

  }

  isMergerightChecked(i:any,j:any): boolean {
    // Perform the necessary logic to determine the condition
    // and return true or false accordingly
  
   let checked:boolean=false
    if( this.tablerowNode.data.hasOwnProperty('mergecolumnrow')){
      this.tablerowNode.data.mergecolumnrow.forEach((element: any) => {
       
        element.arrayofindex.forEach((ele: any,index :any) => {
          if (ele.row === i && ele.column === j) {
            if(index === 0){
              console.log('111111111111111111')
              checked=true
             }else{
              checked=false
             }
          }
        });
      });
    }else if(this.updaterowcolspandata.length!==0){
      this.updaterowcolspandata.forEach((element: any) => {
      
        element.arrayofindex.forEach((ele: any,index:any) => {
          if (ele.row === i && ele.column === j) {
             if(index === 0){
              checked=true
             }else{
              checked=false
             }
           
          }
        });
      });
    }else{
      checked =false
    }
  return checked 
  }

  isMergerleftChecked(i:any,j:any): boolean {
    // Perform the necessary logic to determine the condition
    // and return true or false accordingly
  
   let checked:boolean=false
    if( this.tablerowNode.data.hasOwnProperty('mergecolumnrow')){
      this.tablerowNode.data.mergecolumnrow.forEach((element: any) => {
        // console.log('leftttt testarrayofinde22222222', element)
        element.arrayofindex.forEach((ele: any,index:any) => {

          if (ele.row === i && ele.column === j) { 
         
          if(index === element.arrayofindex.length-1){
            checked=true
           }else{
            checked=false
           }
          }
        });
      });
    }else if(this.updaterowcolspandata.length!==0){
      this.updaterowcolspandata.forEach((element: any) => {
        // console.log('left     testarrayofinde', element.arrayofindex)
        element.arrayofindex.forEach((ele: any,index:any) => {
          if (ele.row === i && ele.column === j) {
            
            if(index === element.arrayofindex.length-1){
              checked=true
             }else{
              checked=false
             }
            
          
          }
        });
      });
    }else{
      checked =false
    }
  return checked 
  }
  isMergerleftRightChecked(i:any,j:any): boolean {
    // Perform the necessary logic to determine the condition
    // and return true or false accordingly
  
   let checked:boolean=false
    if( this.tablerowNode.data.hasOwnProperty('mergecolumnrow')){
      this.tablerowNode.data.mergecolumnrow.forEach((element: any) => {
        // console.log('leftttt testarrayofinde22222222', element)
        element.arrayofindex.forEach((ele: any,index:any) => {
          if (ele.row === i && ele.column === j) {  
            if( element.arrayofindex.length >=3 && index >=1 && element.arrayofindex.length-1 !=  index){
          // if(index % 2 != 0){
            checked=true
          //  }else{
            
           }else{
            checked=false
           }
          // }
          }
        });
      });
    }else if(this.updaterowcolspandata.length!==0){
      this.updaterowcolspandata.forEach((element: any) => {
        // console.log('left     testarrayofinde', element)
        element.arrayofindex.forEach((ele: any,index:any) => {
          if (ele.row === i && ele.column === j) {
            if( element.arrayofindex.length >=3 && index >=1 && element.arrayofindex.length-1 !=  index){
              // if(index % 2 != 0){
                checked=true
              //  }else{
                
               }else{
                checked=false
               }
            
          
          }
        });
      });
    }else{
      checked =false
    }
  return checked 
  }
  isMergeChecked(i:any,j:any): boolean {
  
   let checked:boolean=false
    if( this.tablerowNode.data.hasOwnProperty('mergecolumnrow')){
      this.tablerowNode.data.mergecolumnrow.forEach((element: any) => {
        // console.log('testarrayofinde22222222', element)
        element.arrayofindex.forEach((ele: any) => {
          if (ele.row === i && ele.column === j) {
            // console.log('conshi,j',i,j)
           checked=true
          }
        });
      });
    }else if(this.updaterowcolspandata.length!==0){
      this.updaterowcolspandata.forEach((element: any) => {
        // console.log('testarrayofinde', element)
        element.arrayofindex.forEach((ele: any,index:any) => {
          if (ele.row === i && ele.column === j) {
          
            // console.log('conshi,j ->length',i,j)
          checked=true
          }
        });
      });
    }else{
      checked =false
    }
  return checked 
  }

  checkboxvalid(): FormArray {
    return this.CellformGroup.get('checkboxvalid') as FormArray;
  }
  newcheckboxvalid(): FormGroup {
    return this.formBuilder.group({
      Label: [''],
    });
  }

  addcheckboxvalid() {
    this.IsCheckboxadd = true;
    this.checkboxvalid().push(this.newcheckboxvalid());
  }

  removecheckboxvalid_(i: number) {
    this.checkboxvalid().removeAt(i);
    // this.plantForm.value.Departments.splice(i, 1);
  }

  clearFormArray() {
    while (this.checkboxvalid().length !== 0) {
      this.checkboxvalid().removeAt(0);
    }
  }
  saveCellStyle() {
    const nestedArray1 = this.tableFormforrow as FormArray;
    const nestedArray = nestedArray1.at(this.outervar) as FormArray;
    const formGroup = nestedArray.at(this.innervar) as FormGroup;
    const rowNameControl = formGroup.get('rowName') as FormControl;
    rowNameControl.patchValue(this.CellformGroup.value.inputtype);
    this.tableFormforrow.value[this.outervar][this.innervar].rowName =
      this.CellformGroup.value.rowNameValue;
    // this.tableFormforrow.get('rowName').setValue(this.CellformGroup.value.rowNameValue);
    this.tableFormforrow.value[this.outervar][this.innervar]['cellstyledata'] =
      this.CellformGroup.value;

    // var obj: any = {};
    // obj['outervar'] = this.outervar;
    // obj['innervar'] = this.innervar;
    // obj['cellstyledata'] = this.CellformGroup.value;
    // this.CellStyleformArray.push(obj)
    // console.log('cell', this.CellformGroup);
    this.CellformGroup.reset();

    console.log('rowar', this.tableFormforrow.value);
    this.CellStyleVisible = false;
    this.CellformGroup.reset();
  }

  changebackgroundcolor() {
    this.Iscolor = true;
    this.Istext = false;
  }

  changeRowbackgroundcolor() {
    this.IsRowcolor = true;
    this.IsRowtext = false;
  }
  changeFontcolor() {
    this.IsFontcolor = true;
    this.IsFonttext = false;
  }
  changeRowFontcolor() {
    this.IsRowFontcolor = true;
    this.IsRowFonttext = false;
  }
  updateRowColor(event: Event) {
    this.IsRowcolor = false;
    this.IsRowtext = true;
    const colorInput = event.target as HTMLInputElement;
    this.RowselectedColor = colorInput.value;
  }
  updateColor(event: Event) {
    this.Iscolor = false;
    this.Istext = true;
    const colorInput = event.target as HTMLInputElement;
    this.selectedColor = colorInput.value;
  }
  updateFontColor(event: Event) {
    this.IsFontcolor = false;
    this.IsFonttext = true;
    const colorInput = event.target as HTMLInputElement;
    this.selectedFontColor = colorInput.value;
  }
  updateRowFontColor(event: Event) {
    this.IsRowFontcolor = false;
    this.IsRowFonttext = true;
    const colorInput = event.target as HTMLInputElement;
    this.selectedRowFontColor = colorInput.value;
  }
  removeRow(index: number): void {
    console.log("before",this.tableFormforrow)
  
    this.tableFormforrow.removeAt(index);
    this.Noofrows = this.Noofrows - 1;
    this.tablerowNode.data.rowdata.splice(index, 1);
    console.log("after",this.tableFormforrow)
   
  const indicesToRemove: number[] = [];
  this.tablerowNode.data.mergecolumnrow.forEach((element: any, k: number) => {
    element.arrayofindex.forEach((ele: any) => {
      if (ele.row === index) {
        indicesToRemove.push(k);
      }
    });
  });

  // Remove the elements from the mergecolumnrow array in reverse order
  for (let i = indicesToRemove.length - 1; i >= 0; i--) {
    const indexToRemove = indicesToRemove[i];
    this.tablerowNode.data.mergecolumnrow.splice(indexToRemove, 1);
  }

  }
  
  AddRow(index:any){
    let flag:string="false"
    this.FormArray1 = this.fb.array([]);
    for (let j = 1; j <= this.Noofcolumns; j++) {
      const formGroup = new FormGroup({
        rowName: new FormControl(''),
        mergecheckbox:new FormControl(false)
      });
      this.FormArray1.push(formGroup);
    }
    console.log('this  ->>>>>>',  this.tableFormforrow)
    let k=0
   if(this.tablerowNode.data.hasOwnProperty('mergecolumnrow')){
    this.tablerowNode.data.mergecolumnrow.forEach((element:any) => { 
      element.arrayofindex.forEach((ele:any) => {
        if(ele.row===index+1){
        if(element.rowspan !==0){
        flag="true"
           return
        }
        }
        
      });
      k++
    });

    if(flag==="true"){
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'row not added because there row is merged!',
      });
      setTimeout(() => {
        this.clearNotifications();
      }, 2000);
    }else{
      this.tableFormforrow.insert(index+1, this.FormArray1);
      this.tablerowNode.data.rowdata.splice(index+1,0,[])
      this.Noofrows = this.Noofrows + 1;
      console.log('this  ->>>>>>',  this.tableFormforrow);
    }
  }else{
    this.tableFormforrow.insert(index+1, this.FormArray1);
    this.tablerowNode.data.rowdata.splice(index+1,0,[])
    this.Noofrows = this.Noofrows + 1;
  }
   
  }
  
}

function jsonReplacer(key: string, value: any): any {
  if (typeof value === 'object' && value !== null) {
    if (key === 'parent') {
      // Handle circular reference
      return '[Circular Reference]';
    }
  }
  return value;
}
