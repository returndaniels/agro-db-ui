import { Component, OnInit, Injectable } from '@angular/core';
import { TractorService } from "./services/tractors.service";
import { Tractor } from "./models/tractor.model";
import { OneSignal } from 'onesignal-ngx';

import  constants from "../assets/constants.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'agro-db-ui';
  tractors: Tractor[] | any;

  state: any = {};

  constructor(private service: TractorService, private oneSignal: OneSignal) {
    this.state = {}
    this.state.modalIsOpen = false;
    this.state.detailsIsOpen = false;
    this.state.modalMode = 'Criar';
    this.state.focusTractor = {}

    this.oneSignal.init({
      appId: constants.oneSignalAppId,
      notifyButton: {
          enable: true
      },
    });
   }

  ngOnInit(): void {
    this.service
        .getAll()
        .then(response => this.tractors = response)
        .catch(error => console.error(error))
  }

  submitNewTractor = (tractor: Tractor) => {
    this.service
        .create(tractor)
        .then(response => {
          const imageUrl = tractor.imageUrl || constants.defaultImageUrl
          this.tractors = [...this.tractors, {...tractor, imageUrl}];
          this.closeModal();
        })
        .catch(error => {
          console.error(error);
          alert("Falha ao criar novo trator.\n\n message: " + error.message);
        })
  }

  editTractor  = (tractor: any) => {
    this.service
        .update({ name: tractor.name, data: tractor })
        .then(response => {
          this.tractors = this.tractors.map((t: any) => {
            if (t._id === tractor._id) { t = tractor; }
            return t;
          })

          this.closeModal();
        })
        .catch(error => {
          console.error(error);
          alert("Falha ao editar trator.\n\n message: " + error.message);
        })
  }

  removeTractor = (id: any, name: string) => {
    this.service
      .delete({ name })
      .then(res => {
        this.tractors = this.tractors
          .filter((tractor: any) => tractor._id !== id )
      })
      .catch(error => {
        console.error(error);
        alert("Falha ao remover trator.\n\n message: " + error.message);
      })
  }

  openModal = (mode: string = 'c') => {
    this.state.modalIsOpen = true;
    this.state.modalMode = mode != 'c' ? 'Editar' : 'Criar';
  }
  
  closeModal = () => {
    this.state.modalIsOpen = false;
    this.state.focusTractor = {
      name: null,
      description: null,
      model: null,
      modelYear: null,
      value: null,
      imageUrl: null,
    };
  }
  
  openDetails = (tractor: Tractor) => {
    this.state.detailsIsOpen = true;
    this.state.focusTractor = tractor;
  }
  
  closeDetails = () => {
    this.state.detailsIsOpen = false;
    this.state.focusTractor = {
      name: null,
      description: null,
      model: null,
      modelYear: null,
      value: null,
      imageUrl: null,
    };
  }

  onEdit = (tractor: Tractor) => {
    this.state.focusTractor = tractor;
    this.openModal('e')
  }

  onRemove = (id: any, name: string) => {
    if (confirm(`Você está prestes a remover o trator ${name}, permanentemente.`)) {
      this.removeTractor(id, name);
    }
  }

  handleUploadSuccess = (event: any) => {
    this.state.focusTractor.imageUrl = event.url
  }

  handleUploadError = (event: any) => {
    alert('Falha no upload da imagem')
  }
}
