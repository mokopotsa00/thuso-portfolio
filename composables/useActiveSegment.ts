import { ref } from 'vue'
import { SEGMENTS } from '~/data/index'

const activeIdx = ref(0)
const pauseUntil = ref(0)
const PAUSE_MS = 9000

export function useActiveSegment() {
  function setActive(i: number, fromUser = false) {
    const len = SEGMENTS.length
    activeIdx.value = ((i % len) + len) % len
    if (fromUser) pauseUntil.value = Date.now() + PAUSE_MS
  }

  function isPaused() {
    return Date.now() < pauseUntil.value
  }

  return { activeIdx, setActive, isPaused }
}
