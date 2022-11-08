import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { University } from '../interfaces/university.interface';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService) {}
  filteredOptions: University[] = [];
  countries = [
    { name: 'all', value: '' },
    { name: 'spain', value: 'ES' },
    { name: 'united kingdom', value: 'GB' },
    { name: 'portugal', value: 'PT' },
  ];
  selectedCountry = 'all';
  selectCountry(country: any) {
    this.query = '';
    this.selectedCountry = country.name;
    this.selectedAlphaTwoCode = country.value;
  }
  selectedAlphaTwoCode = '';

  searchOnType() {
    this.searchService
      .searchUniversity(this.query, this.selectedAlphaTwoCode)
      .subscribe((unis) => (this.filteredOptions = unis));
  }
  query: string = '';

  ngOnInit(): void {}
}
