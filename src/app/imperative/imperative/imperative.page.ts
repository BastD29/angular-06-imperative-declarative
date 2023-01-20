import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-imperative',
  templateUrl: './imperative.page.html',
  styleUrls: ['./imperative.page.scss'],
})
export class ImperativePage implements OnInit, OnDestroy {
  public searchField: FormControl;
  public clients!: Client[];
  public filteredClients!: Client[];

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private clientService: ClientService) {
    // 1. set up a form control for the search field
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    // 2. get the data for our clients list by subscribing to the Observable from the ClientService
    this.clientService
      .getClients()
      .pipe(takeUntil(this._destroy$))
      .subscribe((clients) => {
        this.clients = clients;
        this.filteredClients = clients;
      });

    // 3. subscribe to the valueChanges observable for the search field
    this.searchField.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((searchTerm) => {
        // 4. whenever we receive a new value, we update our filteredClients data that the list uses
        this.filteredClients = this.clients.filter(
          (client) =>
            searchTerm === '' ||
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }

  // 5. when the component is destroyed, we fire the destroy$ observable to clean up our subscriptions
  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}
