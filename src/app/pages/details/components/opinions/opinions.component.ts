import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';




@Component({
  selector: 'jv-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.scss']
})
export class OpinionsComponent  {

  @Input() maisVotada: string;
  @Input() imgMaisVotada: string;
  @Input() imgSelecionada: string;
  @Input() Selecionada: string;
 
    
 
  
  
  constructor( ) {}
   
   

  }

   

  
