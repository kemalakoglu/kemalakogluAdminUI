import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {APIService} from '../../custom-components/service';
import {AddRefValueRequestDTO} from './addRefValueRequestDTO';
import {CustomRendererComponent} from "../../custom-components/content-editor/customRenderer.component";
import {keys} from "../../constants/keys";
import {ToastrComponent} from "../modal-overlays/toastr/toastr.component";
import {RefTypeDTO} from "../page/refTypeDTO";
import {RefValueDTO} from "./refValueDTO";

@Component({
  selector: 'ngx-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  selectList = [];
  addRequest = new AddRefValueRequestDTO();
  editRequest = new RefValueDTO();
  settings: object;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: APIService, private toastr:ToastrComponent) {
    this.getData();
    this.getPageList();
  }

  ngOnInit() {
    this.settings = this.loadTableStettings();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.editRequest = event.data;
      this.service.post(keys.apiAddress + 'RefValue/DeleteRefValue', this.editRequest).then((data: any) => {
        this.toastr.showToast("success", "Operation Succeeded", 'Message: ' + data.message);
        event.confirm.resolve();
      }).catch((error: any) =>
        this.toastr.showToast("danger", "Operation Failed", 'Message: ' + error.error.Message + ' RC: ' + error.error.RC));
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      this.editRequest.Name = event.newData.name;
      this.editRequest.Id = event.newData.id;
      this.editRequest.IsActive = event.newData.isActive;
      let refType= new RefTypeDTO();
      refType.Id= event.newData.refType;
      this.editRequest.RefType= refType;
      this.editRequest.Value = event.newData.value;
      this.service.post(
        keys.apiAddress + 'RefValue/UpdateRefValue',
        this.editRequest).then((data: any) =>{
        this.toastr.showToast("success" , "Operation Succeeded" , 'Message: ' + data.message );
        event.confirm.resolve();
      }).catch((error: any) =>
        this.toastr.showToast("danger" , "Operation Failed" , 'Message: ' + error.error.Message + ' RC: ' + error.error.RC)
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create?')) {
      this.addRequest.Name = event.newData.name;
      this.addRequest.RefTypeId = event.newData.refType;
      this.addRequest.IsActive = event.newData.isActive;
      this.service.post(keys.apiAddress + 'RefValue/AddRefValue', this.addRequest).then((data: any) =>{
        this.toastr.showToast("success" , "Operation Succeeded" , 'Message: ' + data.message );
        event.confirm.resolve();
      }).catch((error: any) =>
        this.toastr.showToast("danger" , "Operation Failed" , 'Message: ' + error.error.Message + ' RC: ' + error.error.RC)
      );
    } else {
      event.confirm.reject();
    }
    this.getData();
  }

  loadTableStettings(){
    return {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
        visibility: false,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        id: {
          title: 'ID',
          type: 'number',
          editable: false,
          addable: false,
        },
        name: {
          title: 'Content Name',
          type: 'string',
        },
        refType: {
          title: 'Page',
          type: 'list',
          valuePrepareFunction: (refType) => refType.name,
          editor: {
            type: 'list',
            config: {
              list: this.selectList
            },
          },
        },
        insertDate: {
          title: 'Insert Date',
          type: 'string',
          editable: false,
          addable: false,
        },
        updateDate: {
          title: 'Last Update Date',
          type: 'string',
          editable: false,
          addable: false,
        },
        isActive: {
          title: 'Is Active',
          editor: {
            type: 'list',
            config: {
              list : [{ value: 'true' , title: 'true' }, { value: 'false', title: 'false' }]
            },
          },
        },
        contentEditor: {
          title: 'Content Editor',
          type: 'custom',
          renderComponent: CustomRendererComponent,
          filter: false,
          editable: false,
          addable: false,
        },
      },
    };
  }

  private getData() {
    this.service.get(keys.apiAddress + 'RefValue/GetRefValuesByPage')
      .then((data:any)=>this.source.load(data.data))
      .then(()=> this.settings = this.loadTableStettings());
  }

  private getPageList() {
    this.service.get(keys.apiAddress + 'RefType/GetRefTypesByParent?parentId=1').then((data: any) => {
      for (let i = 0; i < data.data.length; i++) {
        this.selectList.push({value: data.data[i].id, title: data.data[i].name});
      };
    });
  }

}

