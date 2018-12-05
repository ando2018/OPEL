import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CategoryModel } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
      private http: HttpClient
  ) { }

  public login(credentials: any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/authentication/login`, credentials);
  }

  public getConfiguration(params: any): Observable<any> {
      return of({
          borneId: 'AZERTYUIOP',
          name: 'ADAM S'
      });
  }

  public getCategories(parms: any): Observable<CategoryModel[]> {
      return of([
          {
              _id: 'AZER12',
              name: 'ADAM CROSS',
              serie: 'ADAM',
              visual: 'assets/img/default.png',
              equipments: {
                  inside: [
                      'Climatisation automatique bi-zone',
                      'Ordinateur de bord',
                      'Accoudoir Central AV'
                  ],
                  outside: [
                      'Caméra Opel Eye'
                  ]
              }
          },
          {
              _id: 'AZER13',
              name: 'ADAM 5',
              serie: 'ADAM',
              visual: 'assets/img/default.png',
              equipments: {
                  inside: [
                      'Climatisation automatique bi-zone',
                      'Ordinateur de bord',
                      'Accoudoir Central AV'
                  ],
                  outside: [
                      'Caméra Opel Eye'
                  ]
              }
          },
          {
              _id: 'AZER14',
              name: 'ADAM S',
              serie: 'ADAM',
              visual: 'assets/img/default.png',
              equipments: {
                  inside: [
                      'Climatisation automatique bi-zone',
                      'Ordinateur de bord',
                      'Accoudoir Central AV'
                  ],
                  outside: [
                      'Caméra Opel Eye'
                  ]
              }
          },
          {
              _id: 'AZER15',
              name: 'ASTRA 4 PORTES',
              serie: 'ASTRA',
              visual: 'assets/img/default.png',
              equipments: {
                  inside: [
                      'Climatisation automatique bi-zone',
                      'Ordinateur de bord',
                      'Accoudoir Central AV'
                  ],
                  outside: [
                      'Caméra Opel Eye'
                  ]
              }
          },
          {
              _id: 'AZER15',
              name: 'ASTRA SPORT TOURER',
              serie: 'ASTRA',
              visual: 'assets/img/default.png',
              equipments: {
                  inside: [
                      'Climatisation automatique bi-zone',
                      'Ordinateur de bord',
                      'Accoudoir Central AV'
                  ],
                  outside: [
                      'Caméra Opel Eye'
                  ]
              }
          }
      ]);
  }

  public getAvailableModels(params: any): Observable<any> {
      return of([
          'D1.4 XEL, 64kW (90hp), MT5 & S/S, Manuelle - 5 vitesses, UNLIMITED',
          '1.4 Twinport 87ch Start/Stop Easytronic 3.0, Robotisée - 5 vitesses, GLAM',
          '1.4 Turbo 150ch, Manuelle - 6 vitesses, S',
          'D1.4 XEL, 64kW (90hp), MT5 & S/S, Manuelle - 5 vitesses, GLAM',
          '1.0 Direct Injection Turbo 115ch, Manuelle - 6 vitesses, UNLIMITED',
          '1.4 Twinport 87ch Start/Stop Easytronic 3.0, Robotisée - 5 vitesses, UNLIMITED',
          '1.0 Direct Injection Turbo 115ch, Manuelle - 6 vitesses, GLAM'
      ]);
  }

  public getOptions(params: any): Observable<any> {
      return of({ message: 'Non spécifiée' });
  }
}
