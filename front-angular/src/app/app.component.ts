import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  /**
   * OnInit responsável por trabalhar com a questão do Slim Loading Bar na aplicação.
   */
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }


  private navigationInterceptor(event: Event): void {

  }
}
