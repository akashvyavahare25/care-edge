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
  ];
  data: any = [];
  visible: boolean = false;
  tabName: any;
  newinputvalue: any;
  rowvaluetype: any;
  Columntype: any = 'checkbox';
  selectedOption: string = 'container';
  selectedOption1: string = '';
  tabTitle: any;
  tData: any = [];
  selectedColor: string = '';
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
  tableName: any;
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
  Iscolor: boolean = false;
  Istext: boolean = true;
  tableForm: any;
  tableFormforrow: any;
  FormArray1: any = [];
  CellStyleformArray: any;
  rangeArrayforRow: any = [];
  //formBuilder: any;
  CellformGroup: any;
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
    }if (rowData.type === 'table') {
      this.containerTitle = '';
      this.containerTitle = 'Edit table';
      this.containerValue = 'table';
      this.tableName = rowData.name;
      this.containerVisible = true;
      this.Noofcolumns=rowData.tabledata.length;
      this.Noofrows=rowData.rowdata.length;
      this.containerData = rowNode.node;
      this.tableForm = this.fb.array([]);
      for (let i = 0; i <this.Noofcolumns; i++) {
        // this.dynamicColumns.push(i);
        const rangeArray = this.tableForm as FormArray;
        const formGroup = new FormGroup({});
        //formGroup.addControl('mergecheckbox', new FormControl(rowData.tabledata[i].mergecheckbox));
        formGroup.addControl('columnName', new FormControl(rowData.tabledata[i].columnName));
        rangeArray.push(formGroup);
      }

      
    }
     else {
      this.tabTitle = '';
      this.tabName = rowData.name;
      this.tabTitle = 'Edit Tab';
      this.tabEditId = rowData.id;
      this.visible = true;
    }
  }

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
            rowdata:rowData.rowdata,
            tabledata:rowData.tabledata
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
      rowNode.node.parent.children = rowNode.node.parent.children.filter(
        (tab: any) => tab.data.name !== rowData.name
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
    this.tableForm.reset()
    this.tableFormforrow.reset()
    this.Noofcolumns=null
    this.tableName=null
    this.Noofrows=null
    this.onChangecolumn(this.Noofcolumns)
    this.containerData = rownode.node;
    this.containerValue='container'
    this.containerTitle = 'Add Container';
    this.containerVisible = true;
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
          },
        });
        console.log('containerdata', this.containerData);

        this.containerName = '';
        this.containerData = {};
        this.containerVisible = false;
      }
    } else {
      const filteredData = this.tableForm.value.filter(
        (item: any) => item.mergecheckbox === true
      );
      const rowsdata = this.tableFormforrow.value;
      const mergecheckboxCount = filteredData.length;

      let updatedData;
      if (filteredData.length > 0) {
        const mergedNames = filteredData
          .map((item: any) => item.columnName)
          .join(' ');
        updatedData = [
          {
            mergecheckbox: '',
            mergecheckboxCount: mergecheckboxCount,
            columnName: mergedNames,
          },
          ...this.tableForm.value.slice(mergecheckboxCount),
        ];
      } else {
        updatedData = this.tableForm.value;
      }

      this.containerData.children.push({
        data: {
          name: this.tableName,
          type: 'table',
          hide: true,
          tabledata: updatedData,
          rowdata: rowsdata,
        },
      });

      console.log('rowdata', rowsdata);
      console.log('data form ', updatedData);
      this.tableName = '';
      this.containerData = {};
      this.containerVisible = false;
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
    this.rangeArrayforRow = [];
    this.tableFormforrow = this.fb.array([]);
    this.rangeArrayforRow = this.tableFormforrow as FormArray;

    for (let i = 1; i <= this.Noofrows; i++) {
      this.FormArray1 = this.fb.array([]);
      for (let j = 1; j <= this.Noofcolumns; j++) {
        const formGroup = new FormGroup({
          rowName: new FormControl(''),
        });
        //formGroup.addControl('rowName', new FormControl(''));
        this.FormArray1.push(formGroup);
      }
      this.rangeArrayforRow.push(this.FormArray1);
    }
    console.log('array', this.rangeArrayforRow);
  }
  EditCell(i: any, j: any) {
    this.CellformGroup.reset();
    this.outervar = i;
    this.innervar = j;
    this.CellStyleVisible = true;
    this.IsFontcolor = false;
    this.IsFonttext = true;
    this.Iscolor = false;
    this.Istext = true;
    console.log('cellform', this.tableFormforrow.value);
  }
  mergecolumn() {
    this.IsMerge = true;
  }
  selectedoption(event: any) {
    this.newinputvalue = event.target.value;
  }

  saveCellStyle() {
    const nestedArray1 = this.tableFormforrow as FormArray;
    const nestedArray = nestedArray1.at(this.outervar) as FormArray;
    const formGroup = nestedArray.at(this.innervar) as FormGroup;
    const rowNameControl = formGroup.get('rowName') as FormControl;
    rowNameControl.patchValue(this.CellformGroup.value.rowNameValue);
    this.tableFormforrow.value[this.outervar][this.innervar].rowName =
      this.CellformGroup.value.rowNameValue;
    // this.tableFormforrow.get('rowName').setValue(this.CellformGroup.value.rowNameValue);
    this.tableFormforrow.value[this.outervar][this.innervar]['cellstyledata'] =
      this.CellformGroup.value;
    this.CellformGroup.reset();

    console.log('rowar', this.tableFormforrow.value);
    this.CellStyleVisible = false;
    this.CellformGroup.reset();
  }
  changebackgroundcolor() {
    this.Iscolor = true;
    this.Istext = false;
  }
  changeFontcolor() {
    this.IsFontcolor = true;
    this.IsFonttext = false;
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
