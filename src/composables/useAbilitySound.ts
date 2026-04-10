import { createNotification } from '~/composables/useNotification'
import { soundNormalAttack, soundTriggerAbilities } from '~/logic'

export function toggleAbilitySound(id: string) {
  const index = soundTriggerAbilities.value.indexOf(id)
  if (index >= 0)
    soundTriggerAbilities.value.splice(index, 1)
  else
    soundTriggerAbilities.value.push(id)
}

export function isAbilitySoundEnabled(id: string) {
  return soundTriggerAbilities.value.includes(id)
}

export function checkAndPlayAbilitySound(id: string | undefined) {
  if (id && isAbilitySoundEnabled(id))
    createNotification({ message: '技能触发提示', sound: 'warning' })
}

export function checkAndPlayNormalAttackSound() {
  if (soundNormalAttack.value)
    createNotification({ message: '攻击已发出', sound: 'tip' })
}
