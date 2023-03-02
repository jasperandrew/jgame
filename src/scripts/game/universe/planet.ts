import { Measure, Ratio } from "../../util/physics/measurable.js";
import { length, mass, volume } from "../../util/physics/unit/types.js";

enum PlanetType {
    TERRESTRIAL,
    ICY,
    GASEOUS,
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
}

interface PlanetDescriptor {
    name: string;
    type: PlanetType;
    meanRadius?: Measure<length>;
    meanDensity?: Ratio<mass,volume>;
    numMoons?: number;
    // moons: Set<Moon>;
}

const generateType = () => {
    return PlanetType.TERRESTRIAL;
}

const generateRadius = () => {
    return new Measure<length>(0);
}

const generateDensity = () => {
    return new Ratio<mass,volume>(0);
}

const generateMoons = () => {
    return 0;
}

export class Planet {
    
    name: string;
    type: PlanetType;
    meanRadius: Measure<length>;
    meanDensity: Ratio<mass,volume>;
    numMoons: number;
    // moons: Set<Moon>;

    constructor(descriptor: PlanetDescriptor) {
        this.name = descriptor.name;
        this.type = descriptor.type ?? generateType();
        this.meanRadius = descriptor.meanRadius ?? generateRadius();
        this.meanDensity = descriptor.meanDensity ?? generateDensity();
        this.numMoons = descriptor.numMoons ?? generateMoons();
    }

}