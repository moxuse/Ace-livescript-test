import { YNode, Port } from "../Types";
import TorusMesh from "./Nodes/Mesh/TorusMsh";

export default function(port: Port) {
  const throughput = (input: string) => {
    console.log("context is:", port);
  };

  /*
    Render function
  */
  const render = (input: YNode) => {
    switch (input.type) {
      case "Mesh":
        console.log("in render swith", port);
        port.scene.add(input);
        break;
      default:
        break;
    }
  };

  const torus = TorusMesh();
  return { render, throughput, torus };
}
