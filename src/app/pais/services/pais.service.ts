import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v2';

  constructor(private http: HttpClient) { }

  buscarPais( termino:string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ termino }`;

    return this.http.get<Country[]>( url );

    // return this.http
    //   .get( url )
    //   .pipe(
    //     catchError( err => of([]))
    //   );
    // Es posible manejar errores con pipe, of() convierte al objeto en un observable
  }

  buscarCapital( termino:string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ termino }`;
    return this.http.get<Country[]>( url );
  }

  getPaisPorCodigo( id:string ): Observable<Country>{
    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this.http.get<Country>( url );
  }
  
}
