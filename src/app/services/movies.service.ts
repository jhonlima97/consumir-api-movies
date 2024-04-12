import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera.interface';
import { MovieDetails } from '../interfaces/details.interface';
import { Cast, Credits } from '../interfaces/credits.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  private url = "https://api.themoviedb.org/3";
  private apikey ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGY1OTQyYmNiODYwNWU4ZGFhOTMyYmNkMTZhNzYxYyIsInN1YiI6IjY2MTgxYjkyZDE5YTMzMDE3ZDc2OGY4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EWeLTkgkz44h5H99PXkvstsqZ0BDXyMF-xxoP-lxuBs";
  private headers={Authorization:`Bearer ${this.apikey}`};
  private cartelePage = 1;
  public cargando = false;

    getCartelera():Observable<Movie[]>{
      if (this.cargando) {
        return of([]);  //Carga el arreglo vacio si ya esta cargado
      }

      this.cargando = true;
  
      return this.http.get<CarteleraResponse>(`${this.url}/movie/now_playing?language=es-ES&page=${this.cartelePage}`,{headers:this.headers}).pipe(
        map((response:any)=> response.results),
        tap(()=>{
          this.cartelePage+=1;
          this.cargando=false;
        })
      )
    }

    searchPeliculas(texto:string):Observable<Movie[]>{
      return this.http.get<CarteleraResponse>(`${this.url}/search/movie?query=${texto}&language=es-ES&page=1`,{headers:this.headers}).pipe(
        map(res=>res.results)
      )
    }
  
    peliculaDetalle(id:string){
      return this.http.get<MovieDetails>(`${this.url}/movie/${id}?language=es-ES`,{headers:this.headers}).pipe(
        catchError(err=> of(null))  
      )
  
    }
  
    peliculaCreditos(id:string):Observable<Cast[] | null>{
      return this.http.get<Credits>(`${this.url}/movie/${id}/credits?language=es-ES`,{headers:this.headers}).pipe(
        map(res=>res.cast),
        catchError(err=> of(null))
      )  
    }

    resetMoviePage(){
      this.cartelePage = 1;
    }

}
