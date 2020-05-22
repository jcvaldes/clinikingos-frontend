import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../admin/users/user.model';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public _searchService: SearchService
  ) {
    activatedRoute.params.subscribe( params => {
      let term = params['term'];
      this.search(term);
    });
  }

  ngOnInit() {}

  search(term: string) {
    this._searchService.search(term)
        .subscribe((response) => {
          this.users = response.users;
        });
  }

}
