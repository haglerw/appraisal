import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ApiService, AuthService, GlobalService} from '../../../shared/services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-objective',
  templateUrl: './create-objective.component.html',
  styleUrls: ['./create-objective.component.scss']
})
export class CreateObjectiveComponent implements OnDestroy, OnInit {
  private subs = new SubSink();

  @Input() title;
  @Input() formData;
  reviews: any[] = [];
  button: string;
  loading = false;
  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private toastr: ToastrService,
      private apiService: ApiService,
      private authService: AuthService,
      private globalService: GlobalService,
      private activeModal: NgbActiveModal,
  ) {
    this.subs.sink = apiService.getResource('appraisal/all_reviews')
        .subscribe(res => this.reviews = res['data']);
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      reviewid: [null, Validators.compose([Validators.required])],
    });

    if (this.formData) {
      this.button = 'Edit Employee Objective';
      this.form.patchValue({
        name: this.formData.name
      });
    } else {
      this.button = 'Create Employee Objective';
    }
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  addEmployeeObjective(objective: any) {
    this.loading = true;
    this.subs.sink = this.apiService.postRequest('appraisal/add_emp_objective', objective)
        .subscribe(res => {
          if (res['error'] === false) {
            this.loading = false;
            this.closeModal();
            this.toastr.success(res['message']);
          } else if (res['error'] === true) {
            this.loading = false;
            this.toastr.error(res['message']);
          }
        });
  }

  onSubmit(objective: any) {
    objective.reviewid = +objective.reviewid;
    this.addEmployeeObjective(objective);
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
