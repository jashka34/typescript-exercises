function subp(subName : string) : Promise<string> {
    return new Promise<string>((resolve, error) => {
            setTimeout(()=> resolve(subName + " subscribe OK"),1000*5);
        });
}

async function subs(subArr : [string]) {

    console.log("go subs");

    for(let subName of subArr) {
        let res = await subp(subName);
        console.log(res);
    }

    console.log("end subs");

}

subs([
    "user.route",
    "user.asset",
    "user.checkresults",
    "user.operations",
    "user.blablabla"
]);

