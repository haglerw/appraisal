import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-description-control',
  templateUrl: './description-control.component.html',
  styleUrls: ['./description-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DescriptionControlComponent ),
      multi: true
    }
  ]
})
export class DescriptionControlComponent implements ControlValueAccessor, OnInit {

  value: string;
  config: any;
  onChange: (_: any) => void;
  onTouched: () => void;

  constructor() {
    this.config = {
      allowedContent: false,
      uiColor: '#F0F3F4',
      height: '200',
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value ? value : '';
  }

}
