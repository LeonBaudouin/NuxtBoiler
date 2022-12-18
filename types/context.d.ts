import { WebGLAppContext } from '~~/webgl'

export type SceneContext<S extends AbstractScene> = WebGLAppContext & { scene: S }
