import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class tabsService {
  // token = localStorage.getItem('jwtToken')
  // httpOptions = {
  //   headers: new HttpHeaders()
  //     .set('content-type', 'application/json')
  // }

  // httpOptions1 = {
  //   headers: new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('Access-Control-Allow-Origin', '*')
  //   .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
  //   .set('Authorization', 'Bearer ' + this.token),
  // }
  tabsData: any = [
    {
      data: {
        name: 'Applications',
        size: '200mb',
        type: 'tab',
        id: 1,
        hide: true,
      },
      children: [
        {
          data: {
            name: 'Angular',
            size: '25mb',
            type: 'Folder',
            "hide" :true
          },
          children: [
            {
              data: {
                name: 'angular.app',
                size: '10mb',
                type: 'Application',
              },
            },
            {
              data: {
                name: 'cli.app',
                size: '10mb',
                type: 'Application',
              },
            },
            {
              data: {
                name: 'mobile.app',
                size: '5mb',
                type: 'Application',
              },
            },
          ],
        },
        {
          data: {
            name: 'editor.app',
            size: '25mb',
            type: 'Application',
            "hide" :true
          },
        },
        {
          data: {
            name: 'settings.app',
            size: '50mb',
            type: 'Application',
            "hide" :true
          },
        },
      ],
    },
    {
      data: {
        name: 'Cloud',
        size: '20mb',
        type: 'tab',
        id: 2,
        hide: true,
      },
      children: [
        {
          data: {
            name: 'backup-1.zip',
            size: '10mb',
            type: 'Zip',
          },
        },
        {
          data: {
            name: 'backup-2.zip',
            size: '10mb',
            type: 'Zip',
          },
        },
      ],
    },
  ];

  constructor() {}

  savetabs(data: any): Observable<any> {
    const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string
    if (jsonString !== null) {
      const parsedObject = JSON.parse(jsonString, (key, value) => {
        if (key === 'parent') {
          // Handle circular reference
          return value; // Return the reference to the parent object
        }
        return value;
      });
      this.tabsData=parsedObject
    }
    data.data['id'] = this.tabsData.length + 1;
    this.tabsData.push(data);
    return of(this.tabsData);
  }

  gettabs(): Observable<any> {
    const jsonString: string | null = localStorage.getItem('datasource'); // Replace with your method to obtain the JSON string
    if (jsonString !== null) {
      const parsedObject = JSON.parse(jsonString, (key, value) => {
        if (key === 'parent') {
          // Handle circular reference
          return value; // Return the reference to the parent object
        }
        return value;
      });
      this.tabsData=parsedObject
    }
   
    return of(this.tabsData);
    
  }

  updateTabs(data: any): Observable<any> {
    this.tabsData = this.tabsData.map((tab: any) => {
      console.log('test', tab.data.id, data.data.id);
      if (tab.data.id === data.data.id) {
        return {
          ...tab,
          data: data.data,
        };
      }
      return tab;
    });
    return of(this.tabsData);
  }

  deleteTabs(id: any): Observable<any> {
    this.tabsData = this.tabsData.filter((tab: any) => tab.data.id !== id);
    return of(this.tabsData);
  }

  SubmitTabs(data: any): Observable<any> {
    localStorage.setItem('datasource', data);
    return of(data);
  }

  
}
