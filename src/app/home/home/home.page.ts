import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public searchField: FormControl;
  public filteredClients$!: Observable<Client[]>;

  constructor(private clientService: ClientService) {
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    const client$ = this.clientService.getClients();
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    this.filteredClients$ = combineLatest([client$, searchTerm$]).pipe(
      map(([clients, searchTerm]) =>
        clients.filter(
          (client) =>
            searchTerm === '' ||
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
}
