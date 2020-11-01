import { AgmCoreModule } from '@agm/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../theme/pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { LabelBooleanComponent } from './components/label-boolean/label-boolean.component';
import { LabelCompletedComponent } from './components/label-completed/label-completed.component';
import { LabelActiveComponent } from './components/label-active/label-active.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DescriptionControlComponent } from './components/description-control/description-control.component';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    LabelBooleanComponent,
    LabelCompletedComponent,
    LabelActiveComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    FileUploadComponent,
    DescriptionControlComponent
  ],
  entryComponents: [LabelBooleanComponent, LabelCompletedComponent, LabelActiveComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        PipesModule,
        NgbModule,
        Ng2SmartTableModule,
        MultiselectDropdownModule,
        AgmCoreModule,
        Daterangepicker,
        CKEditorModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        PipesModule,
        NgbModule,
        Ng2SmartTableModule,
        MultiselectDropdownModule,
        LabelBooleanComponent,
        LabelCompletedComponent,
        LabelActiveComponent,
        LoadingSpinnerComponent,
        FileUploadComponent,
        DescriptionControlComponent
    ]
})
export class SharedModule {
  constructor() {
  }
}
