import { Measure, Ratio } from "../../util/physics/measurable.js";
var PlanetType;
(function (PlanetType) {
    PlanetType[PlanetType["TERRESTRIAL"] = 0] = "TERRESTRIAL";
    PlanetType[PlanetType["ICY"] = 1] = "ICY";
    PlanetType[PlanetType["GASEOUS"] = 2] = "GASEOUS";
    // CHTHONIAN,
    // CARBON,
    // CORELESS,
    // DESERT,
    // HYCEAN,
    // IRON,
    // LAVA,
    // OCEAN,
    // SILICATE,
    // TOROIDAL!?
})(PlanetType || (PlanetType = {}));
const generateType = () => {
    return PlanetType.TERRESTRIAL;
};
const generateRadius = () => {
    return new Measure(0);
};
const generateDensity = () => {
    return new Ratio(0);
};
const generateMoons = () => {
    return 0;
};
export class Planet {
    // moons: Set<Moon>;
    constructor(descriptor) {
        var _a, _b, _c, _d;
        this.name = descriptor.name;
        this.type = (_a = descriptor.type) !== null && _a !== void 0 ? _a : generateType();
        this.meanRadius = (_b = descriptor.meanRadius) !== null && _b !== void 0 ? _b : generateRadius();
        this.meanDensity = (_c = descriptor.meanDensity) !== null && _c !== void 0 ? _c : generateDensity();
        this.numMoons = (_d = descriptor.numMoons) !== null && _d !== void 0 ? _d : generateMoons();
    }
}
//# sourceMappingURL=planet.js.map