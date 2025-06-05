<script setup lang="ts">
const list = [
  {
    level: 1,
    star: 1,
    max_star: 1,
    progress: 5,
    max_progress: 5,
    is_all_complete: true,
    is_daily_mission: true,
    level_details: {
      1: {
        level: 1,
        description: 'イベントマルチバトルを<br>5回クリアしよう！',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_4.png',
        reward_name: '宝晶石 ×50<br>火の戦貨 ×150',
        unit_id: '0',
      },
    },
  },
  {
    level: 1,
    star: 0,
    max_star: 4,
    progress: 0,
    max_progress: 3,
    is_all_complete: false,
    is_daily_mission: false,
    level_details: {
      1: {
        level: 1,
        description: 'マルチバトルの救援に3回参加',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: false,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_5.png',
        reward_name: '天導樹の枝 ×3<br>ブラールソール ×1',
        unit_id: '0',
      },
      2: {
        level: 2,
        description: 'マルチバトルの救援に5回参加',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: false,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_5.png',
        reward_name: '天導樹の枝 ×5<br>ブラールソール ×1',
        unit_id: '0',
      },
      3: {
        level: 3,
        description: 'マルチバトルの救援に10回参加',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: false,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_5.png',
        reward_name: '天導樹の枝 ×7<br>ブラールソール ×1',
        unit_id: '0',
      },
      4: {
        level: 4,
        description: 'マルチバトルの救援に15回参加',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: false,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_5.png',
        reward_name: '天導樹の枝 ×10<br>ブラールソール ×1',
        unit_id: '0',
      },
    },
  },
  {
    level: 4,
    star: 4,
    max_star: 4,
    progress: 15,
    max_progress: 15,
    is_all_complete: true,
    is_daily_mission: false,
    level_details: {
      1: {
        level: 1,
        description: 'HELLを3回クリア',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_2.png',
        reward_name: '火の戦貨 ×200',
        unit_id: '0',
      },
      2: {
        level: 2,
        description: 'HELLを5回クリア',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_2.png',
        reward_name: '火の戦貨 ×300',
        unit_id: '0',
      },
      3: {
        level: 3,
        description: 'HELLを10回クリア',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_2.png',
        reward_name: '火の戦貨 ×500',
        unit_id: '0',
      },
      4: {
        level: 4,
        description: 'HELLを15回クリア',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_2.png',
        reward_name: '火の戦貨 ×1000',
        unit_id: '0',
      },
    },
  },
  {
    level: 4,
    star: 4,
    max_star: 4,
    progress: 4,
    max_progress: 4,
    is_all_complete: true,
    is_daily_mission: false,
    level_details: {
      1: {
        level: 1,
        description: '戦貨ガチャ1箱目をリセット',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_3.png',
        reward_name: 'レジェンドガチャチケット ×1',
        unit_id: '0',
      },
      2: {
        level: 2,
        description: '戦貨ガチャ2箱目をリセット',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_3.png',
        reward_name: 'レジェンドガチャチケット ×1',
        unit_id: '0',
      },
      3: {
        level: 3,
        description: '戦貨ガチャ3箱目をリセット',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_3.png',
        reward_name: 'レジェンドガチャチケット ×1',
        unit_id: '0',
      },
      4: {
        level: 4,
        description: '戦貨ガチャ4箱目をリセット',
        image: '/event/treasureraid159/assets/event_mission/mission_1.png',
        is_complete: true,
        reward_image: '/event/treasureraid159/assets/event_mission/parts_small/icon_reward_3.png',
        reward_name: 'レジェンドガチャチケット ×1',
        unit_id: '0',
      },
    },
  },
]

// const $ = load(htmlString)
// const btnGlobalBannerElements = $('.prt-gacha-infomation')

// console.log(btnGlobalBannerElements.data('box-num'))

// const asd = btnGlobalBannerElements.find('.txt-gacha-point').text()
// console.log(asd)
</script>

<template>
  <el-card body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          活动信息(20箱)
        </div>
        <div>
          05.12 12:12:30
        </div>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <div v-for="mission, index in list" :key="index" flex items-start justify-between>
        <el-tooltip
          effect="dark"
          :content="mission.level_details[mission.level].reward_name"
          raw-content
          placement="top-start"
        >
          <div v-html="mission.level_details[mission.level].description" />
        </el-tooltip>

        <NumberLimitDisplay :value="{ number: Number(mission.progress), limit: Number(mission.max_progress) }" />
      </div>
    </div>
  </el-card>
</template>
