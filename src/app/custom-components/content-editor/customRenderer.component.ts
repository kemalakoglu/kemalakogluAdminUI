import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import {NbDialogService} from "@nebular/theme";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {APIService} from "../service";
import {keys} from "../../constants/keys";
import {RefValueDTO} from "../../pages/content/refValueDTO";
import {ToastrComponent} from "../../pages/modal-overlays/toastr/toastr.component";
import {RefTypeDTO} from "../../pages/page/refTypeDTO";

@Component({
  templateUrl: './customRenderer.component.html',
  styleUrls: ['./customRenderer.component.scss'],
})
export class CustomRendererComponent implements ViewCell, OnInit {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @Input() dialog: TemplateRef<any>;    // This hold the cell value
  contextData:any;
  editRequest = new RefValueDTO();
  public Editor = ClassicEditor;
  public model = {
    editorData: ''
  };

  constructor(private dialogService: NbDialogService, private apiService: APIService, private toastr:ToastrComponent) {}

  ngOnInit() {
  }

  openWithoutBackdropClick(dialog: TemplateRef<any>, rowData: any) {
    this.dialogService.open(
      dialog,
      {
        context: rowData.name,
        closeOnBackdropClick: false,
      });
    this.model.editorData=rowData.value;
    this.contextData=rowData;
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  public UpdateData(){
    this.editRequest.Name = this.contextData.name;
    this.editRequest.Id = this.contextData.id;
    this.editRequest.IsActive = this.contextData.isActive;
    this.editRequest.Value = this.model.editorData;
    this.editRequest.RefType= this.contextData.refType;
    this.apiService.post(
      keys.apiAddress + 'RefValue/UpdateRefValue',
      this.editRequest).then((data: any) =>{
      this.toastr.showToast("success" , "Operation Succeeded" , 'Message: ' + data.message );
  });
  }
}
