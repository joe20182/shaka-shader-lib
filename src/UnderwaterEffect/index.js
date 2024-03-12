import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

export class UnderwaterEffect {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.composer = null;
    this.shaderPass = null;
    this.initEffect();
  }

  initEffect() {
    // Create render target
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );

    // Create shader pass with your underwater shader
    this.shaderPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        // Add other uniforms specific to the underwater effect here
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv;
          // Add some distortion based on time for a wavy effect
          uv.y += 0.02 * sin(uv.x * 10.0 + uTime * 0.5);
          uv.x += 0.02 * sin(uv.y * 10.0 + uTime * 0.5);
          
          // Sample the original texture with the new UV coordinates
          vec4 original = texture2D(tDiffuse, uv);
          
          // Apply color correction
          original.rgb *= vec3(0.8, 0.9, 1.0);
          
          gl_FragColor = original;
        }
      `,
    });

    // Create effect composer
    this.composer = new EffectComposer(this.renderer, renderTarget);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.shaderPass);
  }

  render(elapedTime) {
    // Render the scene through the composer chain
    this.composer.render();
    this.shaderPass && (this.shaderPass.uniforms.uTime.value = elapedTime);
  }

  // Method to handle resizing of the effect
  resize(width, height) {
    this.composer.setSize(width, height);
  }
}
