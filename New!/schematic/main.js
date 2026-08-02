//import { jingly } from "./test.js";

import { parseMinecraftSchematic, convertToTxt, xyzToKey } from "./schematics.js";
const nbt = require('prismarine-nbt');
const { Buffer } = require('buffer');

//import * as nbt from "./prismarine-nbt-2.8.0/nbt.js";
//console.log("hi hi hellofa");
//console.log(jingly(1, 2))
let filein = document.getElementById("file");
let qe;

let copybutton = document.getElementById("button1");
copybutton.style.display = "none";
copybutton.onclick = () => {
    navigator.clipboard.writeText(qe);
}

export function clicked() {
    navigator.clipboard.writeText(qe);
}

filein.addEventListener("input", (event) => {
    let out = "";
    let litfile = filein.files[0];
    console.log("jingly");
    console.log(filein.files);
    console.log(litfile);
    let name = litfile.name;
    console.log(name);

    let fr = new FileReader();
    fr.readAsArrayBuffer(litfile);

    let schematic;
    fr.onload = function (e) {
        nbt.parse(Buffer.from(e.target.result)).then(nbt => {
            schematic = parseMinecraftSchematic(nbt, name, { consolidate: false });
            console.log(schematic);
            //console.log(convertToTxt(schematic));
            let x = 0, y = 0, z = 0;
            let key = xyzToKey(x, y, z, schematic.xsize, schematic.ysize, schematic.zsize);
            let schemsize = schematic.xsize * schematic.ysize * schematic.zsize;
            let rn = schematic.blocks.keys().next().value;
            let ks = schematic.blocks.get(rn).keys();
            let previ = 0;
            console.log(ks);
            /*
            for (let i of ks) {
                console.log(i - previ);
                if ((i - previ) > 1) {
                    for (let i1 = 1; x < (i - previ); x++) {
                        out = out + "minecraft:air,";
                    }
                }
                let currentb = schematic.blocks.get(rn).get(i);
                console.log(i);
                console.log(currentb);
                out = out + currentb[0] + ",";
                previ = i;

            }
            */
            for (let i = 0; i < schemsize; i++) {
                let currentb = schematic.blocks.get(rn).get(i);
                console.log(i);
                console.log(currentb);
                if (currentb == undefined) {
                    out = out + "minecraft:air'";
                } else {
                    out = out + currentb[0] + ((currentb[1] != null) ? "|" + currentb[1].join(",") : "") + "'";
                    //previ = i;
                }

            }
            out = + (schematic.xsize) + "'" + (schematic.ysize) + "'" + (schematic.zsize) + "'" + out;
            console.log(key);
            console.log(schematic.blocks.get(rn).get(0));
            console.log(out);
            console.log(schematic.xsize * schematic.ysize * schematic.zsize);


            let t = '{"blocks":[{"id":"block","action":"","args":{"items":[{"slot":0,"item":{"id":"txt","data":{"name":"' + out + '"}}}]},"block":"player_action","inverted":"","attribute":"","target":""}]}';

            let qw = pako.gzip(t);
            console.log(qw);
            qe = qw.toBase64();
            console.log(qe);
            //navigator.clipboard.writeText(qe);
            copybutton.style.display = "block";
        });


        //let ab = e.target.result;
        //let f = fr.result;
        //document.getElementById('pr').textContent = f;
        //console.log(f);
        //parseMinecraftSchematic(f, name);
    }

    //fr.readAsText(litfile);


    //parseMinecraftSchematic(litfile, name);

});
