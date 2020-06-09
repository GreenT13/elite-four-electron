import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FavoriteList} from "../../backend/favorite-list-database";

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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // const listId = +this.route.snapshot.paramMap.get('id');
    // this.favoriteListApi.fetchFavoriteList(listId)
    //   .then((favoriteList) => this.favoriteList = favoriteList)
    //   .catch(() => console.error('Could not fetch list.'));
  }

}
