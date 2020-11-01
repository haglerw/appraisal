import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService, GlobalService} from '../../../shared/services';
import {CreateObjectiveComponent} from '../create-objective/create-objective.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-objective',
  templateUrl: './list-objective.component.html',
  styleUrls: ['./list-objective.component.scss']
})
export class ListObjectiveComponent implements OnDestroy, OnInit {
  private subs = new SubSink();

  modalRef: NgbModalRef;
  objectives: any[] = [];

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
      objective_name: {
        title: 'Objective',
        type: 'string',
        width: '250px'
      },
      emp_name: {
        title: 'Employee',
        type: 'string',
        width: '150px'
      },
      emp_email: {
        title: 'Employee Email',
        type: 'string',
        width: '200px'
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
    this.getGoals('appraisal/all_emp_objectives');
  }

  getGoals(endpoint: string) {
    this.subs.sink = this.apiService.getResource(endpoint)
        .subscribe(
            res => {
              if (res['error'] === false) {
                const data = res['data'];
                this.objectives = data.map((item, index) => {
                  const container = {};

                  container['index'] = index + 1;
                  container['objective_id'] = item['objective_id'];
                  container['objective_name'] = item['objective_name'];
                  container['emp_id'] = item['emp_id'];
                  container['emp_name'] = item['employees']['emp_name'];
                  container['emp_email'] = item['employees']['emp_email'];
                  container['date_created'] = item['date_created'];

                  return container;
                });
              }
            }
        );
  }

  openModal(data?: any) {
    this.modalRef = this.modalService.open(CreateObjectiveComponent, { container: '.app' });
    if (data) {
      this.modalRef.componentInstance.title = 'Edit ' + data.objective_name;
      this.modalRef.componentInstance.formData = data;
    } else {
      this.modalRef.componentInstance.title = 'Create Objective';
    }
    this.modalRef.result.then((result) => {
      this.getGoals('appraisal/all_emp_objectives');
    }, (reason) => {
      console.log(`Dismissed ${this.globalService.getDismissedReason(reason)}`);
      this.getGoals('appraisal/all_emp_objectives');
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
