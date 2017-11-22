import {trigger, state, style, animate, transition} from '@angular/animations';

export function toggleMenu() {
  return trigger('toggleMenu', [
    state('closed', style({height: 0})),
    state('open', style({height: '*'})),
    transition('closed <=> open', animate('250ms ease-in-out'))
  ]);
}
