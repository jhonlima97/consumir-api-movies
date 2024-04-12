import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, PosterPipe
  ],
  exports:[PosterPipe]
})
export class PipesModule { }
