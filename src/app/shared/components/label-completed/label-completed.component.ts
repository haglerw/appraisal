import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-label-completed',
  templateUrl: './label-completed.component.html',
  styleUrls: ['./label-completed.component.scss']
})
export class LabelCompletedComponent implements OnInit, ViewCell {
  label: any;
  labelClass: string;
  renderValue: string;
  @Input() value: any;
  @Input() rowData: any;
  constructor() { }

  ngOnInit() {
    if ( this.value === 1 ) {
      this.label = 'In Progress';
      this.labelClass = 'badge badge-primary mr-1';
    } else if (this.value === 2 ) {
      this.label = 'Completed';
      this.labelClass = 'badge badge-warning mr-1';
    } else {
      this.label = 'Not set';
      this.labelClass = 'badge badge-default mr-1';
    }
   this.renderValue = this.value.toString().toUpperCase();
  }

}
