//import Pako from "pako";
import { parseMinecraftSchematic, convertToTxt, xyzToKey } from "./schematics.js";
const nbt = require('prismarine-nbt');
const { Buffer } = require('buffer');

let t = '{"blocks":[{"id":"block","action":"","args":{"items":[{"slot":0,"item":{"id":"txt","data":{"name":"chungy123"}}}]},"block":"player_action","inverted":"","attribute":"","target":""}]}';

let qw = pako.gzip(t);
console.log(qw);
let qe = qw.toBase64();
console.log(qe);
navigator.clipboard.writeText(qe);