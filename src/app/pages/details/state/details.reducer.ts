import { createReducer, Action, on } from '@ngrx/store';

import * as fromDetailsActions from './details.actions';
import {  enviar, selecionar } from './details.actions';
import { CityDailyWeather } from 'src/app/shared/models/weather.model';


export const imgsrc =["assets/img/frio3.JPG","assets/img/frio2.JPG","assets/img/frio1.JPG",
   "assets/img/normal.JPG","assets/img/calor1.JPG","assets/img/calor2.JPG","assets/img/calor3.JPG",
   "assets/img/nuvem1.JPG","assets/img/nuvem2.JPG","assets/img/nuvem3.JPG","assets/img/nuvem4.JPG",
   "assets/img/nuvem5.JPG","assets/img/nuvem6.JPG","assets/img/nuvem7.JPG"]


   
export const descricao=["Polo Norte","Muito Frio", "Frio","Fresco","Calor", "Muito Calor","Calor Infernal","sem opnioes"]
//NAO ESQUERCER: atualizar isso com base na array acima
 


export interface DetailsState {
  entity: CityDailyWeather;
  loading: boolean;
  error: boolean;  


  count: number,
  id: number,
  
  chosed: string,
  imgChosed: string,
  maisVotado: string,
  
  imgmaisVotado: string,
  polonorte: any[],
  muitofrio: any[],
  frio: any[],
  fresco: any[],
  calor: any[],
  muitoCarlor: any[],
  calorInfernal: any[],
  ceuLimpo: any[],
  nublado: any[],
  deveChuver: any[],
  chuviscando: any[],
  chuvendo: any[],
  ceuCaindo: any[],
  trovejando: any[],
}



export const detailsInitialState: DetailsState = {
  entity: undefined,
  loading: false,
  error: false,

  count: 0,
  id: 0,

  chosed: "Não escolhido",
  imgChosed: "assets/img/normal.JPG",
  maisVotado: "Não escolhido",
  imgmaisVotado: "assets/img/normal.JPG",
 
  polonorte: [descricao[0], 0, imgsrc[0]],
  muitofrio: [descricao[1], 0,imgsrc[1]],
  frio: [descricao[2], 0,imgsrc[2]],
  fresco: [descricao[3], 0,imgsrc[3]],
  calor: [descricao[4], 0,imgsrc[4]],
  muitoCarlor: [descricao[5], 0,imgsrc[5]],
  calorInfernal: [descricao[6], 0,imgsrc[6]],
  ceuLimpo: ["Ceu limpo", 0, "assets/img/nuvem1.JPG"],
  nublado: ["Nublado", 0,"assets/img/nuvem2.JPG"],
  deveChuver: ["Deve Chuver", 0,"assets/img/nuvem3.JPG"],
  chuviscando: ["Chuviscando", 0,"assets/img/nuvem4.JPG"],
  chuvendo: ["Chuvendo", 0,"assets/img/nuvem5.JPG"],
  ceuCaindo: ["Ceu vai Cair", 0,"assets/img/nuvem6.JPG"],
  trovejando: ["Trovejando muito", 0,"assets/img/nuvem7.JPG"],
};

