import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ApiService, AuthService, GlobalService} from '../../../shared/services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.scss']
})
export class CreateGoalComponent implements OnDestroy, OnInit {
  private subs = new SubSink();

  @Input() title;
  @Input() formData;
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
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])]
    });

    if (this.formData) {
      this.button = 'Edit Goal';
      this.form.patchValue({
        name: this.formData.name
      });
    } else {
      this.button = 'Create Goal';
    }
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  addOrgGoal(goal: any) {
    this.loading = true;
    this.subs.sink = this.apiService.postRequest('appraisal/add_org_goal', goal)
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

  onSubmit(goal: any) {
    this.addOrgGoal(goal);
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
