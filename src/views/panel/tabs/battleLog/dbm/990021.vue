<script setup lang="ts">
import type { BattleRecord } from 'myStorage'
import type { AttackResultJson } from 'requestData'

// 不动-水木桩
const props = defineProps<{ battleRecord: BattleRecord; resultJson: { type: string; result: AttackResultJson } }>()

// 奥义或技能每造成5kw伤害下一回合就会触发特动
const limit = ref(50000000)
const abilityCount = ref(0)

const specialDamageTotal = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => {
    pre += cur.damage.special.value
    return pre
  }, 0),
)

const abilityDamageTotal = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => {
    pre += cur.damage.ability.value
    return pre
  }, 0))

watch(() => props.resultJson, (data) => {
  if (data.type === 'ability') {
    if (abilityCount.value >= 6)
      abilityCount.value = 0
    abilityCount.value++
  }
})
</script>

<template>
  <ElCard w-full>
    <div flex flex-col>
      <div flex gap-10px>
        <ElCard w-250px fc>
          <div mb-10px w-200px>
            <div mx-5px mb-10px flex items-center justify-between>
              <div>
                奥伤
              </div>
              <div text-base>
                {{ `${(limit - specialDamageTotal % limit).toLocaleString()}` }}
              </div>
            </div>
            <ElProgress :percentage=" specialDamageTotal % limit / limit * 100 " color="#e6a23c" text-inside>
              <div />
            </ElProgress>
          </div>
          <div w-200px>
            <div mx-5px mb-10px flex items-center justify-between>
              <div>
                技伤
              </div>
              <div text-base>
                {{ `${(limit - abilityDamageTotal % limit).toLocaleString()}` }}
              </div>
            </div>
            <ElProgress :percentage="abilityDamageTotal % limit / limit * 100" color="#e6a23c" text-inside>
              <div />
            </ElProgress>
          </div>
        </ElCard>
        <ElCard w-200px fc>
          <div fc flex-col>
            <div text-base>
              使用技能数：<span text-2xl>{{ abilityCount }}</span>
            </div>
            <div mt-10px btn @click="abilityCount = 0">
              重置
            </div>
          </div>
        </ElCard>
      </div>

      <div mt-10px flex gap-10px>
        <ElCard w-500px>
          <div text-start text-base>
            <div font-bold>
              前9回合(只打2c 快速叠满巴尔被动 优先主+愚者)
            </div>
            <div>1. 肥宅 魔术师43 愚者搓药23 巴尔连主 主34</div>
            <div>2. 大巴 魔术师1</div>
            <div>3. <ElTag>满豆</ElTag> 魔术师1 主1</div>
            <div>4. 魔术师1</div>
            <div>5. <ElTag>满豆</ElTag> 魔术师1 巴尔3</div>
            <div>6. 魔术师1</div>
            <div>7. <ElTag>满豆</ElTag> 魔术师41</div>
            <div>8. 大巴 魔术师1 愚者2 等90%A</div>
            <div>9. <ElTag>90特动</ElTag> 肥宅 魔术师1 主1 愚者斩偷跑</div>
          </div>
        </ElCard>
        <ElCard w-500px>
          <div text-start text-base>
            <div>火风: 奥义👉36hit, 技能👉5次奥义</div>
            <div>水土: 奥义👉4回TA, 技能👉FC</div>
            <div>光暗: 奥义👉5回技能, 技能👉10回弱体</div>
            <div>90%特动(9次) 主1(6次) 愚者斩偷跑</div>
            <div>70%特动(12次) 主1(8次) 愚者斩偷跑+召唤</div>
            <div>50%特动(15次) 主1(10次) 愚者斩偷跑复制</div>
            <div>40后满豆特动三种👉3次驱散/40hit/2500w伤害</div>
            <div>👉2000w奥义💥主1 大巴 4c</div>
            <div>👉2000w技伤💥魔术师4</div>
            <div>👉10回弱体💥巴尔1</div>
            <div>👉200w*10💥愚者斩/偷跑/复制</div>
            <div>👉FC💥FC</div>
          </div>
        </ElCard>
      </div>
    </div>
  </ElCard>
</template>
