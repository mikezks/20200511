import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'flight-workspace-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrls: ['./passenger-detail.component.css']
})
export class PassengerDetailComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [
        1
      ],
      firstName: [
        'Petra',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      name: [
        'Huber',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      bonusMiles: [
        10000
      ],
      passengerStatus: [
        'B'
      ]
    });

    this.editForm.valueChanges
      .subscribe(console.log);
  }

  save(): void {
    console.log(this.editForm.value);
  }
}

