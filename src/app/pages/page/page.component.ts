import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {APIService} from '../../custom-components/http-service/service';
import {RefTypeDto} from './ref-type-dto';
import {ToastrComponent} from "../modal-overlays/toastr/toastr.component";
import {keys} from "../../constants/keys";

// @ts-ignore
@Component({
  selector: 'ngx-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  request = new RefTypeDto();

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
        title: 'Name',
        type: 'string',
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
    /*  parent:{
          title: 'Parent',
          type: 'string',
          editable: false,
          valuePrepareFunction: (value)=>{
            return value.name;
        },
          addable: false,
      },*/
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: APIService, private toastr: ToastrComponent) {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {

      this.service.getWithToken(keys.apiAddress + 'RefType/SoftDeleteRefType?id=' + event.data.id).then((data: any) => {
        this.toastr.showToast("success" , "Operation Succeeded" , 'Message: ' + data.message );
        event.confirm.resolve();
      }).catch((error: any) =>
        this.toastr.showToast("danger" , "Operation Failed" , 'Message: ' + error.error.Message + ' RC: ' + error.error.RC));
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to edit?')) {
      this.request.Name = event.newData.name;
      this.request.Id = event.newData.id;
      this.request.IsActive = event.newData.isActive;
      // this.request.Parent= event.newData.parent;
      this.service.postWithToken(
        keys.apiAddress + 'RefType/UpdateRefType',
        this.request).then((data: any) =>{
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
      this.request.Name = event.newData.name;
      this.request.Parent = new RefTypeDto();
      this.request.Parent.Id = 1;
      this.request.Status=true;
      this.request.IsActive=event.newData.isActive;
      this.service.postWithToken(
        keys.apiAddress + 'RefType/AddRefType',
        this.request).then((data: any) =>{
        this.toastr.showToast("success" , "Operation Succeeded" , 'Message: ' + data.message );
        event.confirm.resolve();
      }).catch((error: any) =>
        this.toastr.showToast("danger" , "Operation Failed" , 'Message: ' + error.error.Message + ' RC: ' + error.error.RC));
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.service.getWithToken(keys.apiAddress + 'RefType/GetRefTypesByParent?parentId=1').then((data: any) =>
      this.source.load(data.data)).catch((error: any) =>
      this.toastr.showToast("danger" , "Operation Failed" , 'Message: ' + error.error.Message + ' RC: ' + error.error.RC));
  }
}

