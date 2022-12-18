import { FolderApi } from 'tweakpane'
import { WebGLAppContext } from '~~/webgl'
import NoiseGenerator from '~~/webgl/Components/NoiseGenerator'

// export default function <K extends string, T extends { [Property in K]: Parameters<NoiseGenerator['render']>[1] }>(
export default function <T extends Object, K extends keyof T & string>(
  context: WebGLAppContext,
  object: T,
  key: K,
  folderParams: Parameters<FolderApi['addFolder']>[0] = { title: key }
) {
  const folder = context.tweakpane.addFolder(folderParams)
  const params = object[key]! as Parameters<NoiseGenerator['render']>[1]
  if (!params) throw new Error('No noise params was found')
  if ('noiseScale' in params) folder.addInput(params, 'noiseScale', { step: 1, label: 'Noise scale' })
  if ('octave' in params) folder.addInput(params, 'octave', { min: 0, max: 15, step: 1, label: 'Octave' })
  if ('size' in params)
    folder.addInput(params, 'size', {
      label: 'Texture size',
      x: { min: 0, max: 2048, step: 1 },
      y: { min: 0, max: 2048, step: 1 },
    })
}
