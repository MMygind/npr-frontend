import {Component, Input, OnInit} from '@angular/core';
import {WashType} from "../../shared/models/washtype.model";

@Component({
  selector: 'app-create-edit-washtype',
  templateUrl: './create-edit-washtype.component.html',
  styleUrls: ['./create-edit-washtype.component.scss']
})
export class CreateEditWashtypeComponent implements OnInit {

  @Input() washType?: WashType;

  constructor() { }

  ngOnInit(): void {
  }

}
