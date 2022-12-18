import { CustomWatch } from './reactiveUniforms'
import * as THREE from 'three'
import NoiseGenerator from 'webgl/Components/NoiseGenerator/index'
import { WebGLAppContext } from '~~/webgl'

const textureLoader = new THREE.TextureLoader()
export const textureWatch: CustomWatch<string | HTMLImageElement | THREE.Texture> = (uniform, object, key) =>
  watchEffect(() => {
    const value = object[key]
    if (typeof value == 'string') uniform.value = textureLoader.load(value, (t) => (t.encoding = THREE.LinearEncoding))
    if (typeof value == 'object' && 'isTexture' in value) uniform.value = value
    if (typeof value == 'object' && 'src' in value)
      uniform.value = textureLoader.load(value.src, (t) => (t.encoding = THREE.LinearEncoding))
  })

export const noiseWatch = (context: WebGLAppContext, noiseName: string) =>
  ((uniform, object, key) =>
    watch(
      object[key] as Object,
      (obj) => {
        uniform.value = context.noiseGenerator.render(noiseName, obj)
      },
      { immediate: true }
    )) as CustomWatch<Parameters<NoiseGenerator['render']>[1]>
