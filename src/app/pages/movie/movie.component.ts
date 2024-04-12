import { Component, OnInit } from '@angular/core';
import { CastSlideShowComponent } from '../../components/cast-slide-show/cast-slide-show.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { combineLatest } from 'rxjs';
import { Cast } from '../../interfaces/credits.interface';
import { MovieDetails } from '../../interfaces/details.interface';
import { PosterPipe } from "../../pipes/poster.pipe";

@Component({
    selector: 'app-movie',
    standalone: true,
    templateUrl: './movie.component.html',
    styleUrl: './movie.component.css',
    providers: [MoviesService],
    imports: [CommonModule, PosterPipe,CastSlideShowComponent]
})
export class MovieComponent implements OnInit {
  pelicula?:MovieDetails;
  cast : Cast[] =[];
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private _mService:MoviesService
  ){}
  
  ngOnInit() {
    const {id} = this.activatedRoute.snapshot.params;

    combineLatest([

      this._mService.peliculaDetalle(id),
      this._mService.peliculaCreditos(id)

    ]).subscribe(([movie,cast])=>{

      if (movie === null || cast === null) {
        console.error('Error: La pelicula o el reparto no se encontraron');
        return;
      }

      this.pelicula= movie;
      this.cast = cast;
    })
  }

  getStars(voteAverage:number){
    const starsCount = Math.floor(voteAverage);
    return Array(starsCount).fill(0);
  }
  regresar(){
    window.history.back();
  }

}
