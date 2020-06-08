import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FavoriteList, FavoriteListCrud} from "../../backend/favorite-list-crud";

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styles: []
})
export class ListDetailComponent implements OnInit {
  favoriteList: FavoriteList = {id: 0, name: '', nrOfFavoritesPicked: 0, nrOfItems: 0, status: undefined, tsCreated: new Date(),}

  log(x) {
    console.log('A callback is for button ' + x);
  }

  constructor(private route: ActivatedRoute, private favoriteListApi: FavoriteListCrud) {
  }

  ngOnInit(): void {
    const listId = +this.route.snapshot.paramMap.get('id');
    this.favoriteListApi.fetchFavoriteList(listId)
      .then((favoriteList) => this.favoriteList = favoriteList)
      .catch(() => console.error('Could not fetch list.'));
  }

}
