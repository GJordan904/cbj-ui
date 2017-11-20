import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'BytesTransform'
})

@Injectable()
export class BytesTransform implements PipeTransform {
    transform(value, args?): Array<any> {
        if (value && value.changingThisBreaksApplicationSecurity !== undefined) {
            value = value.changingThisBreaksApplicationSecurity;
        }
        if(value === 0) {
          value = 0 + '/B';
        }else{
          if (value / 1000 < 1) value = value.toFixed(2) + '/B';
          if (value / 1000000 < 1) value = (value / 1000).toFixed(2) + '/KB';
          if (value / 1000000000 < 1) value = (value / 1000000).toFixed(2) + '/MB';
          else value =  (value / 1000000000).toFixed(2) + '/GB';
        }

        return value;
    }
}
