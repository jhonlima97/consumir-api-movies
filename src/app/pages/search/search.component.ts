import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesPosterComponent } from '../../components/movies-poster/movies-poster.component';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/cartelera.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  providers: [MoviesService],
  imports: [CommonModule, MoviesPosterComponent]

})
export class SearchComponent implements OnInit {
  texto ='';
  movies:Movie[]=[];
  noMovie='';

  constructor(private activatedRoute:ActivatedRoute, private _MService:MoviesService){}
  
  ngOnInit(){
    this.activatedRoute.params.subscribe(params=>{

    this.texto=params['texto'];
    console.log(this.texto)
    
    this._MService.searchPeliculas(this.texto).subscribe(movies=>{
      this.movies=movies;
      if(this.movies.length == 0){
        this.noMovie= '😌 No se encontro la pelicula';
      }
    })
    })
  }

}
