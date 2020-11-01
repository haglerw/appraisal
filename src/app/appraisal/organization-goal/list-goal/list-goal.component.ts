import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService, GlobalService} from '../../../shared/services';
import {CreateGoalComponent} from '../create-goal/create-goal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-goal',
  templateUrl: './list-goal.component.html',
  styleUrls: ['./list-goal.component.scss']
})
export class ListGoalComponent implements OnDestroy, OnInit {
  private subs = new SubSink();

  modalRef: NgbModalRef;
  goals: any[] = [];

  settings = {
    selectMode: 'single',  // single|multi
    hideHeader: false,
    hideSubHeader: false,
    attr: {class: 'table table-striped'},
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'view',
          title: '<i class="fa fa-eye fa-lg text-primary mr-2" aria-hidden="true"></i>'
        },
        // {
        //   name: 'edit',
        //   title: '<i class="fa fa-pencil-square-o fa-lg text-warning mr-2" aria-hidden="true"></i>'
        // },
        // {
        //   name: 'delete',
        //   title: '<i class="fa fa-trash fa-lg text-danger" aria-hidden="true"></i>'
        // }
      ],
      position: 'right' // left|right
    },
    noDataMessage: 'No data found',
    columns: {
      index: {
        title: 'No.',
        width: '60px',
        type: 'html',
        valuePrepareFunction: (value) => '<div class="text-center">' + value + '</div>'
      },
      goal_name: {
        title: 'Name',
        type: 'string'
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  constructor(
      private apiService: ApiService,
      private modalService: NgbModal,
      private globalService: GlobalService,
      private router: Router
  ) {}

  ngOnInit() {
    this.getGoals('appraisal/all_org_goals');
  }

  getGoals(endpoint: string) {
    this.subs.sink = this.apiService.getResource(endpoint)
        .subscribe(
            res => {
              if (res['error'] === false) {
                const data = res['data'];
                this.goals = data.map((item, index) => {
                  const container = {};

                  container['index'] = index + 1;
                  container['goal_id'] = item['goal_id'];
                  container['goal_name'] = item['goal_name'];

                  return container;
                });
              }
            }
        );
  }

  openModal(data?: any) {
    this.modalRef = this.modalService.open(CreateGoalComponent, { container: '.app' });
    if (data) {
      this.modalRef.componentInstance.title = 'Edit ' + data.goal_name;
      this.modalRef.componentInstance.formData = data;
    } else {
      this.modalRef.componentInstance.title = 'Create Goal';
    }
    this.modalRef.result.then((result) => {
      this.getGoals('appraisal/all_org_goals');
    }, (reason) => {
      console.log(`Dismissed ${this.globalService.getDismissedReason(reason)}`);
      this.getGoals('appraisal/all_org_goals');
    });
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/appraisal/organization-goals', event.data.goal_id]);
        break;
      default:
        console.log('No action was taken');
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
