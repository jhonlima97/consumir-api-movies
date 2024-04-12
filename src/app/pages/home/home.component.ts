import { Component, HostListener, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/cartelera.interface';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { PosterPipe } from '../../pipes/poster.pipe';
import { MoviesPosterComponent } from "../../components/movies-poster/movies-poster.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    providers: [MoviesService],
    imports: [CommonModule, PosterPipe, SlideshowComponent, MoviesPosterComponent]
})
export class HomeComponent implements OnInit {

  movies:Movie[]=[];
  loadedMoviesIds = new Set<number>();

  @HostListener('window:scroll',['$event'])
  onScroll(){
  const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
  const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

  if (pos > max) {
  this.loadMoreMovies();
    
  }
}
  constructor(private _MService:MoviesService){
    this._MService.resetMoviePage();
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this._MService.getCartelera().subscribe(res=>{
      this.movies = res;
      this.updateLoadedMovieIds();
    })
  }

  loadMoreMovies(){
    this._MService.getCartelera().subscribe(res=>{
      const newMovies = res.filter(movie=>!this.loadedMoviesIds.has(movie.id));
      this.movies.push(...newMovies);
      this.updateLoadedMovieIds();
    }) 
  }

  updateLoadedMovieIds(){
    this.movies.forEach(movie=>this.loadedMoviesIds.add(movie.id));
  }

}
