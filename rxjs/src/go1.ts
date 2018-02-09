import * as Rx from 'rxjs/Rx';

let obs = Rx.Observable.of(1,2,3);

obs.subscribe(x => console.log(`value: ${x}`));

