import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
      li{
        cursor: pointer;
      }
  `]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService){ }

  buscar( termino: string){
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);

    this.paisService.buscarPais( this.termino )
      .subscribe({
        next: ((paises) => {
          this.paises = paises;
          console.log(paises);
        }),
        error: ((err) => {
          this.hayError = true;
          this.paises = [];
          console.log('hay error');
        }),
        complete: () => console.log('completo')
      });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
      .subscribe({
        next: ((paises) => { 
          this.paisesSugeridos = paises.splice(0,5) 
        }),
        error: ((err) => {
          this.paisesSugeridos = [];
        }),
      });
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }

}
