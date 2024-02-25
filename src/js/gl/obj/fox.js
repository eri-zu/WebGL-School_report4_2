import { AnimationMixer, LoopRepeat, Clock } from "three";

export class Fox {
  constructor(gltf) {
    this.gltf = gltf;
    this.clock = new Clock();
    this.init();
  }

  init() {
    this.mixer = new AnimationMixer(this.gltf.scene);
    const animations = this.gltf.animations;

    this.actions = [];

    console.log(animations);

    for (let i = 0; i < animations.length; i++) {
      this.actions.push(this.mixer.clipAction(animations[i]));
      this.actions[i].setLoop(LoopRepeat);
      this.actions[i].play();
      this.actions[i].weight = 0;
    }

    this.actions[0].weight = 1;
  }

  onUpdate() {
    const delta = this.clock.getDelta();

    this.mixer.update(delta);
  }
}
