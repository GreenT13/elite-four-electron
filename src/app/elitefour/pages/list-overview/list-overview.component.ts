import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FavoriteList, FavoriteListCrud} from "../../backend/favorite-list-crud";
import {AddListFormModalComponent} from "../../base/add-list-form-modal/add-list-form-modal.component";

@Component({
  selector: 'app-list-overview',
  template: `
        <app-content-header title="Lists">
            <app-content-header-button (click)="openAddNewListModal()">New</app-content-header-button>
        </app-content-header>

        <app-card-list *ngFor="let favoriteList of favoriteLists"
                       [title]="favoriteList.name + ' (' + favoriteList.nrOfFavoritesPicked + '/' + favoriteList.nrOfItems +')'"
                       [subtext]="favoriteList.status" (onDelete)="log()"
                       (onPlay)="log()" (onInfo)="infoCallback(favoriteList.id)"></app-card-list>
    `,
  styles: []
})
export class ListOverviewComponent implements OnInit {
  favoriteLists: FavoriteList[];

  constructor(private router: Router,
              private favoriteListApi: FavoriteListCrud,
              private modalService: NgbModal) {
    this.infoCallback = this.infoCallback.bind(this);
  }

  ngOnInit(): void {
    this.favoriteListApi.fetchAllFavoriteLists().then((list) => this.favoriteLists = list);
  }

  openAddNewListModal() {
    this.modalService.open(AddListFormModalComponent);
  }

  log() {
    console.log('Callback')
  }

  infoCallback(listId: number) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/list/' + listId]);
  }

}
