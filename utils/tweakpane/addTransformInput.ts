import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { FolderApi } from 'tweakpane'
import { WebGLAppContext } from '~~/webgl'

export default function <T extends Object, K extends keyof T & string>(
  context: WebGLAppContext & { scene: { scene: THREE.Scene; camera: THREE.Camera } },
  object: T,
  key: K,
  mesh: THREE.Mesh,
  folderParams: Parameters<FolderApi['addFolder']>[0] = { title: key }
) {
  const folder = context.tweakpane.addFolder(folderParams)
  folder.addInput(object, key, { label: 'Enable controls' })

  folder.addInput(mesh, 'position', {
    label: 'Position',
    x: { step: 0.1 },
    y: { step: 0.1 },
    z: { step: 0.1 },
  })
  folder.addInput(mesh, 'rotation', {
    label: 'Rotation',
    x: { step: 0.1 },
    y: { step: 0.1 },
    z: { step: 0.1 },
  })
  folder.addInput(mesh, 'scale', {
    label: 'Scale',
    x: { step: 0.1 },
    y: { step: 0.1 },
    z: { step: 0.1 },
  })
  // const params = object[key]! as {}

  watch(
    () => object[key],
    (useControls, __, onCleanup) => {
      if (!useControls) return
      const controls = new TransformControls(context.scene.camera, context.renderer.domElement)
      controls.attach(mesh)
      context.scene.scene.add(controls)
      const input = folder.addInput(controls, 'mode', {
        options: ['translate', 'rotate', 'scale'].map((key) => ({ text: key, value: key })),
      })

      onCleanup(() => {
        controls.detach()
        context.scene.scene.remove(controls)
        controls.dispose()
        input.dispose()
      })
    }
  )
}
