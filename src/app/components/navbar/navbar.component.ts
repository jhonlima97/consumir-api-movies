import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  providers: [MoviesService],
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router){}  
  ngOnInit(): void {
    
  }

  searchPelicula(texto:string){
    texto = texto.trim();
    if (texto.length === 0) {
      return;
    }

    this.router.navigate(['/search', texto]);
  }

}
