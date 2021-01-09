import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { responseToCityWeather, responseToCityDailyWeather } from '../utils/response.utils';
import { CityWeather, CityDailyWeather } from '../models/weather.model';
import { AppState } from '../state/app.reducer';
import { Units } from '../models/units.enum';
import * as fromConfigSelectors from '../state/config/config.selectors';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnDestroy {

  private unit: Units;

  private serviceDestroyed$ = new Subject();

  Option ={
    "id": 3470127,        
    "polonorte": 5,
    "muitofrio": 2,
    "frio": 1,
    "fresco": 8,
    "calor": 0,
    "muitoCarlor": 0,
   "calorInfernal": 0,
   "indexmax": 7
     };

  Option2 ={
    "id": 3448439,        
    "polonorte": 0,
    "muitofrio": 0,
    "frio": 0,
    "fresco": 0,
    "calor": 0,
    "muitoCarlor": 7,
   "calorInfernal": 0,   
   "indexmax": 7
};
  listadeOptio=[this.Option, this.Option2];









  constructor(private http: HttpClient,
              private store: Store<AppState>) {
    store
      .pipe(
        select(fromConfigSelectors.selectUnitConfig),
        takeUntil(this.serviceDestroyed$),
      )
      .subscribe((unit: Units) => this.unit = unit);
  }

  ngOnDestroy() {
    this.serviceDestroyed$.next();
    this.serviceDestroyed$.unsubscribe();
  }

  getCityWeatherByQuery(query: string): Observable<CityWeather> {
    const params = new HttpParams({ fromObject: { q: query } });
    return this.doGet<any>('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getCityWeatherById(id: string): Observable<CityWeather> {
    const params = new HttpParams({fromObject: {id}});
    return this.doGet<any>('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getCityWeatherByCoord(lat: number, lon: number): Observable<CityWeather> {
    const params = new HttpParams({fromObject: {
      lat: lat.toString(),
      lon: lon.toString(),
    }});
    return this.doGet<any>('weather', params)
      .pipe(map(response => responseToCityWeather(response)));
  }

  getWeatherDetails(lat: number, lon: number): Observable<CityDailyWeather> {
    const params = new HttpParams({fromObject: {
      lat: lat.toString(),
      lon: lon.toString(),
      exclude: 'minutely,hourly',
    }});
    return this.doGet<any>('onecall', params)
      .pipe(map(response => responseToCityDailyWeather(response)));
  }
  

    getInitialOpnio(id: number):any{
      this.Option2 ={
        "id": id,        
        "polonorte": 0,
        "muitofrio": 0,
        "frio": 0,
        "fresco": 0,
        "calor": 0,
        "muitoCarlor": 0,
       "calorInfernal": 0,
       "indexmax": 7
       };
      for(var i= 0; i<this.listadeOptio.length; i++){
           
         if(this.listadeOptio[i].id == id){
          
          this.listadeOptio[i].indexmax= this.maisVot(this.listadeOptio[i].id);
          

          this.Option2= this.listadeOptio[i]; 
        console.log(this.Option2)}}
        return this.Option2 
   }
     
 


   maisVot(id):number{

    
    var num = 0;
    var index = 0;
    var max =0;
    
    for(var i= 0; i<this.listadeOptio.length; i++){
      if(this.listadeOptio[i].id==id) index=i;
    }

     if(num < this.listadeOptio[index].polonorte){

      num=this.listadeOptio[index].polonorte;
      max = 0;
     }
     if(num< this.listadeOptio[index].muitofrio){
      num=this.listadeOptio[index].muitofrio;
      max = 1;
    }
    if(num<this.listadeOptio[index].frio){
      num=this.listadeOptio[index].frio;
      max = 2;
    }
    if(num<this.listadeOptio[index].fresco){
      num=this.listadeOptio[index].fresco;
      max = 3;
    }
    if(num<this.listadeOptio[index].calor){
      num=this.listadeOptio[index].calor;
      max = 4;
    }
    if(num<this.listadeOptio[index].muitoCarlor){
      num=this.listadeOptio[index].muitoCarlor;
      max = 5;
    }
    if(num<this.listadeOptio[index].calorInfernal){
      num=this.listadeOptio[index].calorInfernal;
      max = 6;
    }
    return max;
  

  }

  atualizar(id,pl, mf,f,fr,c,mc, ci){   
    var bool = true;

    
    this.Option2 ={
      "id": id,        
      "polonorte": pl,
      "muitofrio": mf,
      "frio": f,
      "fresco": fr,
      "calor": c,
      "muitoCarlor": mc,
     "calorInfernal": ci,
     "indexmax": 7,
     };
    
     for(var i= 0; i<this.listadeOptio.length; i++){
       
       if(this.listadeOptio[i].id == id){
        
         this.Option2 ={
          "id": id,        
          "polonorte": this.listadeOptio[i].polonorte+pl,
          "muitofrio": this.listadeOptio[i].muitofrio+mf,
          "frio": this.listadeOptio[i].frio+f,
          "fresco": this.listadeOptio[i].fresco+fr,
          "calor": this.listadeOptio[i].calor+c,
          "muitoCarlor": this.listadeOptio[i].muitoCarlor+mc,
         "calorInfernal": this.listadeOptio[i].calorInfernal+ci,
         "indexmax":  this.listadeOptio[i].indexmax,
        
         
        };
        bool=false;
        this.listadeOptio[i]= this.Option2;
        
       }
       
    
   }
   if (bool)  this.listadeOptio=[...this.listadeOptio, this.Option2];
 
  }



























  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    params = params.append('appid', environment.apiKey);
    params = params.append('lang', 'pt_br');
    if (this.unit !== Units.SI) {
      params = params.append('units', this.unit.toLocaleLowerCase());
    }
    return this.http.get<T>(`https://api.openweathermap.org/data/2.5/${ url }`, { params });
  }
 


}
