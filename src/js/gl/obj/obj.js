import { Group } from "three";
import { Fox } from "./fox";
import { Floor } from "./floor";

export class Obj {
  constructor(gltf) {
    this.group = new Group();
    this.gltf = gltf;
    this.prevTime = 0;

    this.init();
    this.setEvents();
  }

  static get PARAM() {
    return {
      color: "#fff",
      w: 50,
      h: 50,
      s: 50,
    };
  }

  init() {
    this.fox = new Fox(this.gltf);
    this.floor = new Floor();
    this.group.add(this.gltf.scene, this.floor.group);
  }

  onUpdate() {
    const now = Date.now();
    const time = (now - this.prevTime) / 1000; // 前フレームからの経過時間 0.17とか

    this.prevTime = now;

    if (this.fox) this.fox.onUpdate();
  }

  onResize(w, h) {}

  setEvents() {}
}
