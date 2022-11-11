import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { University } from '../interfaces/university.interface';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  filteredOptions: University[] = [];
  selectedAlphaTwoCode = '';
  selectedCountry = 'all';
  query: string = '';
  countries = [
    { name: 'all', value: '' },
    { name: 'spain', value: 'ES' },
    { name: 'united kingdom', value: 'GB' },
    { name: 'portugal', value: 'PT' },
  ];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  selectCountry(country: any) {
    this.query = '';
    this.selectedCountry = country.name;
    this.selectedAlphaTwoCode = country.value;
  }

  searchOnType() {
    this.searchService
      .searchUniversity(this.query, this.selectedAlphaTwoCode)
      .subscribe((unis) => (this.filteredOptions = unis));
  }
}
