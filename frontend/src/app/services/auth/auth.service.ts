// src/app/services/auth.service.ts
import { Injectable, OnDestroy } from '@angular/core'; // Añadido OnDestroy
import { Observable, BehaviorSubject, Subscription } from 'rxjs'; // Añadido Subscription
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: number;
  nombre: string;
  correo: string;
  rol: string;
  exp: number; // Asegúrate de que este campo exista en tu token JWT
  // Asegúrate de que esta interfaz coincida con el payload de tu token JWT de backend
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy { // Implementa OnDestroy
  private TOKEN_KEY = 'access_token'; // La misma clave que usas en LoginService

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserData = new BehaviorSubject<DecodedToken | null>(null);

  constructor() {
    // Al iniciar el servicio, verifica el token existente
    if (this.hasToken()) {
      this.decodeAndSetUserData();
    }
    // Escucha eventos de cambio en localStorage.
    // Esto es crucial para que AuthService reaccione si LoginService (u otro)
    // guarda el token.
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  // >>>>>> Lógica para detectar cambios en localStorage <<<<<<
  // Si otro servicio (como LoginService) guarda el token, este evento lo detecta.
  private handleStorageChange(event: StorageEvent): void {
    if (event.key === this.TOKEN_KEY) {
      if (event.newValue) { // Si se añadió o cambió el token
        this.loggedIn.next(this.hasToken());
        this.decodeAndSetUserData();
      } else { // Si se eliminó el token (ej. por logout en otra pestaña)
        this.logout(); // Fuerza el logout para limpiar el estado
      }
    }
  }

  // Verifica si hay un token válido y no expirado
  private hasToken(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return false;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos (UNIX timestamp)
      if (decoded.exp < currentTime) {
        console.warn('Token JWT expirado. Forzando cierre de sesión.');
        this.logout(); // Si expiró, forzamos el logout
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error al decodificar o validar el token JWT:', e);
      this.logout(); // Si el token es inválido/corrupto, forzamos el logout
      return false;
    }
  }

  // Decodifica el token y emite los datos del usuario
  private decodeAndSetUserData(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        this.currentUserData.next(decoded);
      } catch (e) {
        console.error('Error al decodificar el token para establecer datos de usuario:', e);
        this.logout(); // Fallback en caso de token inválido al decodificar
      }
    } else {
      this.currentUserData.next(null);
    }
  }

  // >>>>>> Métodos públicos para el estado de autenticación <<<<<<
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser(): Observable<DecodedToken | null> {
    return this.currentUserData.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // >>>>>> Método para iniciar sesión (Llamado por LoginService) <<<<<<
  // Este método es crucial: es cómo AuthService se entera de que un login ocurrió
  // y un token fue guardado por LoginService.
  loginSuccess(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loggedIn.next(true); // Emite el nuevo estado
    this.decodeAndSetUserData(); // Carga los datos del usuario
    console.log('AuthService: Login exitoso detectado y estado actualizado.');
  }


  // >>>>>> Método para cerrar sesión <<<<<<
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.next(false); // Emite el nuevo estado
    this.currentUserData.next(null); // Limpia los datos del usuario
    console.log('AuthService: Usuario ha cerrado sesión.');
  }

  // Limpiar el listener al destruir el servicio
  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }
}