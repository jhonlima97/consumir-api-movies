import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/cartelera.interface';
import Swiper from 'swiper';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PosterPipe } from '../../pipes/poster.pipe';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css',
  imports: [CommonModule, PosterPipe, SlideshowComponent]

})
export class SlideshowComponent implements OnInit, AfterViewInit{

  @Input() movies?:Movie[];
  mySwiper?:Swiper;  
  constructor(private router:Router){}
  
  ngOnInit(): void {
    //console.log(this.movies);
  }
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper',{
      loop:true
    });
  }

  onSlidePrev(){
    this.mySwiper?.slidePrev();
  }

  onSlideNext(){
    this.mySwiper?.slideNext();
  }

  onMovieCLick(movie:Movie){
    this.router.navigate(['/movie', movie.id])

  }

}
