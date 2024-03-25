pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/mimcsponge.circom";


template Main() {
    signal input price;
    signal input hash;
    signal input nullifier;
    
    signal output out;
    
    component mimc = MiMCSponge(2, 220, 1);
    mimc.ins[0] <== price;
    mimc.ins[1] <== nullifier;
    mimc.k <== 0;

    out <== mimc.outs[0];

    out === hash;
}

component main = Main();