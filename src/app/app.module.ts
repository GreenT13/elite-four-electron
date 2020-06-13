import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CardListComponent } from './elitefour/base/card-list/card-list.component';
import { HeaderComponent } from './elitefour/base/header/header.component';
import { HeaderButtonComponent } from './elitefour/base/header-button/header-button.component';
import { ListDetailComponent } from './elitefour/pages/list-detail/list-detail.component';
import { ListOverviewComponent } from './elitefour/pages/list-overview/list-overview.component';
import { AddListFormModalComponent } from './elitefour/base/add-list-form-modal/add-list-form-modal.component';
import { SettingsComponent } from './elitefour/pages/settings/settings.component';
import { MenuComponent } from './elitefour/menu/menu.component';
import { ItemFormModalComponent } from './elitefour/base/item-form-modal/item-form-modal.component';
import { AreYouSureModalComponent } from './elitefour/base/are-you-sure-modal/are-you-sure-modal.component';
import { AlgorithmComponent } from './elitefour/pages/algorithm/algorithm.component';

@NgModule({
  declarations: [AppComponent, CardListComponent, HeaderComponent, HeaderButtonComponent, ListDetailComponent, ListOverviewComponent, AddListFormModalComponent, SettingsComponent, MenuComponent, ItemFormModalComponent, AreYouSureModalComponent, AlgorithmComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
