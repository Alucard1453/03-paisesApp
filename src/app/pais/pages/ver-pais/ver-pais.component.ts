import { Country } from './../../interfaces/pais.interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
//switchMap permite recibir un observable y regresar un observable
//tap es un operador que dispara un evento secundario

import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit{

  pais!: Country;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService 
    ){ }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.paisService.getPaisPorCodigo( id ) ),
        tap( console.log )
        //tap( resp => console.log(resp) )
      )
      .subscribe( pais => {
        this.pais = pais;
      });

    // this.activatedRoute.params
    //   .subscribe( ({id}) => {
    //     console.log(id);
        
    //     this.paisService.getPaisPorCodigo( id )
    //       .subscribe( pais => {
    //         console.log(pais);
            
    //       });

    //   })    
  }

}
