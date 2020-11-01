import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {ApiService} from '../../../shared/services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-goal',
  templateUrl: './view-goal.component.html',
  styleUrls: ['./view-goal.component.scss']
})
export class ViewGoalComponent implements OnDestroy, OnInit {
  private subs = new SubSink();

  info: string;
  image_path: any;
  goalid: any;
  goal: any;

  constructor(
      private route: ActivatedRoute,
      private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.goalid = +params.goalid;
    });

    this.getGoal('appraisal/' + this.goalid + '/all_org_goals');
  }

  getGoal(endpoint: string): void {
    this.subs.sink = this.apiService.getResource(endpoint)
        .subscribe(
            res => {
              this.goal = res['data'][0];
            },
            err => { if (err) { console.log(err.error.message); } }
        );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
