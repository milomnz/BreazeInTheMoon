import { Component, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AboutComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  isScrolled = false;
  
  
  scrollThreshold: number = 50;
  
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    
    this.updateNavbarState();
    
    // Log para depuración
    console.log('NavbarComponent inicializado');
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    // Log para depuración
    this.updateNavbarState();
  }


  private updateNavbarState(): void {
    // Usar document.getElementById como alternativa más robusta
    const navbar = document.getElementById('navbar');
    
    if (!navbar) {
      console.error('No se pudo encontrar el elemento navbar con id "navbar"');
      return;
    }
    
    const isScrolledNow = window.scrollY > this.scrollThreshold;
    
    // Aplicar la clase siempre, no solo cuando cambia el estado
    this.isScrolled = isScrolledNow;
    
    if (this.isScrolled) {
      this.renderer.addClass(navbar, 'scrolled');
    } else {
      this.renderer.removeClass(navbar, 'scrolled');
    }
  }


  public setScrollThreshold(newThreshold: number): void {
    this.scrollThreshold = newThreshold;
    this.updateNavbarState();
  }
}