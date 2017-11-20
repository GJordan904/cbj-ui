import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {CardTabComponent} from './card-tab.component';

@Component({
  selector: 'cbj-card-tabs',
  templateUrl: './card-tabs.component.html',
  styleUrls: ['./card-tabs.component.scss']
})
export class CardTabsComponent implements OnInit, AfterContentInit {
  @Input('type') type: string;
  @Input('adlCardClasses') adlCardClasses: string;
  @Input('adlNavClasses') adlNavClasses: string;
  @ContentChildren(CardTabComponent) tabs: QueryList<CardTabComponent>;
  navClasses: {};
  cardClasses: {};

  constructor() { }

  ngOnInit() {
    this.setClasses();
  }

  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: CardTabComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(t => t.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
  }

  private setClasses() {
    let typeClass = {};
    if (this.type) {
      typeClass = {[this.type]: true};
    } else {
      typeClass = {tabs: true};
    }
    this.navClasses = {
      [this.adlNavClasses]: true,
      ...typeClass
    };
    this.cardClasses = {
      [this.adlCardClasses]: true
    };
  }
}