const reducer = createReducer(
  detailsInitialState,
  on(fromDetailsActions.loadWeatherDetails, state => ({
    ...state,
    entity: undefined,
    loading: true,
    error: false,
  })),
  on(fromDetailsActions.loadWeatherDetailsSuccess, (state, { entity,option }) => ({
    ...state,
    entity,
    loading: false,
    id: printaid(entity.city.id),
    polonorte: [descricao[0], option.polonorte, imgsrc[0]], 
    muitofrio:  [descricao[1], option.muitofrio, imgsrc[1]],
    frio:  [descricao[2], option.frio, imgsrc[2]],
    fresco:  [descricao[3], option.fresco, imgsrc[3]],
    calor:  [descricao[4], option.calor, imgsrc[4]],
    muitoCarlor:  [descricao[5], option.muitoCarlor, imgsrc[5]],
    calorInfernal:  [descricao[6], option.calorInfernal, imgsrc[6]],
    maisVotado: descricao[option.indexmax],
    imgmaisVotado: imgsrc[option.indexmax]
    

   
    
    
  })),
  on(fromDetailsActions.loadWeatherDetailsFailed, state => ({
    ...state,
    loading: false,
    error: true,
  })),

  on(selecionar, (state) => ({
    ...state,  
    chosed: descricao[seleciona(state.chosed)],
    imgChosed: imgsrc[seleciona(state.chosed)],    
        
  })),
  on(enviar, (state) => ({
    ...state,  
    
    polonorte :[state.polonorte[0],adiciona(state.chosed, state.polonorte) ,state.polonorte[2]] ,
    muitofrio : [state.muitofrio[0], adiciona(state.chosed, state.muitofrio) ,state.muitofrio[2]] ,
    frio: [state.frio[0], adiciona(state.chosed, state.frio) ,state.frio[2]],
    fresco : [state.fresco[0], adiciona(state.chosed, state.fresco) ,state.fresco[2]],
    calor : [state.calor[0],adiciona(state.chosed, state.calor) , state.calor[2]] ,
    muitoCarlor : [state.muitoCarlor[0], adiciona(state.chosed, state.muitoCarlor) ,state.muitoCarlor[2]] ,
    calorInfernal : [state.calorInfernal[0], adiciona(state.chosed, state.calorInfernal) ,state.calorInfernal[2]],
    maisVotado: maisVot(state.polonorte, state.muitofrio, state.frio,state.fresco, state.calor, state.muitoCarlor,
    state.calorInfernal, state.maisVotado,state.imgmaisVotado)[0],
    imgmaisVotado: maisVot(state.polonorte, state.muitofrio, state.frio,state.fresco, state.calor, state.muitoCarlor,
     state.calorInfernal, state.maisVotado,state.imgmaisVotado)[1]
        
  })),
);

export function detailsReducer(state: DetailsState | undefined, action: Action): DetailsState {
  return reducer(state, action);}

function printaid(id){
  
    return id

}
   

   function adiciona(s, q){
     var quant =q[1];
    
     if(s==q[0]) {quant= quant+1};
    
     return quant;
     
   }
 
   
 export function receber(city){
    this.city= city;
  
  }


  function seleciona(s){
    
      let sensationS =0;
      
    switch (s) {
      case "Polo Norte":  {
        sensationS=1;
       break;}
      
      case "Muito Frio":  {
        sensationS=2;
       break;}
  
      case "Frio":  {
        sensationS=3;
       break;}

      case "Fresco": { 
        sensationS=4;
        break;}
              
      case  "Calor":  {
        sensationS=5;
       break;}
  
      case "Muito Calor": { 
        sensationS=6;
       break;}
  
      case "Calor Infernal":  {
        sensationS=0;
        break;}
     
      default:{
        sensationS=0;
        break;}
      }
      return sensationS;
    }

  
    function maisVot(pl, mf,f,fr,c,mc, ci, chosed, imgchosed) {

      
      let num = 0;
      
      let max =[chosed, imgchosed];
      
      
      console.log("antes max"+ max);
       if(num < pl[1]){
        num=pl[1];
        max = [pl[0],pl[2]];
       }
       if(num < mf[1]){
        num=mf[1];
        max = [mf[0],mf[2]];
       }

       if(num < f[1]){
        num=f[1];
        max = [f[0],f[2]];
       }
  
       if(num < fr[1]){
        num=fr[1];
        max = [fr[0],fr[2]];
       }

       if(num < c[1]){
        num=c[1];
        max = [c[0],c[2]];
       }

       if(num < mc[1]){
        num=mc[1];
        max = [mc[0],mc[2]];
       }

       if(num < ci[1]){
        num=ci[1];
        max = [ci[0],ci[2]];
       }

       console.log("depois max" +max)
      
      return max;
    
  
    }


  










