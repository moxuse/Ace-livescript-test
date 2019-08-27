import { Mesh, TorusGeometry, MeshStandardMaterial } from "three";

export default function(): Mesh {
  const geom = new TorusGeometry(10, 3, 16, 100);
  const material = new MeshStandardMaterial({ color: 0x2194ce });
  return new Mesh(geom, material);
}
