import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-header',
  template: `
        <div class="justify-content-between d-flex">
            <div>
                <h2 class="mb-4">{{title}}</h2>
            </div>
            <div>
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class HeaderComponent implements OnInit {
  @Input() title: string

  ngOnInit(): void {
  }

}
