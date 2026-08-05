/** Transição de fade entre cenas Phaser */
export function fadeToScene(scene, key, data = {}, duration = 350) {
  const cam = scene.cameras.main;
  cam.fadeOut(duration, 10, 20, 40);
  cam.once('camerafadeoutcomplete', () => {
    scene.scene.start(key, data);
  });
}

export function fadeIn(scene, duration = 400) {
  scene.cameras.main.fadeIn(duration, 10, 20, 40);
}
