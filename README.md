usage:

```js
import { UnderwaterEffect } from "./UnderwaterEffect.js";

// Other codes...

const underwaterEffect = new UnderwaterEffect(renderer, scene, camera);

function animate() {
  requestAnimationFrame(animate);

  // Update any animations or state...

  underwaterEffect.render();
}

// Handle resize
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  underwaterEffect.resize(window.innerWidth, window.innerHeight);
}
```
