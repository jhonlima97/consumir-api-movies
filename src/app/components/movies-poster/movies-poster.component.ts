import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/cartelera.interface';
import { Router } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { PosterPipe } from "../../pipes/poster.pipe";

@Component({
    selector: 'app-movies-poster',
    standalone: true,
    templateUrl: './movies-poster.component.html',
    styleUrl: './movies-poster.component.css',
    imports: [CommonModule, PipesModule, PosterPipe]
})
export class MoviesPosterComponent {

  @Input() movies?:Movie[];

  constructor(private router:Router){}

  getStars(voteAverage:number){
    const starsCount = Math.floor(voteAverage);
    return Array(starsCount).fill(0);
  }

  onMovieCLick(movie:Movie){
    this.router.navigate(['/movie', movie.id])
  }

}
