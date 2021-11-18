import {Component, Input, OnInit} from '@angular/core';
import {LocationModel} from "../../shared/models/location.model";

@Component({
  selector: 'app-create-edit-location',
  templateUrl: './create-edit-location.component.html',
  styleUrls: ['./create-edit-location.component.scss']
})
export class CreateEditLocationComponent implements OnInit {

  @Input() location?: LocationModel;

  constructor() { }

  ngOnInit(): void {
    if (location) {

    }
  }

}
