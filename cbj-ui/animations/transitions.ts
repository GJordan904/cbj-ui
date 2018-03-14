import {trigger, state, style, animate, transition, AnimationTriggerMetadata} from '@angular/animations';

export function fade(timing: number, easing: string): AnimationTriggerMetadata {
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

export function collapse(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('collapse', [
    state('closed', style({height: 0})),
    state('open', style({height: '*'})),
    transition('closed <=> open', animate(timing + 'ms ' + easing))
  ]);
}

export function slideLeft(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('slideLeft', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ transform: 'translateX(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        transform: 'translateX(-100%)'
      }))
    ])
  ]);
}

export function slideRight(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('slideRight', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        transform: 'translateX(100%)'
      }))
    ])
  ]);
}

export function slideUp(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('slideUp', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ transform: 'translateY(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        transform: 'translateY(-100%)'
      }))
    ])
  ]);
}

export function slideDown(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('slideDown', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ transform: 'translateY(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        transform: 'translateY(100%)'
      }))
    ])
  ]);
}

export function leftFadeOut(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('leftFadeOut', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ transform: 'translateX(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ]);
}

export function rightFadeOut(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('rightFadeOut', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);
}

export function upFadeOut(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('upFadeOut', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ transform: 'translateY(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }))
    ])
  ]);
}

export function downFadeOut(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('downFadeOut', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ transform: 'translateY(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);
}

export function leftFade(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('leftFade', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ opacity: 0 }),
      style({ transform: 'translateX(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ]);
}

export function rightFade(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('rightFade', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ opacity: 0 }),
      style({ transform: 'translateX(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);
}

export function upFade(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('upFade', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ opacity: 0 }),
      style({ transform: 'translateY(100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }))
    ])
  ]);
}

export function downFade(timing: number, easing: string): AnimationTriggerMetadata {
  return trigger('downFade', [
    // state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({ opacity: 0 }),
      style({ transform: 'translateY(-100%)' }),
      animate(timing + 'ms ' + easing)
    ]),
    transition('* => void', [
      animate(timing + 'ms ' + easing, style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);
}
