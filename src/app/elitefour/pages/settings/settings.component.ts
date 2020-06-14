import { Component, OnInit } from '@angular/core';
import { version } from '../../../../../package.json';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  version: string = version;
  configPath: string = ''

  constructor() { }

  ngOnInit(): void {
    this.configPath = require('electron').remote.app.getPath('userData') + '\\config.json'
  }

}
