function subp(subName : string) : Promise<string> {
    return new Promise<string>((resolve, error) => {
            setTimeout(()=> resolve(subName + " subscribe OK"),1000*2);
        });
}

async function subs(subArr : string[]) {
    console.time('subs');
    console.log("go subs");
    for(let subName of subArr) {
        let res = await subp(subName);
        console.log(res);
    }
    console.timeEnd('subs');
    console.log("end subs");
}

async function subs2(subName : string) {
    let res = await subp(subName);
    console.log(res);
}

let subsArr = [ "user.route",
                "user.asset",
                "user.checkresults",
                "user.operations",
                "user.blablabla"
              ];

console.log("-->");
subs(subsArr);
console.log("<--");


// console.log("---->");
// subs2("user.route")
//   .then((data) => subs2("user.asset"))
//   .then((data) => subs2("user.checkresults"))
//   .then((data) => subs2("user.operations"))
//   .then((data) => subs2("user.blablabla"))
//   .catch(console.error);
// console.log("<----");
