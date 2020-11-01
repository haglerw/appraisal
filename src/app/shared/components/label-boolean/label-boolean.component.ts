import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-label-boolean',
  templateUrl: './label-boolean.component.html',
  styleUrls: ['./label-boolean.component.scss']
})
export class LabelBooleanComponent implements OnInit, ViewCell {
  label: any;
  labelClass: string;
  renderValue: string;
  @Input() value: any;
  @Input() rowData: any;

  constructor() {}
  ngOnInit(): void {
    if ( this.value === 1 || this.value === true || this.value === 'true' || this.value === 'TRUE' || this.value === 'True') {
      this.label = 'Yes';
      this.labelClass = 'badge badge-success mr-1';
    } else if (this.value === 0 || this.value === false || this.value === 'false' || this.value === 'FALSE' || this.value === 'False') {
      this.label = 'No';
      this.labelClass = 'badge badge-danger mr-1';
    } else {
      this.label = 'Not set';
      this.labelClass = 'badge badge-default mr-1';
    }
   this.renderValue = this.value.toString().toUpperCase();
  }

}
