## Install

```
npm install shaka-shader-lib
```

## Usage

```js
import { UnderwaterEffect } from "shaka-shader-lib";

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
