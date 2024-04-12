import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CastSlideShowComponent } from './components/cast-slide-show/cast-slide-show.component';
import { MoviesPosterComponent } from './components/movies-poster/movies-poster.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { PipesModule } from './pipes/pipes.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet, HttpClientModule, PipesModule,
    //app/components
    CastSlideShowComponent, 
    MoviesPosterComponent, 
    NavbarComponent, 
    ScrollToTopComponent,
    SlideshowComponent]

})
export class AppComponent {
  title = 'MOVIES.NET';
}
