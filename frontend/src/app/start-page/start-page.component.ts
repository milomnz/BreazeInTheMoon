import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { NavbarComponent } from '../navbar/navbar.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth/auth.service'; 
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { CardsComponent } from '../cards/cards.component';
import { Popover } from 'bootstrap';
import { ReviewStartComponent } from '../review-start/review-start.component';

@Component({
  selector: 'app-start-page',
  imports: [
    RouterModule,
    NavbarComponent,
    BusquedaComponent,
    DateRangePickerComponent,
    LoginComponent,
    CommonModule,
    CardsComponent,
    ReviewStartComponent
  ],
  standalone: true,
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isUserLoggedIn: boolean = false;
  userName: string | null = null;
  private authSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;

  // Referencia al botón que activará el popover
  @ViewChild('profilePopoverBtn') profilePopoverBtn!: ElementRef;

  // Instancia del popover de Bootstrap
  private popoverInstance: Popover | null = null;

  constructor(private authService: AuthService, private router: Router) { } // Inyecta Router

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authSubscription = this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isUserLoggedIn = loggedIn;
      // Si el estado cambia, re-inicializar/destruir el popover si es necesario
      if (this.isUserLoggedIn) {
        // Podríamos necesitar un pequeño retraso para que el elemento se renderice
        setTimeout(() => this.initializePopover(), 0);
      } else {
        this.destroyPopover();
      }
    });

    // Suscribirse a los datos del usuario para obtener el nombre
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.userName = user ? user.nombre : null; 
    });
  }

  ngAfterViewInit(): void {
    this.initializePopover();
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    this.destroyPopover(); // Destruir el popover al destruir el componente
  }

  // >>>>>> Lógica del Popover <<<<<<
  public initializePopover(): void {
    if (this.profilePopoverBtn && this.isUserLoggedIn && !this.popoverInstance) {
      const popoverElement = this.profilePopoverBtn.nativeElement;

      this.popoverInstance = new Popover(popoverElement, {
        html: true,
        sanitize: false, // Asegúrate de que el contenido HTML se procese correctamente
        placement: 'left',
        customClass: 'custom-popover',
        title: `Hola, ${this.userName || 'Usuario'}`,
        content: this.getPopoverContent(),
        trigger: 'click'
      });


      // Escuchar el evento 'shown.bs.popover' para adjuntar listeners a elementos dentro del popover
      popoverElement.addEventListener('shown.bs.popover', () => {
        this.attachPopoverEventListeners();
      });
    }
  }

  public destroyPopover(): void {
    if (this.popoverInstance) {
      const popoverElement = this.profilePopoverBtn?.nativeElement;
      if (popoverElement) {
        popoverElement.removeEventListener('shown.bs.popover', this.attachPopoverEventListeners);
      }
      this.popoverInstance.dispose();
      this.popoverInstance = null;
    }
  }

  public getPopoverContent(): string {
    // Contenido HTML del popover con enlaces/botones
    // Usamos IDs para poder adjuntar listeners manualmente
    return `
      <div>
        <a id="profileLink" class="btn btn-primary btn-sm d-block mb-2" style="width: 100%;" href="javascript:void(0);">Modificar Perfil</a>
        <button id="logoutBtn" class="btn btn-danger btn-sm d-block" style="width: 100%;">Cerrar Sesión</button>
      </div>
    `;
  }

  public attachPopoverEventListeners(): void {
    // Cuando el popover se muestra, buscamos los elementos y adjuntamos los listeners
    const popoverBody = document.querySelector('.popover-body'); // El cuerpo del popover
    if (popoverBody) {
      const profileLink = popoverBody.querySelector('#profileLink');
      const logoutBtn = popoverBody.querySelector('#logoutBtn');

      if (profileLink) {
        profileLink.addEventListener('click', () => {
          this.popoverInstance?.hide(); // Oculta el popover
          this.goToProfile();
        });
      }

      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          this.popoverInstance?.hide(); // Oculta el popover
          this.onLogout();
        });
      }
    }
  }

  // >>>>>> Métodos de Navegación y Sesión <<<<<<
  goToProfile(): void {
    this.router.navigate(['/profile']); // Asumiendo que '/profile' es tu ruta al perfil
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/StartPage']); // Redirigir a la página de inicio después del logout
  }
}