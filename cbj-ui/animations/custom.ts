import { animate, state, style, transition, trigger } from '@angular/animations';

export function moveToAnimation() {
  return trigger('moveTo', [
    state('hidden', style({display: 'none'})),
    state('sized',
      style({display: 'block', top: '{{st}}', left: '{{sl}}' }),
      {params: { st: '100%', sl: '15px'} }
    ),
    state('positioned',
      style({top: '{{et}}', left: '{{el}}'}),
      {params: {et: '15px', el: '15px'} }
    ),

    transition('sized => positioned', animate('{{timing}}' + 'ms ' + '{{easing}}'), {params: {timing: 140, easing: 'ease-in-out'}})
  ]);
}
