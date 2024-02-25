import { Scene, AxesHelper, TextureLoader } from "three";
import { Renderer } from "./renderer";
import { Camera } from "./perspectiveCamera";
// import { GLTFLoader } from "threejs-full-es6";
// import { Camera } from "./orthographicCamera";
import { Obj } from "./obj/obj";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Light } from "./light";

export class Gl {
  constructor(wrap) {
    this.wrap = wrap;

    this.isLoaded = false;
    this.isHelper = true;

    this.init();
  }

  async init() {
    const gltf = await this.load();
    this.isLoaded = true;

    this.canvas = this.wrap.querySelector("canvas");
    this.renderer = new Renderer(this.canvas);
    this.scene = new Scene();
    this.camera = new Camera();
    this.light = new Light();
    this.obj = new Obj(gltf);

    this.scene.add(this.light.instance);
    this.scene.add(this.obj.group);

    this.setUtility();
  }

  async load() {
    const loader = new GLTFLoader();
    const src = "/model/Fox.glb";

    const p = new Promise((resolve) => {
      const gltf = loader.load(src, (gltf) => {
        resolve(gltf);
      });
    });

    return p;
  }

  onUpdate() {
    if (this.isLoaded) {
      if (this.controls) this.controls.update();
      this.obj.onUpdate();

      this.renderer.instance.render(this.scene, this.camera.instance);
    }
  }

  onResize() {
    const w = this.wrap.clientWidth;
    const h = this.wrap.clientHeight;

    this.renderer.onResize(w, h);
    this.camera.onResize(w, h);
    this.obj.onResize(w, h);
  }

  setUtility() {
    // helper
    if (this.isHelper) {
      const axesBarLength = 600.0;
      this.axesHelper = new AxesHelper(axesBarLength);
      this.scene.add(this.axesHelper);
    }

    // orbit control
    this.controls = new OrbitControls(this.camera.instance, this.canvas);
  }
}
