import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-label-active',
  templateUrl: './label-active.component.html',
  styleUrls: ['./label-active.component.scss']
})
export class LabelActiveComponent implements  OnInit, ViewCell {
  label: any;
  labelClass: string;
  renderValue: string;
  @Input() value: any;
  @Input() rowData: any;

  constructor() {}
  ngOnInit(): void {
    if ( this.value === 1 || this.value === true || this.value === 'true' || this.value === 'TRUE') {
      this.label = 'Active';
      this.labelClass = 'badge badge-success mr-1';
    } else if (this.value === 0 || this.value === false || this.value === 'false' || this.value === 'FALSE') {
      this.label = 'Inactive';
      this.labelClass = 'badge badge-gray mr-1';
    } else {
      this.label = 'Not set';
      this.labelClass = 'badge badge-default mr-1';
    }
   this.renderValue = this.value.toString().toUpperCase();
  }
}
