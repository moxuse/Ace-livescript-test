import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TorusGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  PointLight,
  Color
} from "three";

class RenderView {
  camera: PerspectiveCamera;
  scene: Scene = new Scene();
  renderer: WebGLRenderer;
  width: number;
  height: number;
  port: { scene: Scene };
  obj: Mesh;

  constructor() {
    this.port = this.init();
    this.animate();
  }

  init(): { scene: Scene } {
    // return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new WebGLRenderer({});
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 100);
    const el = document.getElementById("renderView");
    el.appendChild(this.renderer.domElement);

    this.scene.background = new Color(0xffffff);

    this.intiLight();

    this.obj = this.defaultObj();
    this.obj.position.set(0, 0, 0);
    this.scene.add(this.obj);

    return { scene: this.scene };
  }

  intiLight() {
    const ambientLight = new AmbientLight(0x2e9992);
    this.scene.add(ambientLight);

    let lights = [];
    lights[0] = new PointLight(0xffffff, 1, 0);
    lights[1] = new PointLight(0xffffff, 1, 0);
    lights[2] = new PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  }

  defaultObj() {
    const geom = new TorusGeometry(10, 3, 16, 100);
    const material = new MeshStandardMaterial({ color: 0x2194ce });
    return new Mesh(geom, material);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.obj.rotation.x += 0.005;
    this.obj.rotation.y += 0.005;

    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default RenderView;
