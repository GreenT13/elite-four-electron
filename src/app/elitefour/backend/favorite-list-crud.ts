import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FavoriteListCrud {
  private count: number = 0;
  private readonly favoriteLists: FavoriteList[]
  constructor() {
    this.favoriteLists = [this.createFavoriteList(),this.createFavoriteList()]
  }

  public fetchAllFavoriteLists(): Promise<FavoriteList[]> {
    return new Promise((resolve) => {
      resolve(this.favoriteLists);
    });
  }

  public addFavoriteList(listName: string) {
    this.count += 1;
    const favoriteList: FavoriteList = {
      id: this.count, name: listName, nrOfFavoritesPicked: 0, nrOfItems: 0, status: FavoriteListStatus.CREATED, tsCreated: new Date(),
    }
    this.favoriteLists.push(favoriteList);
  }

  public fetchFavoriteList(listId: number): Promise<FavoriteList> {
    for (let favoriteList of this.favoriteLists) {
      if (favoriteList.id == listId) {
        return new Promise<FavoriteList>((resolve) => {
          resolve(favoriteList);
        })
      }
    }

    return new Promise<FavoriteList>((resolve, reject) => {
      reject()
    });
  }

  createFavoriteList(): FavoriteList {
    this.count += 1;
    return {
      id: this.count, name: "random", nrOfFavoritesPicked: 0, nrOfItems: 15, status: FavoriteListStatus.CREATED, tsCreated: new Date(),
    };
  }}

export type FavoriteList = {
  id: number,
  name: string,
  nrOfItems: number,
  nrOfFavoritesPicked: number,
  tsCreated: Date,
  status: FavoriteListStatus
}

enum FavoriteListStatus {
  CREATED = "Created",
  ONGOING = "Ongoing",
  FINISHED = "Finished"
}
