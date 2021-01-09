import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DetailsPage } from './containers/details/details/details.page';
import { DetailsGuard } from './services/details.guard';
import { detailsReducer} from './state/details.reducer';


import { DetailsEffects } from './state/details.effects';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DailyWeatherComponent } from './components/daily-weather.component';
import { OpinionsComponent } from './components/opinions/opinions.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DetailsPage, canActivate: [DetailsGuard] },
    ]),
    StoreModule.forFeature('details', detailsReducer),    
    EffectsModule.forFeature([DetailsEffects]),
    ComponentsModule,
    
    
  ],
  
  exports: [
    OpinionsComponent
  ],
  declarations: [
    DetailsPage,
    DailyWeatherComponent,
    OpinionsComponent
    
  ],

  providers: [
    DetailsGuard,
    
  ],
})
export class DetailsModule {
}
