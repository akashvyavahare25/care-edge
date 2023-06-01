import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tabsService } from 'src/app/services/tabs.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-rating-component',
  templateUrl: './rating-component.component.html',
  styleUrls: ['./rating-component.component.scss']
})
export class RatingComponentComponent implements OnInit {
  
  files:any=[]
  visible: boolean=false
  tabName:any
  tabTitle:any
  tabEditId:any
  componentVisible:boolean=false
  component:string=''
  dependentComponent:string=''
  containerName:any
  componentData :any= [
    { name: 'Enable Overide', code: 'NY' },
];
dependantData:any= [
  { name: 'New York', code: 'NY' },
 
];
containerVisible:boolean=false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tabService:tabsService
  ){
    
  }
  ngOnInit(): void {
      this.tabService.gettabs().subscribe(res=>{
        this.files=res
      })
  }

  showDialog() {
    this.tabTitle='Add Tab'
    this.visible = true;
}
  saveTabs(){
     this.visible=false

     if(this.tabTitle === 'Add Tab'){
      let data={  
        "data":{  
            "name":this.tabName,
            "size":"200mb",
            "type":"tab",
             "hide":true
        },
        "children":[]
    }
     this.tabService.savetabs(data).subscribe(res =>{
      console.log('res  ->>>>>>',res)
      this.files=[]
      this.files=res
     })
    }else{
      let data={  
        "data":{  
            "name":this.tabName,
            "size":"200mb",
            "type":"tab",
            "id":this.tabEditId,
            "hide":true
        },
        "children":[]
    }
      this.tabService.updateTabs(data).subscribe(res =>{
        console.log('res  ->>>>>>',res)
        this.files=[]
        this.files=res
       })
    }
     
  }

  showTabs(){
    this.router.navigate(['/rating/tabs'])
  }

  dependantCompoentClick(rowData: any): void {
    this.componentVisible=true
    // Handle eye icon click event for the corresponding row data
    console.log('Eye icon clicked:', rowData);
  }

  editTab(rowData: any): void {
    console.log('rowData',rowData)
    this.tabTitle=''
    this.tabName=rowData.name
    this.tabTitle='Edit Tab'
    this.tabEditId=rowData.id
    this.visible = true;
  }

  copyTab(rownode: any): void{
    this.files=[]
    let data=rownode.node
    delete data.data.id
   this.tabService.savetabs(data).subscribe(res =>{
    this.files=res
   })
  }

  deletTab(rowData: any): void{
    this.tabService.deleteTabs(rowData.id).subscribe(res=>{
      this.files=[]
        this.files=res
    })
  }
  AddData(rownode: any): void{
    this.componentVisible=true
    // this.tabService.deleteTabs(rowData.id).subscribe(res=>{
    //   this.files=[]
    //     this.files=res
    // })
  }
  toggleEyeIcon(rowData: any): void {
    rowData.hide = !rowData.hide;
    let data={  
      "data":rowData,
      "children":[]
  }
    this.tabService.updateTabs(data).subscribe(res =>{
      console.log('res  ->>>>>>',res)
      this.files=[]
      this.files=res
     })
  }
  saveComponents(){
    this.componentVisible=false
  }

  AddContainer(rownode: any): void{
    this.containerVisible=true
  }
  saveContainer(){
    this.containerVisible=false
  }
}
