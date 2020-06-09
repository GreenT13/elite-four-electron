import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FavoriteListApi} from "../../backend/favorite-list-api";

@Component({
  selector: 'app-add-list-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="modal-header">
        <h4 class="modal-title">Add a new list</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <!--suppress HtmlUnknownAttribute -->
          <input ngbAutofocus type="text" class="form-control" id="listName" [(ngModel)]="listName" name="listName">
          <div class="alert alert-danger" *ngIf="!!error">{{error}}</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Cancel
        </button>
        <button class="btn btn-primary">Submit</button>
      </div>
    </form>
  `,
  styles: []
})
export class AddListFormModalComponent implements OnInit {
  listName: string = ''
  error: string

  constructor(public activeModal: NgbActiveModal,
              private favoriteListApi: FavoriteListApi) {
  }

  onSubmit() {
    try {
      this.favoriteListApi.addNewFavoriteList(this.listName);
    } catch (error) {
      this.error = error.message;
      return false;
    }

    this.activeModal.close("Submit");
  }

  ngOnInit(): void {
  }

}
