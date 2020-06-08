import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FavoriteListCrud} from "../../backend/favorite-list-crud";

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

  constructor(public activeModal: NgbActiveModal,
              private favoriteListApi: FavoriteListCrud) {
  }

  onSubmit() {
    this.favoriteListApi.addFavoriteList(this.listName);
    this.activeModal.close("Submit");
  }

  ngOnInit(): void {
  }

}
