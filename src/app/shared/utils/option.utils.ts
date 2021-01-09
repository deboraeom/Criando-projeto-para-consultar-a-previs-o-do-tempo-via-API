


export const Option ={
    "id": 3470127,        
    "polonorte": 5,
    "muitofrio": 2,
    "frio": 1,
    "fresco": 0,
    "calor": 0,
    "muitoCarlor": 0,
   "calorInfernal": 0,
    /*ceuLimpo": 0,
    "nublado": 0,
    "deveChuver": 0,
    "chuviscando": 0,
    "chuvendo": 0,
    "ceuCaindo": 0,
    "trovejando": 0*/
  };

  export const Option2 ={
    "id": 3448439,        
    "polonorte": 0,
    "muitofrio": 0,
    "frio": 0,
    "fresco": 0,
    "calor": 0,
    "muitoCarlor": 0,
   "calorInfernal": 0,
    /*"ceuLimpo": 0,
    "nublado": 0,
    "deveChuver": 0,
    "chuviscando": 7,
    "chuvendo": 3,
    "ceuCaindo": 0,
    "trovejando": 0*/
};

export function retornindex(id):number {

    for(var i= 0; i<this.listadeOptio.length; i++){
     
        if(this.listadeOptio[i].id == id){ return i}

}


export function atualizar(id,pl, mf,f,fr,c,mc, ci):void{   
    this.Option2 ={
      "id": id,        
      "polonorte": pl,
      "muitofrio": mf,
      "frio": f,
      "fresco": fr,
      "calor": c,
      "muitoCarlor": mc,
     "calorInfernal": ci,
     /* "ceuLimpo": this.listadeOptio[i].ceuLimpo+0,
      "nublado": this.listadeOptio[i].nublado+0,
      "deveChuver": this.listadeOptio[i].deveChuver+0,
      "chuviscando": this.listadeOptio[i].chuviscando+0,
      "chuvendo": this.listadeOptio[i].chuvendo+0,
      "ceuCaindo": this.listadeOptio[i].ceuCaindo+0,
      "trovejando": this.listadeOptio[i].trovejando+0,} ;*/
   };
    
     for(var i= 0; i<this.listadeOptio.length; i++){
     
       if(this.listadeOptio[i].id == id){
        console.log("entrouaqui")
         this.Option2 ={
          "id": id,        
          "polonorte": this.listadeOptio[i].polonorte+pl,
          "muitofrio": this.listadeOptio[i].muitofrio+mf,
          "frio": this.listadeOptio[i].frio+f,
          "fresco": this.listadeOptio[i].fresco+fr,
          "calor": this.listadeOptio[i].calor+c,
          "muitoCarlor": this.listadeOptio[i].muitoCarlor+mc,
         "calorInfernal": this.listadeOptio[i].calorInfernal+ci,
          /*"ceuLimpo": this.listadeOptio[i].ceuLimpo+0,
          "nublado": this.listadeOptio[i].nublado+0,
          "deveChuver": this.listadeOptio[i].deveChuver+0,
          "chuviscando": this.listadeOptio[i].chuviscando+0,
          "chuvendo": this.listadeOptio[i].chuvendo+0,
          "ceuCaindo": this.listadeOptio[i].ceuCaindo+0,
          "trovejando": this.listadeOptio[i].trovejando+0,*/
          
        };
        //console.log(Optiontemp);
         
       }
       
    
   }
   
   this.listadeOptio=[...this.listadeOptio, this.Option2];
   //console.log(this.listadeOptio)
  }

  
  

 export function maisVot(id):number{

    //retorna o índice referente ao maior
    var num = 0;
    var index = 0;
    var max =0;
    
    for(var i= 0; i<this.listadeOptio.length; i++){
      if(this.listadeOptio[id]==id) index=i;
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
}