import * as Kefir from 'kefir';
import { setTimeout } from 'timers';
import * as _ from 'underscore';

function getFakeSubscript(subName : string, timeout : number, callback) {
    setTimeout( () => 
        { 
            //console.log("iof "+subName+"=",subName.indexOf(".err"));
            if(subName.indexOf(".err") === -1) {
                callback(null, subName + " is OK");
            } else {
                callback(subName + " error!!!");
            }
        }
    , 1000*timeout);
}

function getZippedStream(streams : string[]) : any[] {

    let zipStream = [];
    for(let streamName of streams) {
        let tm = streamName.length;
        //console.log("tm=", tm);
        let stream = Kefir.fromNodeCallback( (callback) => {
            getFakeSubscript(streamName, tm, callback);
        });
        zipStream.push(stream);
        // console.log(stream);
    }
    
    return zipStream;
}

let stream1 = Kefir.fromNodeCallback( (callback) => {
    getFakeSubscript("user.1", 3, callback);
});
let stream2 = Kefir.fromNodeCallback( (callback) => {
    getFakeSubscript("user.22", 2, callback);
});
let stream3 = Kefir.fromNodeCallback( (callback) => {
    getFakeSubscript("user.333", 5, callback);
});
let stream4 = Kefir.fromNodeCallback( (callback) => {
    getFakeSubscript("user.err", 5, callback);
});
let stream5 = Kefir.fromNodeCallback( (callback) => {
    getFakeSubscript("user.err", 2, callback);
});

let arr = [];
arr.push(stream1);
arr.push(stream2);
arr.push(stream3);
arr.push(stream4);
arr.push(stream5);

let mergeStream = Kefir.merge(arr);

//let logStream = Kefir.interval(3000, 1);

// let subs = ["user.1", 
//             "user.22", 
//             "user.err", 
//             "user.333"
//            ];

// let zipStream = Kefir.zip(getZippedStream(subs));

//zipStream.log();

let errCount : number = 0;
let flag : boolean = false;

mergeStream
.onEnd(() => { console.log('errCount: ', errCount); } )
.onError((x) => { errCount++; })
  ;

let newStream = Kefir.interval(100,1).take(50); 

mergeStream.log();  
newStream.log();

// let logStream = mergeStream.observe(
//     {
//         value(value) {
//             console.log('value:', value);
//         },
//         error(error) {
//             errCount++;
//             console.log('error:', error);
//         },
//         end() {
//             console.log('errCount: ', errCount);
//             console.log('end');
//         },
//     }
// );

//let pool = Kefir.fromPool(300, () => 13);

// let pool = Kefir.fromPool(300, () => {
//     console.log('pool errCount: ', errCount);
//     return errCount;
// });


