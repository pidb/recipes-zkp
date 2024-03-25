const { randomBytes } = require("crypto");
const { buildPoseidon, buildMimcSponge } = require("circomlibjs");
// function _randomBytes(length) {
//     return arrayify(randomBytes(length));
// }

// Normalize the hex string
function toHex(value) {
    // If negative, prepend the negative sign to the normalized positive value
    if (value[0] === "-") {
        // Strip off the negative sign
        value = value.substring(1);

        // Cannot have multiple negative signs (e.g. "--0x04")
        if (value[0] === "-") { throw new Error(`invalid hex value=${value}`); }

        // Call toHex on the positive component
        value = toHex(value);

        // Do not allow "-0x00"
        if (value === "0x00") { return value; }

        // Negate the value
        return "-" + value;
    }

    // Add a "0x" prefix if missing
    if (value.substring(0, 2) !== "0x") { value = "0x" + value; }

    // Normalize zero
    if (value === "0x") { return "0x00"; }

    // Make the string even length
    if (value.length % 2) { value = "0x0" + value.substring(2); }

    // Trim to smallest even-length string
    while (value.length > 4 && value.substring(0, 4) === "0x00") {
        value = "0x" + value.substring(4);
    }

    return value;
}

function hexZeroPad(value, length) {

    if (value.length > 2 * length + 2) {
        throw new Error(`value out of range value=${arguments[1]}`);
    }

    while (value.length < 2 * length + 2) {
        value = "0x0" + value.substring(2);
    }

    return value;
}

buildPoseidon().then((poseidon) => {
    const nullifier = randomBytes(32);
    const hash = poseidon(nullifier, 1);
    const hashStr = poseidon.F.toString(hash);
    // const hashHex = toHex(hashStr);
    // const bytes = hexZeroPad(hashHex);
    console.log(`nullifierHash: ${hashStr}`)
});

