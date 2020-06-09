import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FavoriteList} from "../../backend/favorite-list-interfaces";
import {FavoriteListApi} from "../../backend/favorite-list-api";

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styles: []
})
export class ListDetailComponent implements OnInit {
  favoriteList: FavoriteList = {id: 0, name: '', status: undefined, tsCreated: new Date(), items: []}

  log(x) {
    console.log('A callback is for button ' + x);
  }

  constructor(private route: ActivatedRoute,
              private favoriteListApi: FavoriteListApi) {
  }

  public determineNumberOfFavoriteItemsPicked() {
    return this.favoriteList.items.filter((item)=> { !!item.favoritePosition }).length
  }

  ngOnInit(): void {
    const listId = +this.route.snapshot.paramMap.get('id');
    this.favoriteListApi.getFavoriteListById(listId)
      .subscribe((favoriteList) => {this.favoriteList = favoriteList;})
  }

}
