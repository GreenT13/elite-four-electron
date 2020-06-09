import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddListFormModalComponent} from "../../base/add-list-form-modal/add-list-form-modal.component";
import {FavoriteListApi} from "../../backend/favorite-list-api";
import {FavoriteList} from "../../backend/favorite-list-interfaces";
import {AreYouSureModalComponent} from "../../base/are-you-sure-modal/are-you-sure-modal.component";

@Component({
  selector: 'app-list-overview',
  template: `
    <app-content-header title="Lists">
      <app-content-header-button (click)="openAddNewListModal()">New</app-content-header-button>
    </app-content-header>

    <app-card-list *ngFor="let favoriteList of favoriteLists"
                   [title]="favoriteList.name"
                   [subtext]="favoriteList.status" (onDelete)="deleteList(favoriteList.id)"
                   (onPlay)="log()" (onInfo)="navigateToList(favoriteList.id)"></app-card-list>
  `,
  styles: []
})
export class ListOverviewComponent implements OnInit {
  favoriteLists: FavoriteList[];

  constructor(private router: Router,
              private favoriteListApi: FavoriteListApi,
              private modalService: NgbModal) {
    this.navigateToList = this.navigateToList.bind(this);
  }

  ngOnInit(): void {
    this.favoriteListApi.getFavoriteLists().subscribe((favoriteLists) => {
      this.favoriteLists = favoriteLists;
    })
  }

  openAddNewListModal() {
    this.modalService.open(AddListFormModalComponent);
  }

  deleteList(listId: number) {
    const modalRef = this.modalService.open(AreYouSureModalComponent)
    modalRef.result.then((result) => {
      if (result) {
        this.favoriteListApi.deleteFavoriteList(listId)
      }}, () => {})
  }

  log() {
    console.log('Callback')
  }

  navigateToList(listId: number) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/list/' + listId]);
  }

}
