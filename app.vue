<template>
  <div :style="{ '--vh': vh, display: $params.dom ? 'block' : 'none' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div class="tweakpane" v-if="showTweakpane"></div>
</template>

<script setup lang="ts">
const { $webgl, $tweakpane, $params } = useNuxtApp()

const showTweakpane = ref(true)

const vh = ref('0px')

useCleanup(() => {
  if ($tweakpane.disabled) showTweakpane.value = false
  let rafId: ReturnType<typeof requestAnimationFrame>
  const fpsGraph = $tweakpane.addBlade({
    view: 'fpsgraph',
    label: 'fpsgraph',
    lineCount: 2,
    index: 0,
  })

  const refreshButton = $tweakpane.addButton({ title: 'Refresh', index: 1 })
  refreshButton.on('click', () => $tweakpane.refresh())

  function raf() {
    ;(fpsGraph as any).begin()
    $webgl.tick()
    ;(fpsGraph as any).end()
    requestAnimationFrame(raf)
  }

  document.body.append($webgl.renderer.domElement)
  $webgl.renderer.domElement.classList.add('threejs')
  raf()

  const setVh = () => {
    vh.value = window.innerHeight * 0.01 + 'px'
  }
  setVh()

  window.addEventListener('resize', setVh, { passive: true })

  return () => {
    window.cancelAnimationFrame(rafId)
    fpsGraph.dispose()
    refreshButton.dispose()
    window.removeEventListener('resize', setVh)
  }
})
</script>
