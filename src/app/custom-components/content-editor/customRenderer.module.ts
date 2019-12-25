import {CustomRendererComponent} from "./customRenderer.component";
import {NgModule} from "@angular/core";
import {NbCardModule} from "@nebular/theme";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [CustomRendererComponent],
  imports: [
    NbCardModule,
    CKEditorModule,
    FormsModule,],
  providers: [],
  entryComponents: [],
})
export class CustomRendererModule {
}
