import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { VehicleModel } from '../_model/vehicle.model';
import { SlugifierService } from '../../core/_service/slugifier.service';
import { ConfigurationModel } from '../_model/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
      private http: HttpClient,
      private slugifier: SlugifierService
  ) { }

  public login(credentials: any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/authentication/login`, credentials);
  }

  public getConfiguration(params: any): ConfigurationModel {
      return JSON.parse(localStorage.getItem('stand_configuration'));
  }

  public setConfiguration(config: ConfigurationModel): void {
      localStorage.setItem('stand_configuration', JSON.stringify(config));
  }

  public getVehicles(parms: any): Observable<any> {
      return this.http.get(`${environment.apiUrl}/vehicule`).pipe(
          map((res: any[]) => res.map(
              ({_id, name, gammeName, visual}) =>
                  ({ _id, name, serie: gammeName, visual: `${environment.mediasBaseUrl}/${environment.imagesFolder}/${visual}` })
          ))
      );
  }

  public getAvailableModels(id: string): Observable<any> {
      return this.http.get<VehicleModel[]>(`${environment.apiUrl}/_model/findByVehiculeId/${id}`)
          .pipe(map(res => res.map(({_id, price, name}) => ({_id, price, name: this.slugifier.stripTag(name, '- ')}))));
  }

  public getOptions(params: any): Observable<any> {
      return of([
          /*{ _id: '123', name: 'Option 1', price: 100, checked: false },
          { _id: '124', name: 'Option 2', price: 1234, checked: false },
          { _id: '125', name: 'Option 3', price: 255, checked: false },
          { _id: '126', name: 'Option 4', price: 2900, checked: false },
          { _id: '127', name: 'Option 5', price: 100, checked: false },
          { _id: '128', name: 'Option 6', price: 300, checked: true },
          { _id: '129', name: 'Option 7', price: 100, checked: false },
          { _id: '130', name: 'Option 7', price: 345, checked: false },
          { _id: '131', name: 'Option 8', price: 100, checked: false },
          { _id: '132', name: 'Option 9', price: 326, checked: false },
          { _id: '133', name: 'Option 10', price: 22, checked: false }*/
      ]);
  }
}
