<template>
  <div :style="{ '--vh': vh }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div class="tweakpane" v-if="showTweakpane"></div>
</template>

<script setup lang="ts">
const { $webgl, $tweakpane } = useNuxtApp()

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
    $webgl.tick()
    requestAnimationFrame(raf)
  }

  document.body.append($webgl.renderer.domElement)
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

<style lang="scss">
* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.tweakpane {
  position: absolute;
  top: 0;
  right: 0;
  width: 256px;
  overflow: auto;
  height: 100vh;
}

a {
  display: block;
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
}

body > canvas {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: white;
  width: 100% !important;
  height: 100% !important;
  user-select: none;
}
.tp-fldv_c > .tp-cntv,
.tp-tabv_c .tp-brkv > .tp-cntv {
  margin-left: 0 !important;
}
</style>
