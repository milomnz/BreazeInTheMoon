import { Component, OnInit, OnDestroy, HostListener, Renderer2, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  // Flag to track if we've scrolled past the threshold
  isScrolled = false;
  
  // Default threshold value for scroll detection
  scrollThreshold: number = 50;
  
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    // Initialize navbar state when component loads
    this.updateNavbarState();
    
    // Log para depuración
    console.log('NavbarComponent inicializado');
  }

  /**
   * Angular's @HostListener decorator captures scroll events
   * on the window without manually adding/removing event listeners
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    // Log para depuración
    console.log('Scroll detectado, posición Y:', window.scrollY);
    this.updateNavbarState();
  }

  /**
   * Updates the navbar visual state based on scroll position
   */
  private updateNavbarState(): void {
    // Usar document.getElementById como alternativa más robusta
    const navbar = document.getElementById('navbar');
    
    if (!navbar) {
      console.error('No se pudo encontrar el elemento navbar con id "navbar"');
      return;
    }
    
    const isScrolledNow = window.scrollY > this.scrollThreshold;
    console.log('Estado de scroll:', isScrolledNow, 'Threshold:', this.scrollThreshold);
    
    // Aplicar la clase siempre, no solo cuando cambia el estado
    this.isScrolled = isScrolledNow;
    
    if (this.isScrolled) {
      console.log('Aplicando clase scrolled');
      this.renderer.addClass(navbar, 'scrolled');
    } else {
      console.log('Removiendo clase scrolled');
      this.renderer.removeClass(navbar, 'scrolled');
    }
  }

  /**
   * Public method to dynamically change the scroll threshold
   * @param newThreshold - New threshold value in pixels
   */
  public setScrollThreshold(newThreshold: number): void {
    this.scrollThreshold = newThreshold;
    this.updateNavbarState();
  }
}