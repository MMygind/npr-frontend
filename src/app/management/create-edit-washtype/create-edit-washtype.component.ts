import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {WashType} from "../../shared/models/washtype.model";
import {Company} from "../../shared/models/company.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";
import {FormBuilder, Validators} from "@angular/forms";
import {LocationModel} from "../../shared/models/location.model";

@Component({
  selector: 'app-create-edit-washtype',
  templateUrl: './create-edit-washtype.component.html',
  styleUrls: ['./create-edit-washtype.component.scss']
})
export class CreateEditWashtypeComponent implements OnInit, OnChanges {

  @Input() washType?: WashType;
  @Input() location?: LocationModel;
  @Input() parentActionInProgress = false;
  @Output() washTypeEvent = new EventEmitter<WashType>();
  actionInProgress = false;
  washTypeForm = this.fb.group({
    name: [null, Validators.required],
    price: [null, [Validators.required, Validators.min(1)]],
  });

  constructor(private dialog: MatDialog,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateForm();
  }

  updateForm() {
    if (this.washType) {
      this.washTypeForm.patchValue({
        name: this.washType.name,
        price: this.washType.price,
      });
    } else {
      this.washTypeForm.reset();
    }
  }

  saveWashType() {
    this.actionInProgress = true;
    const washTypeToReturn: WashType = {
      location: this.location,
      name: this.washTypeForm.value.name,
      price: this.washTypeForm.value.price,
    }
    if (this.washType) {
      washTypeToReturn.id = this.washType.id;
      washTypeToReturn.location = undefined;
    }
    const dialogMessage = (this.washType)
      ? `Opdatere ${washTypeToReturn.name}?` : `Oprette ${washTypeToReturn.name}?`;
    const dialogRef = this.dialog.open(ConfirmationAlertComponent,
      { data: { message: dialogMessage },
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.washTypeEvent.emit(washTypeToReturn);
      }
      this.actionInProgress = false;
    });
  }



}
