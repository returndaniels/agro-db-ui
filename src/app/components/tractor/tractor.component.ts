import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tractor',
  templateUrl: './tractor.component.html',
  styleUrls: ['./tractor.component.css']
})
export class TractorComponent implements OnInit {

  @Input() tractor: any | undefined;
  @Input() openDetails: Function = () => {};
  @Input() onEdit: Function = () => {};
  @Input() onRemove: Function = () => {};

  name: string | undefined;
  model: string | undefined;
  modelYear: Number | undefined;
  value: string | number | undefined;

  ngOnInit() {
    this.name = this.tractor.name
    this.model = this.tractor.model
    this.modelYear = new Date(this.tractor.modelYear).getUTCFullYear()
    this.value = this.tractor.value
  }
}
