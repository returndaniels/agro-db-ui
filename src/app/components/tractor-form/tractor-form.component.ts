import { Component, Input, OnInit } from '@angular/core';
import { Tractor } from 'src/app/models/tractor.model';

@Component({
  selector: 'app-tractor-form',
  templateUrl: './tractor-form.component.html',
  styleUrls: ['./tractor-form.component.css']
})
export class TractorFormComponent implements OnInit {

  @Input() tractor: Tractor | undefined;
  @Input() mode: string = 'Criar';
  @Input() submitNewTractor: Function = () => {};
  @Input() editTractor: Function = () => {};
  @Input() closeModal: Function = () => {};
  @Input() handleUploadSuccess: Function = () => {};
  @Input() handleUploadError: Function = () => {};
  
  private name: string | null | undefined;
  private description: string | null | undefined;
  private imageUrl: string | null | undefined;
  private model: string | null | undefined;
  private modelYear: Date | string | Number | null | undefined;
  private value: string | number | null | undefined;

  imageName: string

  constructor() {
    this.imageName = this.getNowTime().toString() + '.jpeg'
  }

  ngOnInit(): void {
      if(this.tractor) {
        this.name = this.tractor.name || null;
        this.description = this.tractor.description || null;
        this.imageUrl = this.tractor.imageUrl || null;
        this.model = this.tractor.model || null;
        this.modelYear = this.tractor.modelYear?.toString()?.slice(0, 4) || null;
        this.value = this.tractor.value || null;
      }
  }
  
  setName = (value: string) => {
    this.name = value;
  }

  setDescription = (value: string) => {
    this.description = value;
  }

  setModel = (value: string) => {
    this.model = value;
  }

  setModelYear = (value: string | number) => {
    this.modelYear = value;
  }

  setPrice = (value: string | number) => {
    this.value = value;
  }

  setImageUrl = (value: string) => {
    this.imageUrl = value;
  }

  getName = () => {
    return this.name;
  }

  getDescription = () => {
    return this.description;
  }

  getModel = () => {
    return this.model;
  }

  getModelYear = () => {
    return this.modelYear;
  }

  getPrice = () => {
    return this.value;
  }

  getImageUrl = () => {
    return this.imageUrl;
  }

  submit = (event : any) => {
    event.stopPropagation();
    
    if(this.mode !== 'Editar') {
      this.submitNewTractor({
        ...this.tractor,
        name: this.name,
        description: this.description,
        imageUrl: this.imageUrl,
        model: this.model,
        modelYear: this.modelYear,
        value: this.value,
      })
    } else {
      this.editTractor({
        ...this.tractor,
        name: this.name,
        description: this.description,
        imageUrl: this.imageUrl,
        model: this.model,
        modelYear: this.modelYear,
        value: this.value,
      })
    }
  }

  onUploadSuccess = (event: any) => {
    this.imageUrl = event.url;
    this.handleUploadSuccess(event);
  }

  getNowTime = () => {
    const now = new Date();
    return now.getTime();
  }
}
