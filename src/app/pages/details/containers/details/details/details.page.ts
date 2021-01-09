import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/shared/state/app.reducer';
import { CityDailyWeather } from 'src/app/shared/models/weather.model';
import { Units } from 'src/app/shared/models/units.enum';
import * as fromDetailsActions from '../../../state/details.actions';
import * as fromDetailsSelectors from '../../../state/details.selectors';
import * as fromConfigSelectors from '../../../../../shared/state/config/config.selectors';
import { selecionar, enviar, } from '../../../state/details.actions';
import { WeatherService } from 'src/app/shared/services/weather.service';



@Component({
  selector: 'jv-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  count$: Observable<any>  
  
  teste2: String;
   
  
  details$: Observable<CityDailyWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  unit$: Observable<Units>;

  constructor(private store: Store<AppState>,private store1: Store<{ count: number }>, private WeatherService: WeatherService) {
    
  }

  ngOnInit() {
      
    
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());
    
    this.count$ = this.store.pipe(select(fromDetailsSelectors.selectOption));
    this.details$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsEntity));
    this.loading$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsLoading));
    this.error$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsError));
    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));

   
  }
  
  

  seleciona() {
  this.store.dispatch(selecionar());
   
 }

  enviar() {
   const descricao=["Polo Norte","Muito Frio", "Frio","Fresco","Calor", "Muito Calor","Calor Infernal","sem opnioes"]
  
   let aumentar=[0,0,0,0,0,0,0]
   this.count$.subscribe(  
   count => selecao = count);


    for(var i =0; i<aumentar.length; i++){
      if (selecao[1]==descricao[i]){ aumentar[i]=1;}
    
     }
  
   
     var selecao;
 
     this.store.dispatch(enviar());

     this.WeatherService.atualizar(selecao[2],aumentar[0],aumentar[1],aumentar[2],aumentar[3],aumentar[4],aumentar[5],aumentar[6]);
       aumentar=[0,0,0,0,0,0,0]
  
    }



}
  
