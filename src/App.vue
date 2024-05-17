<script setup lang="ts">
import type { Deck } from 'party'
import Effect from '~/views/debugger/tabs/party/components/Effect.vue'
import Weapon from '~/views/debugger/tabs/party/components/Weapon.vue'
import Npc from '~/views/debugger/tabs/party/components/Npc.vue'
import Summon from '~/views/debugger/tabs/party/components/Summon.vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'

const tableData = ref([1])
const dialogVisible = ref(false)
const currentDeck = ref<Deck>({
  priority: '155',
  leader: {
    id: 25246588,
    attack: 109899,
    hp: 25422,
    attribute: 3,
    kind: 1,
    image: '310901_sw_1_01',
  },
  leaderAbilityList: [

  ],
  npcs: [
    {
      id: 202459624,
      image_id_3: 'skin/3710201000_01_s3',
      has_npcaugment_constant: true,
      master: {
        id: '3040405000',
        name: 'ガレヲン',
      },
      action_ability: [

      ],
    },
    {
      id: 191740328,
      image_id_3: '3040361000_01',
      has_npcaugment_constant: false,
      master: {
        id: '3040361000',
        name: 'ククル',
      },
      action_ability: [
        {
          action_id: '227641',
          name: 'スプレッドショット＋',
          icon_type: '1',
          user_full_auto_setting_flag: 0,
        },
        {
          action_id: '227661',
          name: 'バレットダンス＋',
          icon_type: '1',
          user_full_auto_setting_flag: 0,
        },
        {
          action_id: '227671',
          name: 'スピードローダー',
          icon_type: '1',
          user_full_auto_setting_flag: 0,
        },
      ],
    },
    {
      id: 194790913,
      image_id_3: 'skin/3710195000_01_s3',
      has_npcaugment_constant: true,
      master: {
        id: '3040377000',
        name: 'シンダラ',
      },
      action_ability: [
        {
          action_id: '229011',
          name: '悪運散虎＋',
          icon_type: '1',
          user_full_auto_setting_flag: 1,
        },
        {
          action_id: '229041',
          name: '良運招虎＋',
          icon_type: '1',
          user_full_auto_setting_flag: 1,
        },
        {
          action_id: '229061',
          name: '双虎風水',
          icon_type: '3',
          user_full_auto_setting_flag: 1,
        },
      ],
    },
    {
      id: 178700330,
      image_id_3: 'skin/3710165000_01_s3',
      has_npcaugment_constant: false,
      master: {
        id: '3040296000',
        name: 'ディアンサ',
      },
      action_ability: [
        {
          action_id: '222791',
          name: 'スタンドプレイII＋',
          icon_type: '3',
          user_full_auto_setting_flag: 1,
        },
        {
          action_id: '222811',
          name: 'カラフルチアー＋',
          icon_type: '3',
          user_full_auto_setting_flag: 1,
        },
        {
          action_id: '222821',
          name: 'ファインド・ユア・スター',
          icon_type: '3',
          user_full_auto_setting_flag: 1,
        },
      ],
    },
    {
      id: 131573433,
      image_id_3: '3040039000_03',
      has_npcaugment_constant: false,
      master: {
        id: '3040039000',
        name: 'エッセル',
      },
      action_ability: [
        {
          action_id: '227081',
          name: 'インテンスバレット＋＋',
          icon_type: '1',
          user_full_auto_setting_flag: 1,
        },
        {
          action_id: '5035',
          name: 'ラストオーダー＋＋',
          icon_type: '3',
          user_full_auto_setting_flag: 0,
        },
        {
          action_id: '4620',
          name: 'スターダスト＋',
          icon_type: '1',
          user_full_auto_setting_flag: 0,
        },
        {
          action_id: '8023',
          name: '十狼の雄叫び',
          icon_type: '3',
          user_full_auto_setting_flag: 0,
        },
      ],
    },
  ],
  setAction: [

  ],
  weapons: {
    1: {
      param: {
        id: 4183878141,
        image_id: '1040022900',
        level: '150',
        attack: '3911',
        hp: '393',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '15',
      },
      master: {
        id: '1040022900',
        name: 'フルンティング',
        attribute: '3',
        kind: '1',
        rarity: '4',
        is_group: '26',
        series_id: '35',
        pre_weapon_skill_index: '',
        skill1_display: '0',
        skill2_display: '0',
        skill3_display: '',
      },
      skill1: {
        id: '1925',
        description: '<span class=text-small>バトル開始時にサーヴェイジ・ミソロジー効果(毎ターンダメージを受けるが攻撃UP/防御大幅UP/ターン進行時に攻撃行動を2回行う)<br>◆メイン装備時/主人公のみ</span>',
        image: 'skill_job_weapon',
        attribute: '',
        name: 'サーヴェイジ・ミソロジー',
      },
      skill2: {
        id: '1926',
        description: '<span class=text-small>土属性キャラが受けるターンダメージを軽減/ターンダメージを受けた時、土属性追撃効果(1回)<br>◆メイン装備時</span>',
        image: 'skill_job_weapon',
        attribute: '3',
        name: 'アバンドン・ロール',
      },
      skill3: {
        id: '132',
        description: '土属性キャラのHPが少ないほど攻撃力が上昇(大)',
        image: 'skill_backwater_3_3',
        attribute: '3',
        name: '地裂の背水',
      },
      hidden_skill1: null,
      hidden_skill2: null,
    },
    2: {
      param: {
        id: 4456659664,
        image_id: '1040025400',
        level: '150',
        attack: '3773',
        hp: '380',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '1',
      },
      master: {
        id: '1040025400',
        name: '天枢・極星剣',
        attribute: '4',
        kind: '1',
        rarity: '4',
        is_group: '',
        series_id: '41',
        pre_weapon_skill_index: '',
        skill1_display: '0',
        skill2_display: '0',
        skill3_display: '0',
      },
      skill1: {
        id: '1841',
        description: '装備している「剣」の数が多いほど攻撃力上昇',
        image: 'skill_job_weapon',
        attribute: '',
        name: 'ボルテージ・オブ・ソードII',
      },
      skill2: {
        id: '2248',
        description: '<span class=text-small>攻撃力/連続攻撃確率/奥義性能/ダメージ上限上昇<br>◆得意武器「剣」のキャラに対して性能UP</span>',
        image: 'skill_job_weapon',
        attribute: '',
        name: '聖刻裁の誓い',
      },
      skill3: {
        id: '2280',
        description: '攻撃力/最大HP/防御力上昇',
        image: 'skill_job_weapon',
        attribute: '',
        name: '極星の光輝',
      },
      hidden_skill1: {
        id: '2258',
        description: '<span class=text-small>攻撃力/連続攻撃確率/奥義性能/ダメージ上限上昇<br>◆得意武器「剣」のキャラに対して性能UP</span>',
        image: 'skill_job_weapon',
        attribute: '',
        name: '聖刻裁の誓い',
      },
      hidden_skill2: null,
    },
    3: {
      param: {
        id: 4428527713,
        image_id: '1040117700',
        level: '150',
        attack: '4225',
        hp: '424',
        bonus_attack: 500,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '20',
        arousal_form: '1',
        arousal_exp: '10500',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: true,
          level: 20,
          form: 1,
          form_name: '攻撃',
          remain_for_next_level: 0,
          width: 100,
          is_complete_condition: true,
          release_conditions: [
            {
              condition_type: '1',
              condition_value: '100',
              is_cleared: true,
            },
          ],
          max_level: 20,
          total_bonus: {
            2: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
            3: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
            4: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
            5: [
              {
                name: '攻撃力',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [

                ],
                disp_string: '+%s',
                effect_value: 100,
              },
            ],
            6: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 3,
              },
            ],
            7: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 3,
              },
            ],
            8: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 3,
              },
            ],
            9: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 3,
              },
            ],
            10: [
              {
                name: '攻撃力',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [

                ],
                disp_string: '+%s',
                effect_value: 100,
              },
            ],
            11: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 4,
              },
            ],
            12: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 4,
              },
            ],
            13: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 4,
              },
            ],
            14: [
              {
                name: '攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
            15: [
              {
                name: '攻撃力',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [

                ],
                disp_string: '+%s',
                effect_value: 300,
              },
            ],
            16: [
              {
                name: '土属性攻撃力',
                image: 'bonus_10',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
            17: [
              {
                name: 'EX攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
            18: [
              {
                name: '土属性攻撃力',
                image: 'bonus_10',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 3,
              },
            ],
            19: [
              {
                name: 'EX攻刃',
                image: 'bonus_1',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
            20: [
              {
                name: '土属性攻撃力',
                image: 'bonus_10',
                attribute_image: 'icon_type_3',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 10,
              },
            ],
          },
          total_acquired_bonus: [
            {
              status_id: '183',
              level: '2',
              name: '攻刃',
              effect_value: 35,
              disp_string: '+%s%',
              image: 'bonus_1',
              attribute_image: 'icon_type_3',
              weapon_kind_images: [

              ],
            },
            {
              status_id: '2',
              level: '5',
              name: '攻撃力',
              effect_value: 500,
              disp_string: '+%s',
              image: 'bonus_1',
              attribute_image: '',
              weapon_kind_images: [

              ],
            },
            {
              status_id: '103',
              level: '16',
              name: '土属性攻撃力',
              effect_value: 15,
              disp_string: '+%s%',
              image: 'bonus_10',
              attribute_image: 'icon_type_3',
              weapon_kind_images: [

              ],
            },
            {
              status_id: '113',
              level: '17',
              name: 'EX攻刃',
              effect_value: 10,
              disp_string: '+%s%',
              image: 'bonus_1',
              attribute_image: 'icon_type_3',
              weapon_kind_images: [

              ],
            },
          ],
          skill: [
            {
              skill_id: 2129,
              name: '攻刃',
              comment: '土属性キャラの攻撃力上昇',
              image: 'ex_skill_atk',
              disp_string: '+%s%',
              effect_value: 35,
            },
            {
              skill_id: 2057,
              name: '土属性攻撃力',
              comment: '土属性キャラの土属性攻撃力UP',
              image: 'ex_skill_attribute_3',
              disp_string: '+%s%',
              effect_value: 15,
            },
            {
              skill_id: 2063,
              name: 'EX攻刃',
              comment: '土属性キャラの攻撃力上昇',
              image: 'ex_skill_atk_ex',
              disp_string: '+%s%',
              effect_value: 10,
            },
          ],
          is_caution: false,
        },
        skill_level: '15',
      },
      master: {
        id: '1040117700',
        name: '竜伐の剛牙・再誕',
        attribute: '3',
        kind: '2',
        rarity: '4',
        is_group: '',
        series_id: '37',
        pre_weapon_skill_index: '',
        skill1_display: '',
        skill2_display: '',
        skill3_display: '',
      },
      skill1: {
        id: '1947',
        description: '土属性キャラの攻撃力上昇(大)/毎ターンダメージを受ける',
        image: 'skill_noroi_m_3_3',
        attribute: '3',
        name: '創樹方陣・呪印III',
      },
      skill2: {
        id: '376',
        description: '<span class=text-small>土属性キャラの攻撃力と最大HPが上昇(小)</span>',
        image: 'skill_god_3',
        attribute: '3',
        name: '土の神威',
      },
      skill3: null,
      hidden_skill1: null,
      hidden_skill2: null,
    },
    4: {
      param: {
        id: 3168689901,
        image_id: '1040910000',
        level: '150',
        attack: '4007',
        hp: '356',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '4',
        arousal_form: '7',
        arousal_exp: '2000',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: true,
          level: 4,
          form: 7,
          form_name: '連続攻撃',
          remain_for_next_level: 0,
          width: 100,
          is_complete_condition: true,
          release_conditions: [
            {
              condition_type: '1',
              condition_value: '150',
              is_cleared: true,
            },
          ],
          max_level: 4,
          total_bonus: {
            2: [
              {
                name: 'TA確率',
                image: 'bonus_21',
                attribute_image: '',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
            3: [
              {
                name: 'DA確率',
                image: 'bonus_20',
                attribute_image: '',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 20,
              },
            ],
            4: [
              {
                name: 'TA確率',
                image: 'bonus_21',
                attribute_image: '',
                weapon_kind_images: [

                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
          },
          total_acquired_bonus: [
            {
              status_id: '40',
              level: '2',
              name: 'TA確率',
              effect_value: 10,
              disp_string: '+%s%',
              image: 'bonus_21',
              attribute_image: '',
              weapon_kind_images: [

              ],
            },
            {
              status_id: '39',
              level: '3',
              name: 'DA確率',
              effect_value: 20,
              disp_string: '+%s%',
              image: 'bonus_20',
              attribute_image: '',
              weapon_kind_images: [

              ],
            },
          ],
          skill: [
            {
              skill_id: 2291,
              name: 'トリプルアタック確率',
              comment: '味方全体のトリプルアタック確率上昇',
              image: 'ex_skill_ta_only',
              disp_string: '+%s%',
              effect_value: 10,
            },
            {
              skill_id: 2290,
              name: 'ダブルアタック確率',
              comment: '味方全体のダブルアタック確率上昇',
              image: 'ex_skill_da',
              disp_string: '+%s%',
              effect_value: 20,
            },
          ],
          is_caution: true,
        },
        skill_level: '15',
      },
      master: {
        id: '1040910000',
        name: '一期一振',
        attribute: '3',
        kind: '10',
        rarity: '4',
        is_group: '6',
        series_id: '2',
        pre_weapon_skill_index: '',
        skill1_display: '',
        skill2_display: '',
        skill3_display: '',
      },
      skill1: {
        id: '628',
        description: '土属性キャラの攻撃力上昇(特大)',
        image: 'skill_atk_3_4_3',
        attribute: '3',
        name: '地裂の攻刃III',
      },
      skill2: {
        id: '916',
        description: '土属性キャラのHPが多いほど攻撃力が上昇(中)',
        image: 'skill_whole_3_2',
        attribute: '3',
        name: '大地の渾身',
      },
      skill3: null,
      hidden_skill1: null,
      hidden_skill2: null,
    },
    5: {
      param: {
        id: 4446646561,
        image_id: '1040618200',
        level: '150',
        attack: '3581',
        hp: '436',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '15',
      },
      master: {
        id: '1040618200',
        name: 'パイルスマッシュ',
        attribute: '3',
        kind: '7',
        rarity: '4',
        is_group: '6',
        series_id: '2',
        pre_weapon_skill_index: '',
        skill1_display: '0',
        skill2_display: '0',
        skill3_display: '',
      },
      skill1: {
        id: '1790',
        description: '土属性キャラの与ダメージ上昇',
        image: 'skill_job_weapon',
        attribute: '3',
        name: '界の約定',
      },
      skill2: {
        id: '1846',
        description: '装備している「格闘」の数が多いほど攻撃力上昇',
        image: 'skill_job_weapon',
        attribute: '',
        name: 'ボルテージ・オブ・ガントレットII',
      },
      skill3: {
        id: '1782',
        description: '土属性キャラのダメージ上限上昇',
        image: 'skill_job_weapon',
        attribute: '3',
        name: '界の真髄',
      },
      hidden_skill1: null,
      hidden_skill2: null,
    },
    6: {
      param: {
        id: 4446646281,
        image_id: '1040618200',
        level: '150',
        attack: '3581',
        hp: '436',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '15',
      },
      master: {
        id: '1040618200',
        name: 'パイルスマッシュ',
        attribute: '3',
        kind: '7',
        rarity: '4',
        is_group: '6',
        series_id: '2',
        pre_weapon_skill_index: '',
        skill1_display: '0',
        skill2_display: '0',
        skill3_display: '',
      },
      skill1: {
        id: '1790',
        description: '土属性キャラの与ダメージ上昇',
        image: 'skill_job_weapon',
        attribute: '3',
        name: '界の約定',
      },
      skill2: {
        id: '1846',
        description: '装備している「格闘」の数が多いほど攻撃力上昇',
        image: 'skill_job_weapon',
        attribute: '',
        name: 'ボルテージ・オブ・ガントレットII',
      },
      skill3: {
        id: '1782',
        description: '土属性キャラのダメージ上限上昇',
        image: 'skill_job_weapon',
        attribute: '3',
        name: '界の真髄',
      },
      hidden_skill1: null,
      hidden_skill2: null,
    },
    7: {
      param: {
        id: 2688997600,
        image_id: '1040809500_03',
        level: '250',
        attack: '4185',
        hp: '484',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '25',
      },
      master: {
        id: '1040809500',
        name: '永遠拒絶の竪琴',
        attribute: '3',
        kind: '9',
        rarity: '4',
        is_group: '17',
        series_id: '3',
        pre_weapon_skill_index: '',
        skill1_display: '',
        skill2_display: '0',
        skill3_display: '0',
      },
      skill1: {
        id: '2200',
        description: '<span class=text-small>土属性キャラの攻撃力と最大HPが上昇(大)/与ダメージUP(大)</span>',
        image: 'skill_atk_hp_rise_m_3_3',
        attribute: '3',
        name: '創樹方陣・神醒III',
      },
      skill2: {
        id: '2208',
        description: '通常攻撃のダメージ上限上昇/連続攻撃確率上昇',
        image: 'skill_normal_limit_3',
        attribute: '',
        name: 'アルファ・リベレイション・ルベルII',
      },
      skill3: {
        id: '1726',
        description: '自属性追撃効果/奥義ゲージ上昇量大幅DOWN',
        image: 'skill_job_weapon',
        attribute: '',
        name: '虚偽と詐術',
      },
      hidden_skill1: null,
      hidden_skill2: null,
    },
    8: {
      param: {
        id: 4048225010,
        image_id: '1040420500',
        level: '150',
        attack: '3360',
        hp: '481',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '15',
      },
      master: {
        id: '1040420500',
        name: '巌迫の躯杖',
        attribute: '3',
        kind: '5',
        rarity: '4',
        is_group: '6',
        series_id: '2',
        pre_weapon_skill_index: '',
        skill1_display: '0',
        skill2_display: '',
        skill3_display: '',
      },
      skill1: {
        id: '1891',
        description: '同じ武器を3つ以上装備している時、土属性キャラの攻撃力/防御力/ダメージ上限上昇',
        image: 'skill_job_weapon',
        attribute: '3',
        name: 'アンバー・レゾネーター',
      },
      skill2: {
        id: '376',
        description: '<span class=text-small>土属性キャラの攻撃力と最大HPが上昇(小)</span>',
        image: 'skill_god_3',
        attribute: '3',
        name: '土の神威',
      },
      skill3: null,
      hidden_skill1: null,
      hidden_skill2: null,
    },
    9: {
      param: {
        id: 4049668847,
        image_id: '1040420500',
        level: '150',
        attack: '3360',
        hp: '481',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '15',
      },
      master: {
        id: '1040420500',
        name: '巌迫の躯杖',
        attribute: '3',
        kind: '5',
        rarity: '4',
        is_group: '6',
        series_id: '2',
        pre_weapon_skill_index: '',
        skill1_display: '0',
        skill2_display: '',
        skill3_display: '',
      },
      skill1: {
        id: '1891',
        description: '同じ武器を3つ以上装備している時、土属性キャラの攻撃力/防御力/ダメージ上限上昇',
        image: 'skill_job_weapon',
        attribute: '3',
        name: 'アンバー・レゾネーター',
      },
      skill2: {
        id: '376',
        description: '<span class=text-small>土属性キャラの攻撃力と最大HPが上昇(小)</span>',
        image: 'skill_god_3',
        attribute: '3',
        name: '土の神威',
      },
      skill3: null,
      hidden_skill1: null,
      hidden_skill2: null,
    },
    10: {
      param: {
        id: 4049669624,
        image_id: '1040420500',
        level: '150',
        attack: '3360',
        hp: '481',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '15',
      },
      master: {
        id: '1040420500',
        name: '巌迫の躯杖',
        attribute: '3',
        kind: '5',
        rarity: '4',
        is_group: '6',
        series_id: '2',
        pre_weapon_skill_index: '',
        skill1_display: '0',
        skill2_display: '',
        skill3_display: '',
      },
      skill1: {
        id: '1891',
        description: '同じ武器を3つ以上装備している時、土属性キャラの攻撃力/防御力/ダメージ上限上昇',
        image: 'skill_job_weapon',
        attribute: '3',
        name: 'アンバー・レゾネーター',
      },
      skill2: {
        id: '376',
        description: '<span class=text-small>土属性キャラの攻撃力と最大HPが上昇(小)</span>',
        image: 'skill_god_3',
        attribute: '3',
        name: '土の神威',
      },
      skill3: null,
      hidden_skill1: null,
      hidden_skill2: null,
    },
    11: {
      param: {
        id: 3578824876,
        image_id: '1040313500',
        level: '200',
        attack: '3462',
        hp: '253',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '0',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '20',
      },
      master: {
        id: '1040313500',
        name: 'クラッシュ・オブ・ザ・タワー',
        attribute: '3',
        kind: '4',
        rarity: '4',
        is_group: '23',
        series_id: '30',
        pre_weapon_skill_index: '',
        skill1_display: '',
        skill2_display: '0',
        skill3_display: '',
      },
      skill1: {
        id: '1830',
        description: '<span class=text-small>土属性キャラの攻撃力上昇(特大)/主人公が3ターン毎に敵全体に土属性ダメージ</span>',
        image: 'skill_evoker_3',
        attribute: '3',
        name: '魔術師と塔の天災',
      },
      skill2: {
        id: '1959',
        description: '<span class=text-small>土属性キャラのダメージ上限UP　<br>◆アーカルムの転世でさらにダメージ上限UP</span>',
        image: 'skill_limit_arcarum_3',
        attribute: '3',
        name: 'セフィラマキシ・アース',
      },
      skill3: {
        id: '376',
        description: '<span class=text-small>土属性キャラの攻撃力と最大HPが上昇(小)</span>',
        image: 'skill_god_3',
        attribute: '3',
        name: '土の神威',
      },
      hidden_skill1: null,
      hidden_skill2: null,
    },
    12: {
      param: {
        id: 3600325624,
        image_id: '1040907700',
        level: '200',
        attack: '4686',
        hp: '339',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '1',
        arousal_form: '1',
        arousal_exp: '0',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: false,
          level: null,
          form: null,
          form_name: null,
          remain_for_next_level: null,
          width: null,
          is_complete_condition: false,
          release_conditions: [

          ],
          max_level: null,
          total_bonus: null,
          total_acquired_bonus: null,
          skill: null,
          is_caution: false,
        },
        skill_level: '20',
      },
      master: {
        id: '1040907700',
        name: 'オメガブレイド',
        attribute: '3',
        kind: '10',
        rarity: '4',
        is_group: '7',
        series_id: '13',
        pre_weapon_skill_index: '',
        skill1_display: '',
        skill2_display: '0',
        skill3_display: '0',
      },
      skill1: {
        id: '736',
        description: '得意武器が「刀」のキャラの攻撃力とHP上昇(大)/HPが多いほど攻撃力が上昇(大)',
        image: 'skill_weapon_whole_10',
        attribute: '',
        name: 'マカエラ・プレナム',
      },
      skill2: {
        id: '759',
        description: 'アビリティのダメージ上限上昇',
        image: 'skill_ability_limit',
        attribute: '',
        name: 'スカンデレ・ファクルタス',
      },
      skill3: {
        id: '1809',
        description: '有利な属性の敵に対して与ダメージUP',
        image: 'skill_job_weapon',
        attribute: '',
        name: 'フルゴル・インペトゥス',
      },
      hidden_skill1: null,
      hidden_skill2: null,
    },
    13: {
      param: {
        id: 4261536284,
        image_id: '1040815100',
        level: '150',
        attack: '3258',
        hp: '439',
        bonus_attack: 0,
        bonus_hp: 0,
        adequate_flag: true,
        quality: '99',
        is_user_level: true,
        arousal_level: '10',
        arousal_form: '1',
        arousal_exp: '5400',
        augment_image: [

        ],
        augment_skill_icon_image: [

        ],
        augment_skill_info: [

        ],
        arousal: {
          is_arousal_weapon: true,
          level: 10,
          form: 1,
          form_name: '攻撃',
          remain_for_next_level: 0,
          width: 100,
          is_complete_condition: true,
          release_conditions: [
            {
              condition_type: '1',
              condition_value: '150',
              is_cleared: true,
            },
          ],
          max_level: 10,
          total_bonus: {
            2: [
              {
                name: '通常D上限',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
            3: [
              {
                name: 'EX攻刃',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
            4: [
              {
                name: 'HP',
                image: 'bonus_14',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
            5: [
              {
                name: '通常D上限',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
            6: [
              {
                name: 'EX攻刃',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
            7: [
              {
                name: 'HP',
                image: 'bonus_14',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 5,
              },
            ],
            8: [
              {
                name: '通常D上限',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
            9: [
              {
                name: '通常D上限',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
            10: [
              {
                name: '通常D上限',
                image: 'bonus_1',
                attribute_image: '',
                weapon_kind_images: [
                  '6',
                  '10',
                ],
                disp_string: '+%s%',
                effect_value: 2,
              },
            ],
          },
          total_acquired_bonus: [
            {
              status_id: '221',
              level: '2',
              name: '通常D上限',
              effect_value: 10,
              disp_string: '+%s%',
              image: 'bonus_1',
              attribute_image: '',
              weapon_kind_images: [
                '6',
                '10',
              ],
            },
            {
              status_id: '226',
              level: '3',
              name: 'EX攻刃',
              effect_value: 10,
              disp_string: '+%s%',
              image: 'bonus_1',
              attribute_image: '',
              weapon_kind_images: [
                '6',
                '10',
              ],
            },
            {
              status_id: '231',
              level: '4',
              name: 'HP',
              effect_value: 10,
              disp_string: '+%s%',
              image: 'bonus_14',
              attribute_image: '',
              weapon_kind_images: [
                '6',
                '10',
              ],
            },
          ],
          skill: [
            {
              skill_id: 2169,
              name: '通常攻撃ダメージ上限',
              comment: '得意武器が「銃」「刀」のキャラの通常攻撃ダメージ上限上昇',
              image: 'ex_skill_normal_limit',
              disp_string: '+%s%',
              effect_value: 10,
            },
            {
              skill_id: 2273,
              name: 'EX攻刃',
              comment: '得意武器が「銃」「刀」のキャラの攻撃力上昇',
              image: 'ex_skill_atk_ex',
              disp_string: '+%s%',
              effect_value: 10,
            },
            {
              skill_id: 2268,
              name: 'HP',
              comment: '得意武器が「銃」「刀」のキャラの最大HP上昇',
              image: 'ex_skill_hp',
              disp_string: '+%s%',
              effect_value: 10,
            },
          ],
          is_caution: false,
        },
        skill_level: '15',
      },
      master: {
        id: '1040815100',
        name: 'レオン・オブ・ワールド',
        attribute: '1',
        kind: '9',
        rarity: '4',
        is_group: '28',
        series_id: '38',
        pre_weapon_skill_index: '',
        skill1_display: '',
        skill2_display: '0',
        skill3_display: '',
      },
      skill1: {
        id: '1996',
        description: '攻撃力上昇(特大)/最大HP上昇(小)',
        image: 'skill_job_weapon',
        attribute: '',
        name: '新世界の福音',
      },
      skill2: {
        id: '2164',
        description: '<span class=text-small>得意武器が「銃」「刀」のキャラの通常攻撃与ダメージUP<br>◆アーカルムの転世でさらに通常攻撃与ダメージUP</span>',
        image: 'skill_weapon_sephiraous_1',
        attribute: '',
        name: 'セフィラウス・ガンドII',
      },
      skill3: null,
      hidden_skill1: null,
      hidden_skill2: null,
    },
  },
  summons: {
    1: {
      param: {
        id: '911874067',
        image_id: '2040084000_04',
        level: '250',
        attack: '4066',
        hp: '1799',
        quality: '99',
        evolution_flag: '0',
        evolution: '6',
        is_mypage: true,
      },
      master: {
        id: '2040084000',
        name: 'ティターン',
        attribute: '3',
        rarity: '4',
      },
      skill: {
        id: '120152',
        comment: 'スキル「土」「大地」「地裂」の効果が170%UP<br>◆メイン召喚石に装備時、土属性攻撃力が30%UP',
        name: 'ティターンの加護',
      },
      sub_skill: {
        id: '110490',
        comment: '土属性キャラの土属性攻撃力が20%UP/HP20%UP',
        name: 'ティターンの加護',
      },
    },
    2: {
      param: {
        id: '872242976',
        image_id: '2040314000',
        level: '200',
        attack: '3320',
        hp: '1192',
        quality: '99',
        evolution_flag: '0',
        evolution: '5',
        is_mypage: false,
      },
      master: {
        id: '2040314000',
        name: 'ザ・ハングドマン',
        attribute: '3',
        rarity: '4',
      },
      skill: {
        id: '30255',
        comment: '土属性キャラの攻撃力130%UP/防御力10%UP',
        name: 'ザ・ハングドマンの加護',
      },
      sub_skill: {
        id: '20256',
        comment: '土属性のキャラが水属性の敵に対して与ダメージ10%UP',
        name: 'ザ・ハングドマンの加護',
      },
    },
    3: {
      param: {
        id: '900313794',
        image_id: '2040318000',
        level: '200',
        attack: '2722',
        hp: '1133',
        quality: '0',
        evolution_flag: '0',
        evolution: '5',
        is_mypage: false,
      },
      master: {
        id: '2040318000',
        name: 'ザ・タワー',
        attribute: '3',
        rarity: '4',
      },
      skill: {
        id: '30271',
        comment: '土属性攻撃力100%UP(ターン経過で140%まで上昇)',
        name: 'ザ・タワーの加護',
      },
      sub_skill: {
        id: '20272',
        comment: '土属性キャラのHPが30%UP',
        name: 'ザ・タワーの加護',
      },
    },
    4: {
      param: {
        id: '790970875',
        image_id: '2040203000',
        level: '150',
        attack: '3589',
        hp: '1299',
        quality: '99',
        evolution_flag: '0',
        evolution: '4',
        is_mypage: false,
      },
      master: {
        id: '2040203000',
        name: 'ウリエル',
        attribute: '3',
        rarity: '4',
      },
      skill: {
        id: '20312',
        comment: '土属性攻撃力が140%UP',
        name: 'ウリエルの加護',
      },
      sub_skill: {
        id: '20313',
        comment: '土属性キャラのダメージ上限15%UP',
        name: 'ウリエルの加護',
      },
    },
    5: {
      param: {
        id: '1196916969',
        image_id: '2040408000',
        level: '150',
        attack: '3767',
        hp: '1180',
        quality: '99',
        evolution_flag: '0',
        evolution: '4',
        is_mypage: true,
      },
      master: {
        id: '2040408000',
        name: 'ベルゼバブ',
        attribute: '6',
        rarity: '4',
      },
      skill: {
        id: '20448',
        comment: '<div class=prt-text-small>全属性攻撃力が100%UP/主人公のステータス大幅UP/バトル開始時に主人公のトランスLvが3上昇(最大3)</div>',
        name: '一にして全、全にして一',
      },
      sub_skill: {
        id: '20449',
        comment: '<div class=prt-text-small>主人公が奥義発動時に主人公のトランスLvが1上昇(最大3) ◆トランスLvに応じて主人公の連続攻撃確率UP/Lv3の時ステータス大幅UP</div>',
        name: '一にして全、全にして一',
      },
    },
  },
  quickSummoniId: 'null',
  subSummons: {
    1: {
      param: {
        id: '1152232767',
        image_id: '2040401000',
        level: '150',
        attack: '3407',
        hp: '1275',
        quality: '99',
        evolution_flag: '0',
        evolution: '4',
        is_mypage: false,
      },
      master: {
        id: '2040401000',
        name: 'ガレヲン',
        attribute: '3',
        rarity: '4',
      },
      skill: {
        id: '20437',
        comment: '土属性攻撃力が140%UP',
        name: 'ガレヲンの加護',
      },
      sub_skill: {
        id: '20438',
        comment: 'スキル「土」「大地」「地裂」の効果が40%UP',
        name: 'ガレヲンの加護',
      },
    },
    2: {
      param: {
        id: '1163328156',
        image_id: '2040403000',
        level: '150',
        attack: '1970',
        hp: '1090',
        quality: '0',
        evolution_flag: '0',
        evolution: '4',
        is_mypage: true,
      },
      master: {
        id: '2040403000',
        name: 'マンドラゴラ',
        attribute: '3',
        rarity: '4',
      },
      skill: {
        id: '20441',
        comment: '土属性攻撃力が100%UP/土属性キャラのHPが20%UP',
        name: 'マンドラゴラの加護',
      },
      sub_skill: {
        id: '20442',
        comment: 'バトル開始時に土属性キャラにディスペルガード効果(1回)/ストレングス効果',
        name: 'マンドラゴラの加護',
      },
    },
  },
  damageInfo: {
    assumed_advantage_damage_attribute: 2,
    assumed_normal_damage_attribute: 3,
    assumed_advantage_damage: 1377373,
    assumed_normal_damage: 877339,
    hp: 100684,
    effect_value_info: [
      {
        icon_img: '01_icon_might_01.png',
        value: '320％',
        is_max: false,
      },
      {
        icon_img: '01_icon_might_02.png',
        value: '42％',
        is_max: false,
      },
      {
        icon_img: '01_icon_might_03.png',
        value: '218％',
        is_max: false,
      },
      {
        icon_img: '01_icon_might_04.png',
        value: '48％',
        is_max: false,
      },
      {
        icon_img: '01_icon_stamina_01.png',
        value: '29.65％',
        is_max: false,
      },
      {
        icon_img: '01_icon_e_atk_02.png',
        value: '15％',
        is_max: false,
      },
      {
        icon_img: '01_icon_da_rate.png',
        value: '40％',
        is_max: false,
      },
      {
        icon_img: '01_icon_ta_rate.png',
        value: '25％',
        is_max: false,
      },
      {
        icon_img: '03_icon_hp.png',
        value: '256％',
        is_max: false,
      },
      {
        icon_img: '03_icon_turn_dmg.png',
        value: '5％',
        is_max: false,
      },
      {
        icon_img: '02_icon_def.png',
        value: '100％',
        is_max: false,
      },
      {
        icon_img: '02_icon_turn_dmg_reduc.png',
        value: '50％',
        is_max: false,
      },
      {
        icon_img: '04_icon_na_dmg_cap.png',
        value: '10％',
        is_max: false,
      },
      {
        icon_img: '04_icon_ca_dmg.png',
        value: '20％',
        is_max: false,
      },
      {
        icon_img: '04_icon_ca_dmg_cap.png',
        value: '15％',
        is_max: false,
      },
      {
        icon_img: '04_icon_skill_dmg_cap.png',
        value: '50％',
        is_max: false,
      },
      {
        icon_img: '04_icon_dmg_cap.png',
        value: '20％',
        is_max: true,
      },
      {
        icon_img: '04_icon_dmg_cap_other.png',
        value: '20％',
        is_max: true,
      },
      {
        icon_img: '04_icon_dmg_supp.png',
        value: '＋100000',
        is_max: true,
      },
      {
        icon_img: '04_icon_elem_amplify.png',
        value: '25％',
        is_max: false,
      },
      {
        icon_img: '04_icon_amplify.png',
        value: '2％',
        is_max: false,
      },
      {
        icon_img: '04_icon_ca_gage.png',
        value: '-100％',
        is_max: false,
      },
      {
        icon_img: '06_icon_super_dmg_cap.png',
        value: '5％',
        is_max: false,
      },
    ],
    summon_name: '',
  },
})
function handleShare() {
  dialogVisible.value = true
}

function handleCopyBuild() {
  if (!currentDeck.value)
    return ElMessage.warning('请先获取队伍信息')
}
</script>

<template>
  <Contact absolute bottom-15px right-15px />
  <ElTable :data="tableData">
    <ElTableColumn label="开始时间" align="center">
      <template>
        123
      </template>
    </ElTableColumn>
    <ElTableColumn label="操作" align="center" width="150">
      <template #default="{ row }">
        <div fc gap-20px p-10px text-base>
          <div i-carbon:share icon-btn @click="handleShare" />
          <div v-if="row.reserve" i-carbon:locked icon-btn />
          <div v-else i-carbon:unlocked icon-btn />
          <div v-show="!row.reserve" i-carbon:trash-can icon-btn />
        </div>
      </template>
    </ElTableColumn>
  </ElTable>
  <el-dialog v-model="dialogVisible" width="510" :show-close="false" top="5vh">
    <div mb-4 flex items-center justify-between>
      <div>
        <el-alert title="切换至战斗记录所使用的的队伍" type="info" show-icon :closable="false" />
      </div>
      <TheButton @click="handleCopyBuild">
        复制配置信息
      </TheButton>
    </div>

    <ElCard v-if="currentDeck" :body-style="{ padding: '10px' }" m-auto w-480px>
      <div relative fc flex-col gap-2>
        <div fc flex-wrap gap-2>
          <Weapon :weapons="currentDeck.weapons" :damage-info="currentDeck.damageInfo" />
          <Summon :summons="currentDeck.summons" :sub-summons="currentDeck.subSummons" :calculate-setting="currentDeck.calculateSetting" :quick-summoni-id="currentDeck.quickSummoniId" />
          <Npc :npcs="currentDeck.npcs" :leader-ability-list="currentDeck.leaderAbilityList" :leader="currentDeck.leader" :set-action="currentDeck.setAction" :damage-info="currentDeck.damageInfo" />
        </div>
        <div fc>
          <Effect :effect-value-info="currentDeck.damageInfo.effect_value_info" />
        </div>
      </div>
    </ElCard>
  </el-dialog>
</template>
