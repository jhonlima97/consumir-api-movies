import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'movie/:id', component:MovieComponent},
  {path:'search/:texto', component:SearchComponent},

  {path:'', pathMatch:'full', redirectTo:'/home'},
//{path:'**', redirectTo:'/home'},
  {path:'**', pathMatch:'full', redirectTo:'/home'},

];
