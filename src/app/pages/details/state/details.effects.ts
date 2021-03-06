import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { AppState } from 'src/app/shared/state/app.reducer';
import { WeatherService } from 'src/app/shared/services/weather.service';
import * as fromDetailsActions from './details.actions';
import * as fromRouterSelectors from '../../../shared/state/router/router.selectors';


@Injectable()
export class DetailsEffects {

  loadCurrentWeather$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromDetailsActions.loadWeatherDetails),
      withLatestFrom(this.store.pipe(select(fromRouterSelectors.selectRouterQueryParams))),
      mergeMap(([, queryParams]: [any, Params]) =>
        combineLatest([
          this.weatherService.getCityWeatherByCoord(queryParams.lat, queryParams.lon),
          this.weatherService.getWeatherDetails(queryParams.lat, queryParams.lon),
        ])
      ),
      catchError((err, caught$) => {
        this.store.dispatch(fromDetailsActions.loadWeatherDetailsFailed());
        return caught$;
      }),
      map(([current, daily]) => {
        const entity = daily;
        
        entity.city = {...current.city, timeZone: daily.city.timeZone};
        
        let id = current.city.id;
        let option =this.weatherService.getInitialOpnio(id);
        
        
        
        return fromDetailsActions.loadWeatherDetailsSuccess({ entity, option }) 
      }),
    )
  
  );

  

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private weatherService: WeatherService) {
  }
}
