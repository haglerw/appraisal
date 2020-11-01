import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppraisalRoutingModule } from './appraisal-routing.module';
import { ListGoalComponent } from './organization-goal/list-goal/list-goal.component';
import { CreateGoalComponent } from './organization-goal/create-goal/create-goal.component';
import { ViewGoalComponent } from './organization-goal/view-goal/view-goal.component';
import { CreateReviewComponent } from './appraisal-review/create-review/create-review.component';
import { ListReviewComponent } from './appraisal-review/list-review/list-review.component';
import { CreateObjectiveComponent } from './employee-objective/create-objective/create-objective.component';
import { ListObjectiveComponent } from './employee-objective/list-objective/list-objective.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ListGoalComponent,
    CreateGoalComponent,
    ViewGoalComponent,
    CreateReviewComponent,
    ListReviewComponent,
    CreateObjectiveComponent,
    ListObjectiveComponent
  ],
  imports: [
    CommonModule,
    AppraisalRoutingModule,
    SharedModule
  ],
  entryComponents: [
      CreateGoalComponent,
      CreateObjectiveComponent,
      CreateReviewComponent
  ]
})
export class AppraisalModule { }
