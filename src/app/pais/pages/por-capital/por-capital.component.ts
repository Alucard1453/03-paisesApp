import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService){ }

  buscar( termino: string){
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);

    this.paisService.buscarCapital( this.termino )
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

}
