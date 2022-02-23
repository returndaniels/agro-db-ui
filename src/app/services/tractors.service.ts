import { Injectable } from '@angular/core';
import { Tractor } from '../models/tractor.model';
import { read, create, update, remove } from "../utils/apiHandler";

const baseUrl = 'https://agro-db-backend.herokuapp.com/tractors/';

@Injectable({
  providedIn: 'root'
})
export class TractorService {

  constructor() { }

  async getAll(): Promise<Tractor[] | any> {
    return await read(baseUrl);
  }

  async create(data: any): Promise<Tractor> {
    return await create(baseUrl, data);
  }

  async update(data: any): Promise<Tractor> {
    return await update(baseUrl, data);
  }

  async delete(data: any): Promise<any> {
    return await remove(baseUrl, data);
  }
}
