import { Action, createAction, props } from '@ngrx/store';

import { CityDailyWeather } from '../../../shared/models/weather.model';

export const loadWeatherDetails = createAction(
'[Details] Load Weather Details',
 
 );

export const loadWeatherDetailsSuccess = createAction(
  '[Details] Load Weather Details Success',
  props<{ entity: CityDailyWeather, option: any }>(),
  
);



export const loadWeatherDetailsFailed = createAction('[Details] Load Weather Details Failed');


export const selecionar = createAction('[usuario seleciona a temperatura] Seleciona');
export const enviar = createAction('[usuario envia escolhar] enviar');
