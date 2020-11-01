import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListGoalComponent} from './organization-goal/list-goal/list-goal.component';
import {CreateGoalComponent} from './organization-goal/create-goal/create-goal.component';
import {ViewGoalComponent} from './organization-goal/view-goal/view-goal.component';
import {ListObjectiveComponent} from './employee-objective/list-objective/list-objective.component';
import {CreateObjectiveComponent} from './employee-objective/create-objective/create-objective.component';
import {ListReviewComponent} from './appraisal-review/list-review/list-review.component';
import {CreateReviewComponent} from './appraisal-review/create-review/create-review.component';


const routes: Routes = [
  { path: 'organization-goals', component: ListGoalComponent, data: { breadcrumb: 'Organization Goals',  title: 'Organization Goals' } },
  { path: 'organization-goals/create', component: CreateGoalComponent, data: { breadcrumb: 'Create Goal',  title: 'Create Goal' } },
  { path: 'organization-goals/:goalid', component: ViewGoalComponent, data: { breadcrumb: 'View Goal',  title: 'View Goal' } },
  { path: 'objectives', component: ListObjectiveComponent, data: { breadcrumb: 'Employee Objectives',  title: 'Employee Objectives' } },
  { path: 'objectives/create', component: CreateObjectiveComponent, data: { breadcrumb: 'Create Objective',  title: 'Create Objective' } },
  { path: 'review-periods', component: ListReviewComponent, data: { breadcrumb: 'Review Periods',  title: 'Review Periods' } },
  { path: 'review-periods/create', component: CreateReviewComponent, data: { breadcrumb: 'Create Review Period',  title: 'Create Review Period' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppraisalRoutingModule { }
