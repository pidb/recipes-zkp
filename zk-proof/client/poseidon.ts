import { BigNumberish, ethers } from "ethers";
import bigInt, { BigNumber } from "big-integer";
import { buildPoseidon } from "circomlibjs";



// Normalize the hex string
function toHex(value: string): string {
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

function hexZeroPad(value: string, length: number): string {

    if (value.length > 2 * length + 2) {
        throw new Error(`value out of range value=${arguments[1]}`);
    }

    while (value.length < 2 * length + 2) {
        value = "0x0" + value.substring(2);
    }

    return value;
}


export const poseidonHash = async (inputs: any[]) => {
    var poseidon = await buildPoseidon();
    const hash = poseidon(inputs);
    // Make the number within the filed size
    const hashStr = poseidon.F.toString(hash);
    // Make it a valid hex string
    const hashHex = toHex(hashStr);
    // pad zero to make it 32 bytes, so that the output can be taken as a bytes32 contract argument
    return hexZeroPad(hashHex, 32);
};