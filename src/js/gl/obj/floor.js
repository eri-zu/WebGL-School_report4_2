import { Mesh, MeshBasicMaterial, PlaneGeometry, Group } from "three";
import { radian } from "../../util/math";

export class Floor {
  constructor() {
    this.mesh;
    this.group = new Group();

    this.planes = [];

    this.setEvents();

    this.init();
  }

  static get PARAM() {
    return {
      w: 500,
      h: 500,
      eachW: 50,
      eachH: 50,
      num: 10,
    };
  }

  setEvents() {
    [...this.planes].forEach((el, i) => {
      el.addEventListener("click", (e) => {
        console.log("a");
      });
    });
  }

  init() {
    const m = new MeshBasicMaterial({
      color: "#fff",
    });

    for (let i = 0; i < Floor.PARAM.num; i++) {
      for (let j = 0; j < Floor.PARAM.num; j++) {
        const g = new PlaneGeometry(Floor.PARAM.eachW, Floor.PARAM.eachH);
        const mesh = new Mesh(g, m);
        mesh.position.x =
          (i - (Floor.PARAM.num * 0.5 - 0.5)) * Floor.PARAM.eachW;
        mesh.position.y =
          (j - (Floor.PARAM.num * 0.5 - 0.5)) * Floor.PARAM.eachH;
        this.group.add(mesh);
        this.planes.push(mesh);
      }
    }

    this.group.rotation.x = radian(-90);
  }
}
