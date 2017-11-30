import {trigger, state, style, animate, transition, AnimationTriggerMetadata} from '@angular/animations';

export function fade(timing, easing): AnimationTriggerMetadata {
  return trigger('fade', [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate(timing + 'ms ' + easing)
    ]),
    transition(':leave', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0
      }))
    ])
  ]);
}

export function collapse(timing, easing): AnimationTriggerMetadata {
  return trigger('collapse', [
    state('closed', style({height: 0})),
    state('open', style({height: '*'})),
    transition('closed <=> open', animate(timing + 'ms ' + easing))
  ]);
}
