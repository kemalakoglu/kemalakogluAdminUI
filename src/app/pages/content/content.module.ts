import { NgModule } from '@angular/core';
import {NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ContentComponent} from './content.component';
import {CustomRendererComponent} from "../../custom-components/content-editor/customRenderer.component";
import {CustomRendererModule} from "../../custom-components/content-editor/customRenderer.module";

@NgModule({
  declarations: [ContentComponent],
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    CustomRendererModule,
  ],
  providers:[],
  entryComponents: [CustomRendererComponent],
})
export class ContentModule { }
