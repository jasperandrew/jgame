import { Measure } from "../../util/physics/measurable.js";
import { mass, time } from "../../util/physics/unit/types.js";

enum StarType {

}

interface StarDescriptor {
    initialMass?: Measure<mass>;
    age?: Measure<time>
}