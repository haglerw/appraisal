import { Component, OnInit, OnDestroy } from '@angular/core';
import {SubSink} from 'subsink';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService, GlobalService} from '../../../shared/services';
import {CreateGoalComponent} from '../../organization-goal/create-goal/create-goal.component';
import {CreateReviewComponent} from '../create-review/create-review.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnDestroy, OnInit {
  private subs = new SubSink();

  modalRef: NgbModalRef;
  review_periods: any[] = [];

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
      // custom: [
      //   {
      //     name: 'edit',
      //     title: '<i class="fa fa-pencil-square-o fa-lg text-warning mr-2" aria-hidden="true"></i>'
      //   },
      //   {
      //     name: 'delete',
      //     title: '<i class="fa fa-trash fa-lg text-danger" aria-hidden="true"></i>'
      //   }
      // ],
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
      review_name: {
        title: 'Review Period',
        type: 'string'
      },
      date_created: {
        title: 'Created',
        type: 'string',
        width: '150px',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform(value, 'short');
        }
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
      private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getGoals('appraisal/all_reviews');
  }

  getGoals(endpoint: string) {
    this.subs.sink = this.apiService.getResource(endpoint)
        .subscribe(
            res => {
              if (res['error'] === false) {
                const data = res['data'];
                this.review_periods = data.map((item, index) => {
                  const container = {};

                  container['index'] = index + 1;
                  container['review_id'] = item['review_id'];
                  container['review_name'] = item['review_name'];
                  container['date_created'] = item['date_created'];

                  return container;
                });
              }
            }
        );
  }

  openModal(data?: any) {
    this.modalRef = this.modalService.open(CreateReviewComponent, { container: '.app' });
    if (data) {
      this.modalRef.componentInstance.title = 'Edit ' + data.review_name;
      this.modalRef.componentInstance.formData = data;
    } else {
      this.modalRef.componentInstance.title = 'Create Review Period';
    }
    this.modalRef.result.then((result) => {
      this.getGoals('appraisal/all_reviews');
    }, (reason) => {
      console.log(`Dismissed ${this.globalService.getDismissedReason(reason)}`);
      this.getGoals('appraisal/all_reviews');
    });
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'edit':
        this.openModal(event.data);
        break;
      case 'delete':
        // this.deleteCategory(event.data);
        break;
      default:
        console.log('No action was taken');
    }
  }

  // deleteCategory(category: any) {
  //   const model = {
  //     typename: category.name,
  //     typeid: category.announcementtypeid,
  //     active: false
  //   };
  //   this.churchService.deleteResource(
  //       model,
  //       'adminupdateannouncementtypes',
  //       () => {
  //         this.getGoals('listannouncementtypes');
  //       }
  //   );
  // }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
