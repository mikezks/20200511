import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromFlightBooking from '../+state';

@Component({
  selector: 'flight-workspace-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {
  editForm: FormGroup;
  flights$ = this.store.pipe(select(fromFlightBooking.getFlights))

  constructor(
    private fb: FormBuilder,
    private store: Store<fromFlightBooking.FeatureState>) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [
        1
      ],
      from: [
        'Graz',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      to: [
        'Hamburg',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      date: [
        (new Date()).toISOString()
      ]
    });

    this.editForm.valueChanges
      .subscribe(console.log);
  }

  save(): void {
    console.log(this.editForm.value);
  }

  load(actionPayload: { from: string, to: string }): void {
    this.store.dispatch(
      fromFlightBooking.flightsLoad(actionPayload)
    );
  }
}

