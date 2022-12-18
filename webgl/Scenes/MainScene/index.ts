import * as THREE from 'three'
import { WebGLAppContext } from '~/webgl'
import { SceneContext } from '~~/types/context'
import AbstractScene from '~~/webgl/abstract/AbstractScene'
import { extendContext } from '~~/webgl/abstract/Context'
import DebugCamera from '~~/webgl/Components/Camera/DebugCamera'
import SimpleCamera from '~~/webgl/Components/Camera/SimpleCamera'

export type MainSceneContext = SceneContext<MainScene>

export default class MainScene extends AbstractScene<WebGLAppContext, THREE.PerspectiveCamera> {
  private debugCamera: DebugCamera
  private mainCamera: SimpleCamera

  private cubeExample: THREE.Mesh

  private sceneState = reactive({})

  private params = {
    debugCam: false,
  }

  protected declare context: MainSceneContext

  constructor(context: WebGLAppContext) {
    super(extendContext(context, { scene: () => this }))

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    this.debugCamera = new DebugCamera(this.context, { defaultPosition: new THREE.Vector3(0, 0, 15) })
    this.scene.add(this.debugCamera.object)

    this.mainCamera = new SimpleCamera(this.context, { defaultPosition: new THREE.Vector3(0, 0, 15) })
    this.scene.add(this.mainCamera.object)

    this.camera = this.params.debugCam ? this.debugCamera.object : this.mainCamera.object

    this.context.tweakpane
      .addInput(this.params, 'debugCam', { label: 'Debug Cam' })
      .on('change', ({ value }) => (this.camera = value ? this.debugCamera.object : this.mainCamera.object))

    this.setObjects()
  }

  private setObjects() {
    this.cubeExample = new THREE.Mesh(new THREE.BoxGeometry(1, 1), new THREE.MeshNormalMaterial())
    this.scene.add(this.cubeExample)
  }

  public tick(time: number, delta: number): void {
    this.debugCamera.tick(time, delta)
    this.cubeExample.rotateX(0.01)
    this.cubeExample.rotateY(0.005)
  }
}
