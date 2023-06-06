import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tabsService } from 'src/app/services/tabs.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-rating-component',
  templateUrl: './rating-component.component.html',
  styleUrls: ['./rating-component.component.scss'],
})
export class RatingComponentComponent implements OnInit {
  files: any = [];
  data: any = [];
  visible: boolean = false;
  tabName: any;
  selectedOption: string = 'container'
  selectedOption1: string =''
  tabTitle: any;
  tData:any=[]
  tabEditId: any;
  componentVisible: boolean = false;
  component: string = '';
  dependentComponent: string = '';
  containerName: any;
  Noofcolumns:any;
  dynamicColumns:number[]=[];
  scoreValue:any
  factorValue:any
  totalValue:any
  columnvalue:any;
  IsMerge:boolean=false
  tableName:any;
  addcontainerdata:any=[]
  containerData:any=[]
  containerTitle:any
  containerValue:any
  data1:any
  componentData: any = [{ name: 'Enable Overide', code: 'NY' }];
  dependantData: any = [{ name: 'New York', code: 'NY' }];
  containerVisible: boolean = false;
  IsContainer:boolean=true
  IsTable:boolean=false
  tableForm:any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tabService: tabsService,
    private fb:FormBuilder,
  ) {}
  ngOnInit(): void {
    this.tabService.gettabs().subscribe(res=>{
      this.files=res
    })
    this.tableForm = this.fb.array(([]))
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
       this.tabService.savetabs(data).subscribe(res =>{
        console.log('res  ->>>>>>',res)
        this.files=[]
        this.files=res
       })
      
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
        
    const jsonString1 = JSON.stringify( this.files, jsonReplacer);
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

  editTab(rowData: any,rowNode:any): void {
   
    if(rowData.type ==='container'){
      this.containerTitle=''
        this.containerTitle='Edit Container'
        this.containerValue='container'
        this.containerName=rowData.name
        this.containerVisible=true
        this.containerData=rowNode.node
        
    }else{
    this.tabTitle=''
    this.tabName=rowData.name
    this.tabTitle='Edit Tab'
    this.tabEditId=rowData.id
    this.visible = true;
    }
  }

  copyTab(rownode: any,rowData:any): void{
    console.log('rowData',rowData)
    console.log('rownode',rownode)
    if(rownode.level == 0){
    this.files=[]
    let data=rownode.node
    delete data.data.id
   this.tabService.savetabs(data).subscribe(res =>{
    this.files=res
    const jsonString1 = JSON.stringify( this.files, jsonReplacer);
    this.tabService.SubmitTabs(jsonString1).subscribe((res) => {});
   })
   
  }else if(rownode.level ==1){
    let data = {
      data: {
        name: rowData.name,
        size: rowData.size,
        type: 'container',
        hide: rowData.hide,
      },
    };
    rownode.node.parent.children.push(data)
  }
  }

  
  deletTab(rowNode:any ,rowData: any): void {
    if(rowData.type==='tab'){
    this.tabService.deleteTabs(rowData.id).subscribe((res) => {
      this.files = [];
      this.files = res;
      const jsonString1 = JSON.stringify( this.files, jsonReplacer);
      this.tabService.SubmitTabs(jsonString1).subscribe((res) => {});
    });
  }
  else{
    rowNode.node.parent.children= rowNode.node.parent.children.filter((tab: any) => tab.data.name !== rowData.name);
    const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string
    if (jsonString !== null) {
      const parsedObject = JSON.parse(jsonString, (key, value) => {
        if (key === 'parent') {
          // Handle circular reference
          return value; // Return the reference to the parent object
        }
        return value;
      });
      for(var i=0;i<parsedObject.length;i++){
          if(parsedObject[i].data.id===rowNode.node.parent.data.id){
            parsedObject[i].children=rowNode.node.parent.children
          }
      }
      this.files=parsedObject
    }
    const jsonString1 = JSON.stringify( this.files, jsonReplacer);
    this.tabService.SubmitTabs(jsonString1).subscribe((res) => {});
  }
  }
  AddData(rownode: any): void {
    this.componentVisible = true;
    // this.tabService.deleteTabs(rowData.id).subscribe(res=>{
    //   this.files=[]
    //     this.files=res
    // })
  }
  toggleEyeIcon(rowNode:any,rowData: any): void {
    if(rowData.type ==='container'){
      rowData.hide = !rowData.hide;
    let data = {
      data:rowData,
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
    
      const parsedObject1 = rowNode.node.parent.children.map((tab: any) => {
        if (tab.name === data.data.name) {
          return {
            ...tab,
            data: data.data,
          };
      }
        return tab;
      });
      for(var i=0;i<parsedObject.length;i++){
        if(parsedObject[i].data.id===rowNode.node.parent.data.id){
          delete parsedObject[i].children
          parsedObject[i].children=parsedObject1;
        }
      }
      
      this.files = parsedObject;
    
    }}else{
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


  AddContainer(rownode: any): void{
    this.containerData=rownode.node
    this.containerTitle='Add Container'
      this.containerVisible=true
    }
  


saveContainer(){
  if(this.containerValue==='container'){
  console.log('constainer tiler----',this.containerTitle)
 if(this.containerTitle =='Edit Container'){
  console.log("cont", this.containerData)
  this.containerData.data.name=this.containerName
  this.containerName=''
  this.containerData={}
  this.containerVisible=false 
 }else if(this.containerTitle =='Add Container'){
  console.log('container data ',this.containerData)
 
  this.containerData.children.push({
    "data": {
        "name": this.containerName,
        "size": "10mb",
        "type": "container",
        "hide" :true
    }
  })
  console.log('containerdata',this.containerData)
 
  this.containerName=''
  this.containerData={}
  this.containerVisible=false
}
  }
  else{
    const filteredData = this.tableForm.value.filter((item:any) => item.mergecheckbox === true);
    const mergecheckboxCount = filteredData.length;
    
    const mergedNames = filteredData.map((item:any) => item.columnName).join(" ");
    const updatedData = [
      {
        mergecheckbox: '',
        mergecheckboxCount:mergecheckboxCount,
        columnName: mergedNames
      },
      ...this.tableForm.value.slice(mergecheckboxCount)
    ];

    this.containerData.children.push({
      "data": {
          "name": this.tableName,
          "type": "table",
          "hide" :true,
          "tabledata":updatedData
      }
    })
    console.log('data form ',updatedData)
    this.tableName=''
  this.containerData={}
  this.containerVisible=false
  }
}
  showcontaineronclick(){
  this.selectedOption='option'
  this.selectedOption1=''
    this.IsContainer=true
    this.IsTable=false
      
  }

  showTableonclick(){
    this.selectedOption1='option1'
  this.selectedOption=''
    this.IsContainer=false
    this.IsTable=true
    
  }
  SubmitTabs(): void {
    this.data = this.files;

    const jsonString = JSON.stringify(this.data, jsonReplacer);
    this.tabService.SubmitTabs(jsonString).subscribe((res) => {});
  }

  onChangecolumn(event:any){
    this.dynamicColumns=[]
    for (let i = 1; i <= this.Noofcolumns; i++) {
      // this.dynamicColumns.push(i);
      const rangeArray = this.tableForm as FormArray
      const formGroup = new FormGroup({});
      formGroup.addControl('mergecheckbox', new FormControl(''));
      formGroup.addControl('columnName', new FormControl(''));
      rangeArray.push(formGroup);
    }
   
  }
  mergecolumn(){
    this.IsMerge=true
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
