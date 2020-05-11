import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Flight, FlightService } from '@flight-workspace/flight-api';

@Component({
  selector: 'app-flight-dynamic-search',
  templateUrl: './flight-dynamic-search.component.html',
  styleUrls: ['./flight-dynamic-search.component.scss']
})
export class FlightDynamicSearchComponent implements OnInit {
  dynFilter: FormGroup = new FormGroup({});
  flights: Flight[] = [];
  formMetadata = [
    {
      name: 'from',
      label: 'Airport of departure',
      initValue: 'Wien'
    },
    {
      name: 'via',
      label: 'Transfer airport',
      initValue: 'Frankfurt'
    },
    {
      name: 'to',
      label: 'Airport of destination',
      initValue: 'Berlin'
    }
  ];
  basket = {};

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    for (const item of this.formMetadata) {
      this.dynFilter.addControl(
        item.name,
        new FormControl(
          item.initValue,
          // [ Validators.required ]
          )
      );
    }
  }

  search(): void {
    this.flightService
      .find(
        this.dynFilter.controls[this.formMetadata[0].name].value,
        this.dynFilter.controls[this.formMetadata[2].name].value,
      )
      .subscribe(
        (flights: Flight[]) => {
          this.flights = flights;
          console.log(flights);
        },
        errResp => console.error('Error loading flights', errResp)
      );
  }
}
