import { WebGLAppContext } from '..'
import AbstractScene from './AbstractScene'

export type SceneContext<T extends THREE.Camera = THREE.Camera> = WebGLAppContext & {
  scene: AbstractScene<WebGLAppContext, T>
}
