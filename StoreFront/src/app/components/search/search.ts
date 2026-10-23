import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class SearchComponent {
  constructor(private router: Router) {}

  doSearch(value: string): void {
    if (value && value.trim() !== '') {
      this.router.navigateByUrl(`/search/${value.trim()}`);
    }
  }
}
