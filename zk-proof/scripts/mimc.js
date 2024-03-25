const { buildMimcSponge } = require("circomlibjs");
const { mimcWithRounds } = require("../client/mimc.js")

const nullifierHash = process.argv[2];
const price = process.argv[3];

if (process.argv.length != 4) {
    console.log('please provide nullifierHash and price');
    return
} else {

    const hash = mimcWithRounds(220)(price, nullifierHash)
    console.log(hash.toString())
    // buildMimcSponge().then((mimc) => {
    //     if (!nullifierHash || !price === 0) {
    //         return
    //     }
    //     const hash = mimc.hash(price, nullifierHash, 0);
    //     console.log(mimc.F.toString(hash))
    // })
}

