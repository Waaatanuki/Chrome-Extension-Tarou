<script setup lang="ts">
import type { BuildResponse } from 'api'

const data = [
  {
    questId: '305161',
    raidId: 45480765683,
    raidName: 'Lv200 ジ・オーダー・グランデ',
    bossImage: '8103083',
    turn: 2,
    startTime: 1778031676,
    realSpeed: '00:06 / 1646',
    fullSpeed: '-',
    point: 1645903,
    damage: '164,590,219',
    isFa: true,
    deck: {
      priority: '85',
      weapons: [
        {
          seriesId: 35,
          masterId: 1040022900,
          imageId: '1040022900',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '<span class=text-small>バトル開始時にサーヴェイジ・ミソロジー効果(毎ターンダメージを受けるが攻撃UP/防御大幅UP/ターン進行時に攻撃行動を2回行う)<br>◆メイン装備時/主人公のみ</span>',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '<span class=text-small>土属性キャラが受けるターンダメージを軽減/ターンダメージを受けた時、土属性追撃効果(1回)<br>◆メイン装備時</span>',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill3',
              description: '土属性キャラのHPが少ないほど攻撃力が上昇(大)',
              image: 'skill_backwater_3_3',
            },
          ],
          isMain: true,
        },
        {
          seriesId: 2,
          masterId: 1040425600,
          imageId: '1040425600',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '土属性キャラに土属性奥義追撃効果(大)',
              image: 'skill_special_skill_concurrent_attack_3_3',
            },
            {
              type: 'skill2',
              description: '土属性キャラが敵の防御力を一定割合無視(大)/攻撃力上昇(小)',
              image: 'skill_penetrate_defense_3_3',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>土属性キャラのチェイン与ダメージUP/奥義の与ダメージUP<br>◆スキル「創樹方陣」または「餓金禁呪」または「土」「大地」「地裂」の効果上昇量が合計280%以上で性能UP</span>',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040425600,
          imageId: '1040425600',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '土属性キャラに土属性奥義追撃効果(大)',
              image: 'skill_special_skill_concurrent_attack_3_3',
            },
            {
              type: 'skill2',
              description: '土属性キャラが敵の防御力を一定割合無視(大)/攻撃力上昇(小)',
              image: 'skill_penetrate_defense_3_3',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>土属性キャラのチェイン与ダメージUP/奥義の与ダメージUP<br>◆スキル「創樹方陣」または「餓金禁呪」または「土」「大地」「地裂」の効果上昇量が合計280%以上で性能UP</span>',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 0,
          masterId: 1040816200,
          imageId: '1040816200',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '土属性キャラの奥義性能UP(大)/チェインバースト性能UP(大)',
              image: 'skill_hero_3_3',
            },
            {
              type: 'skill2',
              description: '土属性キャラの奥義ダメージ特殊上限UP',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 29,
          masterId: 1040513400,
          imageId: '1040513400',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '土属性キャラの奥義ダメージUP(特大)',
              image: 'skill_sp_atk_3_4',
            },
            {
              type: 'skill2',
              description: '土属性キャラの奥義の与ダメージ上昇',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 29,
          masterId: 1040513400,
          imageId: '1040513400',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '土属性キャラの奥義ダメージUP(特大)',
              image: 'skill_sp_atk_3_4',
            },
            {
              type: 'skill2',
              description: '土属性キャラの奥義の与ダメージ上昇',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 40,
          masterId: 1040712800,
          imageId: '1040712800',
          level: '200',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '経過ターンに応じて土属性キャラの攻撃力が上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '土属性のキャラが無属性の敵に対して与ダメージUP',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>土属性キャラの攻撃力と最大HPが上昇(大)</span>',
              image: 'skill_god_3_3',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040910000,
          imageId: '1040910000',
          level: '150',
          arousalForm: 7,
          skill: [
            {
              type: 'skill1',
              description: '土属性キャラの攻撃力上昇(特大)',
              image: 'skill_atk_3_4_3',
            },
            {
              type: 'skill2',
              description: '土属性キャラのHPが多いほど攻撃力が上昇(中)',
              image: 'skill_whole_3_2',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 44,
          masterId: 1040220300,
          imageId: '1040220300',
          level: '200',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '土属性キャラの攻撃力上昇(特大)/破壊属性追撃効果(特大)',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '土属性キャラの最大HP上昇(特大)/破壊属性奥義追撃効果(特大)',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>土属性キャラの奥義ダメージ上限UP/奥義の与ダメージ上昇/有利な属性の敵に対して与ダメージUP/水属性ダメージ軽減　◆スキル「創樹方陣」または「餓金禁呪」または「土」「大地」「地裂」の効果上昇量が合計280%以上で発動</span>',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 3,
          masterId: 1040809400,
          imageId: '1040809400_03',
          level: '250',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '<span class=text-small>土属性キャラの攻撃力と最大HPが上昇(大)/与ダメージUP(大)</span>',
              image: 'skill_atk_hp_rise_3_3',
            },
            {
              type: 'skill2',
              description: 'アビリティのダメージ上限上昇/アビリティ命中確率上昇',
              image: 'skill_ability_limit_3',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>土属性キャラの攻撃力上昇/ダメージ上限上昇/アビリティダメージ上限上昇/アビリティの与ダメージUP<br>◆スキル「創樹方陣」または「餓金禁呪」または「土」「大地」「地裂」の効果上昇量が合計280%以上で発動</span>',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 0,
          masterId: 0,
          imageId: '',
          level: '',
          arousalForm: 0,
          skill: [],
          isMain: false,
        },
        {
          seriesId: 0,
          masterId: 0,
          imageId: '',
          level: '',
          arousalForm: 0,
          skill: [],
          isMain: false,
        },
        {
          seriesId: 0,
          masterId: 0,
          imageId: '',
          level: '',
          arousalForm: 0,
          skill: [],
          isMain: false,
        },
      ],
      summons: [
        {
          paramId: 911874067,
          masterId: 2040084000,
          rarity: 4,
          imageId: '2040084000_04',
          isMain: true,
          isQuick: false,
        },
        {
          paramId: 924271390,
          masterId: 2040065000,
          rarity: 4,
          imageId: '2040065000_02',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 1152232767,
          masterId: 2040401000,
          rarity: 4,
          imageId: '2040401000',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 1259401471,
          masterId: 2040411000,
          rarity: 4,
          imageId: '2040411000',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 790970875,
          masterId: 2040203000,
          rarity: 4,
          imageId: '2040203000',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 1464719142,
          masterId: 2040438000,
          rarity: 4,
          imageId: '2040438000',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 1163328156,
          masterId: 2040403000,
          rarity: 4,
          imageId: '2040403000',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 0,
          masterId: 0,
          rarity: 0,
          imageId: '2040065000_02',
          isMain: true,
          isQuick: false,
        },
      ],
      leader: {
        masterId: '110401',
        imageId: '110101_sw_1_01',
        familiarId: null,
        normalDamage: 417180,
        advantageDamage: 553028,
        ability: [
          {
            jobParamId: 24312279,
            actionId: '201691',
            iconId: '1720_3',
            name: 'エレメンタル・ファランクス',
            iconType: '3',
            fa: false,
          },
        ],
      },
      npcs: [
        {
          paramId: 129435109,
          masterId: 3040032000,
          imageId: '3040032000_04',
          attribute: 3,
          isAugment: true,
          arousalForm: 4,
          ability: [
            {
              iconType: '1',
              fa: false,
            },
            {
              iconType: '1',
              fa: false,
            },
            {
              iconType: '1',
              fa: true,
            },
            {
              iconType: '3',
              fa: false,
            },
          ],
          exlb: [
            {
              type: 'EXリミットボーナス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '攻撃力',
                  value: '+2100',
                },
                {
                  icon: 'bonus_14',
                  name: 'HP',
                  value: '+1050',
                },
                {
                  icon: 'bonus_1',
                  name: '背水',
                  value: '+10',
                },
                {
                  icon: 'bonus_2',
                  name: '防御',
                  value: '+12%',
                },
              ],
            },
            {
              type: 'エーテリアルプラス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '背水',
                  value: '+8',
                },
              ],
            },
          ],
          artifact: [
            {
              value: '+8.8%',
              icon: 'bonus_28',
              level: 1,
              name: '自属性攻撃力',
            },
            {
              value: '+1620',
              icon: 'bonus_28',
              level: 2,
              name: '攻撃力',
            },
            {
              value: '+3.3%',
              icon: 'bonus_29',
              level: 2,
              name: '通常攻撃ダメージ上限',
            },
            {
              value: '3個',
              icon: 'bonus_30',
              level: 3,
              name: 'バトル開始時に自分に一定個数ランダムな強化効果',
            },
          ],
        },
        {
          paramId: 241538153,
          masterId: 3040630000,
          imageId: '3040630000_01',
          attribute: 3,
          isAugment: true,
          arousalForm: 3,
          ability: [
            {
              iconType: '1',
              fa: false,
            },
            {
              iconType: '3',
              fa: false,
            },
            {
              iconType: '3',
              fa: true,
            },
          ],
          exlb: [
            {
              type: 'EXリミットボーナス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '攻撃力',
                  value: '+2400',
                },
                {
                  icon: 'bonus_14',
                  name: 'HP',
                  value: '+1200',
                },
                {
                  icon: 'bonus_19',
                  name: '奥義ダメージ上限',
                  value: '+14%',
                },
                {
                  icon: 'bonus_21',
                  name: 'トリプルアタック確率',
                  value: '+8%',
                },
              ],
            },
            {
              type: 'エーテリアルプラス',
              bonuse: [
                {
                  icon: 'bonus_21',
                  name: 'トリプルアタック確率',
                  value: '+6%',
                },
              ],
            },
          ],
          artifact: [
            {
              value: '+4.8%',
              icon: 'bonus_28',
              level: 1,
              name: '有利属性軽減',
            },
            {
              value: '+9.6%',
              icon: 'bonus_28',
              level: 3,
              name: '弱体成功率',
            },
            {
              value: '+12.8%',
              icon: 'bonus_29',
              level: 3,
              name: 'アビリティダメージ上限',
            },
            {
              value: '5回',
              icon: 'bonus_30',
              level: 1,
              name: 'アビリティを一定回数使用する度に自分にダメージ上限UP(累積)',
            },
          ],
        },
        {
          paramId: 129265541,
          masterId: 3040037000,
          imageId: '3040037000_03',
          attribute: 3,
          isAugment: true,
          arousalForm: 3,
          ability: [
            {
              iconType: '3',
              fa: false,
            },
            {
              iconType: '3',
              fa: false,
            },
            {
              iconType: '3',
              fa: false,
            },
            {
              iconType: '3',
              fa: true,
            },
          ],
          exlb: [
            {
              type: 'EXリミットボーナス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '攻撃力',
                  value: '+1500',
                },
                {
                  icon: 'bonus_14',
                  name: 'HP',
                  value: '+750',
                },
                {
                  icon: 'bonus_19',
                  name: '奥義ダメージ上限',
                  value: '+15%',
                },
                {
                  icon: 'bonus_2',
                  name: '回避率',
                  value: '+8',
                },
              ],
            },
            {
              type: 'エーテリアルプラス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '渾身',
                  value: '+8',
                },
              ],
            },
          ],
          artifact: [
            {
              value: '+5.8%',
              icon: 'bonus_28',
              level: 2,
              name: '有利属性軽減',
            },
            {
              value: '+18.6%',
              icon: 'bonus_28',
              level: 2,
              name: '奥義ダメージ',
            },
            {
              value: '+16.2%',
              icon: 'bonus_29',
              level: 2,
              name: '奥義ダメージ上限UP/通常攻撃ダメージ上限-20％/アビリティダメージ上限-80％',
            },
            {
              value: '+1%',
              icon: 'bonus_30',
              level: 2,
              name: 'アイテムドロップ率UP(重複不可)　◆サブメンバーにいる場合でも発動',
            },
          ],
        },
        {
          paramId: 219341387,
          masterId: 3040501000,
          imageId: '3040501000_01',
          attribute: 3,
          isAugment: true,
          arousalForm: 4,
          ability: [
            {
              iconType: '1',
              fa: true,
            },
            {
              iconType: '1',
              fa: true,
            },
            {
              iconType: '1',
              fa: true,
            },
          ],
          artifact: [
            {
              value: '+16.2%',
              icon: 'bonus_28',
              level: 2,
              name: '回復性能',
            },
            {
              value: '+9.9%',
              icon: 'bonus_28',
              level: 2,
              name: '弱体耐性',
            },
            {
              value: '+14.4%',
              icon: 'bonus_29',
              level: 3,
              name: 'アビリティダメージ上限',
            },
            {
              value: '+0.5%',
              icon: 'bonus_30',
              level: 1,
              name: 'アイテムドロップ率UP(重複不可)　◆サブメンバーにいる場合でも発動',
            },
          ],
        },
        {
          paramId: 171507416,
          masterId: 3040143000,
          imageId: '3040143000_01',
          attribute: 5,
          isAugment: false,
          arousalForm: 1,
          ability: [
            {
              iconType: '1',
              fa: false,
            },
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '3',
              fa: false,
            },
          ],
          artifact: [],
        },
      ],
      effects: [
        {
          iconImg: '01_icon_might_01.png',
          isMax: false,
          value: '297％',
        },
        {
          iconImg: '01_icon_might_03.png',
          isMax: false,
          value: '37％',
        },
        {
          iconImg: '01_icon_stamina_01.png',
          isMax: false,
          value: '31.56％',
        },
        {
          iconImg: '01_icon_da_rate.png',
          isMax: false,
          value: '20％',
        },
        {
          iconImg: '01_icon_ta_rate.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '01_icon_genesis_concurrent_attack.png',
          isMax: false,
          value: '20％',
        },
        {
          iconImg: '01_icon_earth_special_skill_concurrent_attack.png',
          isMax: false,
          value: '13.2％',
        },
        {
          iconImg: '01_icon_genesis_special_skill_concurrent_attack.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '03_icon_hp.png',
          isMax: false,
          value: '175％',
        },
        {
          iconImg: '02_icon_turn_dmg_reduc.png',
          isMax: false,
          value: '50％',
        },
        {
          iconImg: '04_icon_amplify.png',
          isMax: false,
          value: '6.6％',
        },
        {
          iconImg: '04_icon_plain_amplify.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '04_icon_skill_dmg_cap.png',
          isMax: false,
          value: '50％',
        },
        {
          iconImg: '04_icon_ca_dmg.png',
          isMax: false,
          value: '91.25％',
        },
        {
          iconImg: '04_icon_ca_dmg_cap.png',
          isMax: false,
          value: '22.44％',
        },
        {
          iconImg: '04_icon_ca_dmg_amplify_other.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '04_icon_ca_dmg_cap_ded.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '04_icon_cb_dmg.png',
          isMax: false,
          value: '47.85％',
        },
        {
          iconImg: '04_icon_cb_dmg_cap.png',
          isMax: false,
          value: '22.44％',
        },
        {
          iconImg: '04_icon_cb_dmg_amplify.png',
          isMax: false,
          value: '50％',
        },
        {
          iconImg: '04_icon_fc_dmg_amplify.png',
          isMax: false,
          value: '50％',
        },
        {
          iconImg: '04_icon_ca_supp.png',
          isMax: false,
          value: '＋800000',
        },
        {
          iconImg: '04_icon_penetrate_def.png',
          isMax: false,
          value: '13.2％',
        },
        {
          iconImg: '05_icon_stamina.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '05_icon_ca_dmg.png',
          isMax: false,
          value: '11％',
        },
      ],
      enhance: {
        enhance: 230,
        enhanceMagna: 20,
        enhanceEvil: 0,
      },
    },
    detail: {
      player: [
        {
          pid: '110101',
          is_dead: false,
          is_npc: false,
          image_id: '110101_01',
          use_ability_count: 0,
          use_special_skill_count: 2,
          damage: {
            total: {
              comment: '总计',
              value: 39495278,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 2969814,
            },
            ability: {
              comment: '技能伤害',
              value: 0,
            },
            special: {
              comment: '奥义伤害',
              value: 28335849,
            },
            other: {
              comment: '其他',
              value: 8189615,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 16038,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 14038,
            },
            other: {
              comment: '其他',
              value: 2000,
            },
          },
          attackInfo: {
            total: 1,
            sa: 0,
            da: 0,
            ta: 1,
          },
        },
        {
          pid: '3040032000',
          is_dead: false,
          is_npc: true,
          image_id: '3040032000_01',
          use_ability_count: 0,
          use_special_skill_count: 2,
          damage: {
            total: {
              comment: '总计',
              value: 38982370,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            ability: {
              comment: '技能伤害',
              value: 2999997,
            },
            special: {
              comment: '奥义伤害',
              value: 35982373,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 14228,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 13728,
            },
            other: {
              comment: '其他',
              value: 500,
            },
          },
        },
        {
          pid: '3040630000',
          is_dead: false,
          is_npc: true,
          image_id: '3040630000_01',
          use_ability_count: 0,
          use_special_skill_count: 2,
          damage: {
            total: {
              comment: '总计',
              value: 24804508,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            ability: {
              comment: '技能伤害',
              value: 4039260,
            },
            special: {
              comment: '奥义伤害',
              value: 20765248,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 12354,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 11854,
            },
            other: {
              comment: '其他',
              value: 500,
            },
          },
        },
        {
          pid: '3040037000',
          is_dead: false,
          is_npc: true,
          image_id: '3040037000_01',
          use_ability_count: 0,
          use_special_skill_count: 3,
          damage: {
            total: {
              comment: '总计',
              value: 61308063,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            ability: {
              comment: '技能伤害',
              value: 0,
            },
            special: {
              comment: '奥义伤害',
              value: 61308063,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 12894,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 12394,
            },
            other: {
              comment: '其他',
              value: 500,
            },
          },
        },
        {
          pid: '3040501000',
          is_dead: false,
          is_npc: true,
          image_id: '3040501000_01',
          use_ability_count: 0,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 0,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            ability: {
              comment: '技能伤害',
              value: 0,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 0,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
        },
        {
          pid: '3040143000',
          is_dead: false,
          is_npc: true,
          image_id: '3040143000_01',
          use_ability_count: 0,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 0,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            ability: {
              comment: '技能伤害',
              value: 0,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 0,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
        },
      ],
      actionQueue: [
        {
          turn: 1,
          bossHpPercent: 46.61,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 1,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 49,
            ability: 7039257,
            special: 146391533,
            total: 164590219,
            chain: 9,
          },
        },
        {
          turn: 2,
          bossHpPercent: 18.58,
          special_skill_flag: 0,
          actionList: [],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 1,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
        },
      ],
    },
    anonymous: true,
    questName: '降臨、調停の翼ＨＬ',
    questImage: '/sp/quest/assets/lobby/305161.png',
    account: 'グラン',
    createTime: 1778031727576,
    key: '8zOQCUDsIgYMYB2AkPLm',
  },
  {
    questId: '305701',
    raidId: 45459415737,
    raidName: 'Lv350 ヴェルサシア・ジェネシス',
    bossImage: '7300883',
    turn: 79,
    startTime: 1777839828,
    realSpeed: '29:28 / 560',
    fullSpeed: '29:29 / 560',
    point: 182484121,
    damage: '16,515,653,217',
    isFa: true,
    deck: {
      priority: '30570152',
      weapons: [
        {
          seriesId: 0,
          masterId: 1030009300,
          imageId: '1030009300',
          level: '75',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '光属性キャラの最大HP上昇(中)/弱体耐性UP(中)',
              image: 'skill_grace_5_2',
            },
          ],
          isMain: true,
        },
        {
          seriesId: 3,
          masterId: 1040017000,
          imageId: '1040017000_03',
          level: '250',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '<span class=text-small>光属性キャラの攻撃力と最大HPが上昇(大)/与ダメージUP(大)</span>',
              image: 'skill_atk_hp_rise_5_3',
            },
            {
              type: 'skill2',
              description: 'アビリティのダメージ上限上昇/アビリティ命中確率上昇',
              image: 'skill_ability_limit_3',
            },
            {
              type: 'skill3',
              description: '自属性追撃効果/奥義ゲージ上昇量大幅DOWN',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040917200,
          imageId: '1040917200',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '光属性キャラの通常攻撃の与ダメージ上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '光属性キャラが敵の防御力を一定割合無視(大)/攻撃力上昇(小)',
              image: 'skill_penetrate_defense_5_3',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>光属性キャラの連続攻撃確率上昇/通常攻撃の与ダメージUP<br>◆スキル「騎解方陣」または「喪爛禁呪」または「光」「雷電」「天光」の効果上昇量が合計280%以上で性能UP</span>',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040917200,
          imageId: '1040917200',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '光属性キャラの通常攻撃の与ダメージ上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '光属性キャラが敵の防御力を一定割合無視(大)/攻撃力上昇(小)',
              image: 'skill_penetrate_defense_5_3',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>光属性キャラの連続攻撃確率上昇/通常攻撃の与ダメージUP<br>◆スキル「騎解方陣」または「喪爛禁呪」または「光」「雷電」「天光」の効果上昇量が合計280%以上で性能UP</span>',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040814500,
          imageId: '1040814500',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '光属性キャラの与ダメージ上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '装備している「楽器」の数が多いほど攻撃力上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill3',
              description: '光属性キャラのダメージ上限上昇',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040025900,
          imageId: '1040025900',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: 'スキル「光」「雷電」「天光」の効果が30%UP',
              image: 'skill_optimus_5',
            },
            {
              type: 'skill2',
              description: '<span class=text-small>光属性キャラの攻撃力上昇(小)/クリティカル確率上昇(小)</span>',
              image: 'skill_moment_5_1',
            },
            {
              type: 'skill3',
              description: '光属性キャラがクリティカル発動時に与ダメージUP(大)',
              image: 'skill_tec_rise_5_3',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040025900,
          imageId: '1040025900',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: 'スキル「光」「雷電」「天光」の効果が30%UP',
              image: 'skill_optimus_5',
            },
            {
              type: 'skill2',
              description: '<span class=text-small>光属性キャラの攻撃力上昇(小)/クリティカル確率上昇(小)</span>',
              image: 'skill_moment_5_1',
            },
            {
              type: 'skill3',
              description: '光属性キャラがクリティカル発動時に与ダメージUP(大)',
              image: 'skill_tec_rise_5_3',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 13,
          masterId: 1040012100,
          imageId: '1040012100',
          level: '200',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '得意武器が「剣」のキャラの攻撃力とHP上昇(大)/HPが多いほど攻撃力が上昇(大)',
              image: 'skill_weapon_whole_1',
            },
            {
              type: 'skill2',
              description: '奥義のダメージ上限上昇',
              image: 'skill_special_limit',
            },
            {
              type: 'skill3',
              description: 'ダメージ上限上昇',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040029200,
          imageId: '1040029200',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '光属性キャラのアビリティの与ダメージ上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '<span class=text-small>光属性キャラに光属性冴手効果(大)<br>◆敵に属性アビリティダメージを与えた時、光属性の追加ダメージが1回発生する</span>',
              image: 'skill_rigor_5_3',
            },
            {
              type: 'skill3',
              description: '光属性キャラのクリティカル確率上昇(大)',
              image: 'skill_tec_5_3',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 2,
          masterId: 1040029200,
          imageId: '1040029200',
          level: '150',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '光属性キャラのアビリティの与ダメージ上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '<span class=text-small>光属性キャラに光属性冴手効果(大)<br>◆敵に属性アビリティダメージを与えた時、光属性の追加ダメージが1回発生する</span>',
              image: 'skill_rigor_5_3',
            },
            {
              type: 'skill3',
              description: '光属性キャラのクリティカル確率上昇(大)',
              image: 'skill_tec_5_3',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 41,
          masterId: 1040025400,
          imageId: '1040025400',
          level: '200',
          arousalForm: 1,
          skill: [
            {
              type: 'skill1',
              description: '装備している「剣」の数が多いほど攻撃力上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '<span class=text-small>攻撃力/連続攻撃確率/奥義性能/ダメージ上限上昇<br>◆得意武器「剣」のキャラに対して性能UP/全属性攻撃UP</span>',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill3',
              description: '攻撃力/最大HP/防御力上昇',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 40,
          masterId: 1040915600,
          imageId: '1040915600',
          level: '200',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '経過ターンに応じて光属性キャラの攻撃力が上昇',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '光属性のキャラが無属性の敵に対して与ダメージUP',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>光属性キャラの攻撃力と最大HPが上昇(大)</span>',
              image: 'skill_god_5_3',
            },
          ],
          isMain: false,
        },
        {
          seriesId: 44,
          masterId: 1040714700,
          imageId: '1040714700',
          level: '200',
          arousalForm: 0,
          skill: [
            {
              type: 'skill1',
              description: '光属性キャラの攻撃力上昇(特大)/破壊属性追撃効果(特大)',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill2',
              description: '光属性キャラの最大HP上昇(特大)/破壊属性奥義追撃効果(特大)',
              image: 'skill_job_weapon',
            },
            {
              type: 'skill3',
              description: '<span class=text-small>光属性キャラの通常攻撃ダメージ上限UP/通常攻撃の与ダメージ上昇/有利な属性の敵に対して与ダメージUP/闇属性ダメージ軽減　◆スキル「騎解方陣」または「喪爛禁呪」または「光」「雷電」「天光」の効果上昇量が合計280%以上で発動</span>',
              image: 'skill_job_weapon',
            },
          ],
          isMain: false,
        },
      ],
      summons: [
        {
          paramId: 1089262356,
          masterId: 2040080000,
          rarity: 4,
          imageId: '2040080000_04',
          isMain: true,
          isQuick: false,
        },
        {
          paramId: 1442842000,
          masterId: 2040425000,
          rarity: 4,
          imageId: '2040425000',
          isMain: false,
          isQuick: true,
        },
        {
          paramId: 1487045050,
          masterId: 2040442000,
          rarity: 4,
          imageId: '2040442000',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 1230487285,
          masterId: 2040065000,
          rarity: 4,
          imageId: '2040065000_02',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 1085717597,
          masterId: 2040205000,
          rarity: 4,
          imageId: '2040205000',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 1489737568,
          masterId: 2040448000,
          rarity: 4,
          imageId: '2040448000',
          isMain: false,
          isQuick: false,
        },
        {
          paramId: 1237133796,
          masterId: 2040330000,
          rarity: 4,
          imageId: '2040330000',
          isMain: false,
          isQuick: false,
        },
      ],
      leader: {
        masterId: '100401',
        imageId: '310901_sw_1_01',
        familiarId: null,
        normalDamage: 739476,
        advantageDamage: 907583,
        ability: [
          {
            jobParamId: 24186213,
            actionId: '201621',
            iconId: '1703_3',
            name: 'ノルデン・ハル',
            iconType: '3',
            fa: true,
          },
          {
            jobParamId: 0,
            name: 'ヨムスボルグ',
            actionId: '201641',
            iconId: '1705_3',
            iconType: '3',
            fa: true,
          },
          {
            jobParamId: 0,
            name: 'トレジャーハントII',
            actionId: '6001',
            iconId: '13_4',
            iconType: '4',
            fa: true,
          },
          {
            jobParamId: 0,
            name: 'トレジャーハントIII',
            actionId: '6002',
            iconId: '13_4',
            iconType: '4',
            fa: true,
          },
        ],
      },
      npcs: [
        {
          paramId: 242077925,
          masterId: 3040594000,
          imageId: '3040242000_01',
          attribute: 5,
          isAugment: false,
          arousalForm: 2,
          ability: [
            {
              iconType: '1',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
          ],
          exlb: [],
          artifact: [
            {
              value: '+720',
              icon: 'bonus_28',
              level: 1,
              name: 'HP',
            },
            {
              value: '+4.4%',
              icon: 'bonus_28',
              level: 1,
              name: 'トリプルアタック確率',
            },
            {
              value: '+16.8%',
              icon: 'bonus_29',
              level: 1,
              name: '奥義ダメージ上限UP/通常攻撃ダメージ上限-20％/アビリティダメージ上限-80％',
            },
            {
              value: '10%',
              icon: 'bonus_30',
              level: 1,
              name: 'バトル開始時に最大HPの20%を消費するが3ターン後、自分にダメージ上限UP',
            },
          ],
        },
        {
          paramId: 198254350,
          masterId: 3040390000,
          imageId: '3040390000_01',
          attribute: 5,
          isAugment: true,
          arousalForm: 2,
          ability: [
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '4',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
          ],
          exlb: [
            {
              type: 'EXリミットボーナス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '攻撃力',
                  value: '+1800',
                },
                {
                  icon: 'bonus_14',
                  name: 'HP',
                  value: '+900',
                },
                {
                  icon: 'bonus_19',
                  name: '奥義ダメージ上限',
                  value: '+14%',
                },
                {
                  icon: 'bonus_20',
                  name: 'ダブルアタック確率',
                  value: '+11%',
                },
              ],
            },
            {
              type: 'エーテリアルプラス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '渾身',
                  value: '+8',
                },
              ],
            },
          ],
          artifact: [
            {
              value: '+4.4%',
              icon: 'bonus_28',
              level: 1,
              name: '回避率',
            },
            {
              value: '+14.4%',
              icon: 'bonus_28',
              level: 1,
              name: 'クリティカル確率',
            },
            {
              value: '+13.5%',
              icon: 'bonus_29',
              level: 4,
              name: '奥義ダメージ上限',
            },
            {
              value: '175回',
              icon: 'bonus_30',
              level: 2,
              name: '敵に一定回数攻撃を与えた時、一度だけ自分に乱撃(3ヒット)効果(1回)',
            },
          ],
        },
        {
          paramId: 236856778,
          masterId: 3040564000,
          imageId: '3030233000_01',
          attribute: 5,
          isAugment: false,
          arousalForm: 3,
          ability: [
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '2',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
          ],
          exlb: [
            {
              type: 'EXリミットボーナス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '攻撃力',
                  value: '+1500',
                },
                {
                  icon: 'bonus_14',
                  name: 'HP',
                  value: '+750',
                },
                {
                  icon: 'bonus_19',
                  name: '奥義ダメージ上限',
                  value: '+11%',
                },
                {
                  icon: 'bonus_21',
                  name: 'トリプルアタック確率',
                  value: '+10%',
                },
              ],
            },
            {
              type: 'エーテリアルプラス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '渾身',
                  value: '+8',
                },
              ],
            },
          ],
          artifact: [
            {
              value: '+9.6%',
              icon: 'bonus_28',
              level: 1,
              name: '自属性攻撃力',
            },
            {
              value: '+18%',
              icon: 'bonus_28',
              level: 1,
              name: '奥義ダメージ',
            },
            {
              value: '+145000',
              icon: 'bonus_29',
              level: 2,
              name: '奥義与ダメージ上昇',
            },
            {
              value: '4個',
              icon: 'bonus_30',
              level: 4,
              name: '戦闘不能になった時、一度だけ味方全体に一定個数ランダムな強化効果',
            },
          ],
        },
        {
          paramId: 207768574,
          masterId: 3040441000,
          imageId: '3040441000_01',
          attribute: 5,
          isAugment: false,
          arousalForm: 4,
          ability: [
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '1',
              fa: true,
            },
          ],
          artifact: [
            {
              value: '+7.2%',
              icon: 'bonus_28',
              level: 1,
              name: '弱体成功率',
            },
            {
              value: '+660',
              icon: 'bonus_28',
              level: 1,
              name: 'HP',
            },
            {
              value: '+11600',
              icon: 'bonus_29',
              level: 2,
              name: '通常攻撃の与ダメージ上昇',
            },
            {
              value: '4個',
              icon: 'bonus_30',
              level: 4,
              name: '攻撃行動を行わなかった場合、ターン終了時に自分に一定個数ランダムな強化効果',
            },
          ],
        },
        {
          paramId: 192732345,
          masterId: 3040372000,
          imageId: '3030229000_01',
          attribute: 5,
          isAugment: true,
          arousalForm: 2,
          ability: [
            {
              iconType: '1',
              fa: true,
            },
            {
              iconType: '1',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
          ],
          exlb: [
            {
              type: 'EXリミットボーナス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '攻撃力',
                  value: '+1500',
                },
                {
                  icon: 'bonus_14',
                  name: 'HP',
                  value: '+750',
                },
                {
                  icon: 'bonus_2',
                  name: '防御',
                  value: '+6%',
                },
              ],
            },
            {
              type: 'エーテリアルプラス',
              bonuse: [
                {
                  icon: 'bonus_1',
                  name: '背水',
                  value: '+7',
                },
              ],
            },
          ],
          artifact: [
            {
              value: '+4.8%',
              icon: 'bonus_28',
              level: 1,
              name: 'トリプルアタック確率',
            },
            {
              value: '+13.2%',
              icon: 'bonus_28',
              level: 1,
              name: '奥義ダメージ',
            },
            {
              value: '+10.4%',
              icon: 'bonus_29',
              level: 1,
              name: '最大HP上昇/防御力-70%',
            },
            {
              value: '2%',
              icon: 'bonus_30',
              level: 1,
              name: '使用間隔が10ターン以上のアビリティ使用時、自分に与ダメージUP',
            },
          ],
        },
        {
          paramId: 240196259,
          masterId: 3040617000,
          imageId: '3040147000_01',
          attribute: 5,
          isAugment: true,
          arousalForm: 4,
          ability: [
            {
              iconType: '1',
              fa: false,
            },
            {
              iconType: '3',
              fa: false,
            },
            {
              iconType: '3',
              fa: false,
            },
          ],
          artifact: [
            {
              value: '+1560',
              icon: 'bonus_28',
              level: 1,
              name: '攻撃力',
            },
            {
              value: '+7.2%',
              icon: 'bonus_28',
              level: 1,
              name: '弱体耐性',
            },
            {
              value: '+2.9%',
              icon: 'bonus_29',
              level: 2,
              name: 'HPが100%の時、与ダメージUP',
            },
            {
              value: '4個',
              icon: 'bonus_30',
              level: 4,
              name: '攻撃行動を行わなかった場合、ターン終了時に自分に一定個数ランダムな強化効果',
            },
          ],
        },
        {
          paramId: 152700263,
          masterId: 3040087000,
          imageId: '3020018000_01',
          attribute: 5,
          isAugment: false,
          arousalForm: 4,
          ability: [
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '1',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
          ],
          artifact: [
            {
              value: '+4.4%',
              icon: 'bonus_28',
              level: 1,
              name: 'トリプルアタック確率',
            },
            {
              value: '+720',
              icon: 'bonus_28',
              level: 1,
              name: 'HP',
            },
            {
              value: '+15.6%',
              icon: 'bonus_29',
              level: 4,
              name: 'アビリティダメージ上限',
            },
            {
              value: '4回',
              icon: 'bonus_30',
              level: 2,
              name: 'アビリティを一定回数使用する度に自分にダメージ上限UP(累積)',
            },
          ],
        },
        {
          paramId: 196536717,
          masterId: 3040386000,
          imageId: '3040386000_01_1',
          attribute: 5,
          isAugment: false,
          arousalForm: 1,
          ability: [
            {
              iconType: '2',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
            {
              iconType: '3',
              fa: true,
            },
          ],
          artifact: [
            {
              value: '+9.6%',
              icon: 'bonus_28',
              level: 3,
              name: '弱体耐性',
            },
            {
              value: '+13.2%',
              icon: 'bonus_28',
              level: 1,
              name: '奥義ダメージ',
            },
            {
              value: '+2.4%',
              icon: 'bonus_29',
              level: 1,
              name: '通常攻撃ダメージ上限',
            },
            {
              value: '5ターン',
              icon: 'bonus_30',
              level: 3,
              name: 'サブメンバー時、一定ターン毎に敵全体にランダムな弱体効果を1つ付与(重複不可)',
            },
          ],
        },
      ],
      effects: [
        {
          iconImg: '01_icon_might_01.png',
          isMax: false,
          value: '343％',
        },
        {
          iconImg: '01_icon_might_03.png',
          isMax: false,
          value: '112％',
        },
        {
          iconImg: '01_icon_might_04.png',
          isMax: false,
          value: '72％',
        },
        {
          iconImg: '01_icon_stamina_01.png',
          isMax: false,
          value: '20.4％',
        },
        {
          iconImg: '01_icon_e_atk_02.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '01_icon_critical.png',
          isMax: false,
          value: '85.8％',
        },
        {
          iconImg: '01_icon_da_rate.png',
          isMax: false,
          value: '27.5％',
        },
        {
          iconImg: '01_icon_ta_rate.png',
          isMax: false,
          value: '27.5％',
        },
        {
          iconImg: '01_icon_lightoptimus.png',
          isMax: false,
          value: '60％',
        },
        {
          iconImg: '01_icon_genesis_concurrent_attack.png',
          isMax: false,
          value: '20％',
        },
        {
          iconImg: '01_icon_genesis_special_skill_concurrent_attack.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '01_icon_light_rigor.png',
          isMax: false,
          value: '13.2％',
        },
        {
          iconImg: '03_icon_hp.png',
          isMax: false,
          value: '274％',
        },
        {
          iconImg: '02_icon_def.png',
          isMax: false,
          value: '25％',
        },
        {
          iconImg: '02_icon_debuff_res.png',
          isMax: false,
          value: '16.5％',
        },
        {
          iconImg: '04_icon_dmg_cap.png',
          isMax: true,
          value: '20％',
        },
        {
          iconImg: '04_icon_amplify.png',
          isMax: false,
          value: '6.6％',
        },
        {
          iconImg: '04_icon_plain_amplify.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '04_icon_na_dmg_cap.png',
          isMax: false,
          value: '5％',
        },
        {
          iconImg: '04_icon_normal_dmg_amp_other.png',
          isMax: false,
          value: '10％',
        },
        {
          iconImg: '04_icon_skill_dmg_cap.png',
          isMax: false,
          value: '50％',
        },
        {
          iconImg: '04_icon_ca_dmg.png',
          isMax: false,
          value: '20％',
        },
        {
          iconImg: '04_icon_ca_dmg_cap.png',
          isMax: false,
          value: '65％',
        },
        {
          iconImg: '04_icon_dmg_supp.png',
          isMax: false,
          value: '＋50000',
        },
        {
          iconImg: '04_icon_normal_dmg_supp.png',
          isMax: true,
          value: '＋100000',
        },
        {
          iconImg: '04_icon_skill_dmg_supp.png',
          isMax: true,
          value: '＋200000',
        },
        {
          iconImg: '04_icon_ca_gage.png',
          isMax: false,
          value: '-100％',
        },
        {
          iconImg: '04_icon_penetrate_def.png',
          isMax: false,
          value: '13.2％',
        },
        {
          iconImg: '06_icon_super_dmg_cap.png',
          isMax: false,
          value: '3.5％',
        },
      ],
      enhance: {
        enhance: 230,
        enhanceMagna: 0,
        enhanceEvil: 0,
      },
    },
    detail: {
      player: [
        {
          pid: '310901',
          is_dead: false,
          is_npc: false,
          image_id: '100401_01',
          use_ability_count: 97,
          use_special_skill_count: 154,
          damage: {
            total: {
              comment: '总计',
              value: 4705416909,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 99115039,
            },
            ability: {
              comment: '技能伤害',
              value: 2692219326,
            },
            special: {
              comment: '奥义伤害',
              value: 1593945479,
            },
            other: {
              comment: '其他',
              value: 320137065,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 117195,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 38891,
            },
            other: {
              comment: '其他',
              value: 78304,
            },
          },
          attackInfo: {
            total: 7,
            sa: 0,
            da: 0,
            ta: 7,
          },
        },
        {
          pid: '3040594000',
          is_dead: true,
          is_npc: true,
          image_id: '3040594000_01',
          use_ability_count: 2,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 0,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            ability: {
              comment: '技能伤害',
              value: 0,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 38070,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 38070,
            },
          },
        },
        {
          pid: '3040390000',
          is_dead: false,
          is_npc: true,
          image_id: '3040390000_01',
          use_ability_count: 56,
          use_special_skill_count: 152,
          damage: {
            total: {
              comment: '总计',
              value: 2352771641,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 55594096,
            },
            ability: {
              comment: '技能伤害',
              value: 698463111,
            },
            special: {
              comment: '奥义伤害',
              value: 1598714434,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 104806,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 30710,
            },
            other: {
              comment: '其他',
              value: 74096,
            },
          },
          attackInfo: {
            total: 7,
            sa: 0,
            da: 2,
            ta: 5,
          },
        },
        {
          pid: '3040564000',
          is_dead: true,
          is_npc: true,
          image_id: '3040564000_01',
          use_ability_count: 3,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 0,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            ability: {
              comment: '技能伤害',
              value: 0,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 69748,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 69748,
            },
          },
        },
        {
          pid: '3040441000',
          is_dead: false,
          is_npc: true,
          image_id: '3040441000_01',
          use_ability_count: 4,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 15929822,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 15929822,
            },
            ability: {
              comment: '技能伤害',
              value: 0,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 25359,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 25359,
            },
          },
          attackInfo: {
            total: 2,
            sa: 0,
            da: 1,
            ta: 1,
          },
        },
        {
          pid: '3040372000',
          is_dead: true,
          is_npc: true,
          image_id: '3040372000_01',
          use_ability_count: 3,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 621816679,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 6823395,
            },
            ability: {
              comment: '技能伤害',
              value: 614993284,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 819229,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 811240,
            },
            other: {
              comment: '其他',
              value: 7989,
            },
          },
          attackInfo: {
            total: 2,
            sa: 0,
            da: 1,
            ta: 1,
          },
        },
        {
          pid: '3040617000',
          is_dead: false,
          is_npc: true,
          image_id: '3040617000_01',
          use_ability_count: 16,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 3795081445,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 2137618432,
            },
            ability: {
              comment: '技能伤害',
              value: 1657463013,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 125693,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 125693,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          attackInfo: {
            total: 130,
            sa: 0,
            da: 0,
            ta: 130,
          },
        },
        {
          pid: '3040087000',
          is_dead: false,
          is_npc: true,
          image_id: '3040087000_01',
          use_ability_count: 14,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 4505102502,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 2823462925,
            },
            ability: {
              comment: '技能伤害',
              value: 1681639577,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 13237,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 13237,
            },
          },
          attackInfo: {
            total: 143,
            sa: 0,
            da: 0,
            ta: 143,
          },
        },
        {
          pid: '3040386000',
          is_dead: false,
          is_npc: true,
          image_id: '3040386000_01',
          use_ability_count: 0,
          use_special_skill_count: 0,
          damage: {
            total: {
              comment: '总计',
              value: 0,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            ability: {
              comment: '技能伤害',
              value: 0,
            },
            special: {
              comment: '奥义伤害',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
          damageTaken: {
            total: {
              comment: '总计',
              value: 0,
            },
            attack: {
              comment: '通常攻击&反击',
              value: 0,
            },
            super: {
              comment: '特动',
              value: 0,
            },
            other: {
              comment: '其他',
              value: 0,
            },
          },
        },
      ],
      actionQueue: [
        {
          turn: 1,
          bossHpPercent: 100,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2497_3',
              id: '242661',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2495_3',
              id: '242621',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2610_3',
              id: '244911',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2611_3',
              id: '244921',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1703_3',
              id: '201621',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 1,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '150ヒット|奥義10回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 9,
            ability: 0,
            special: 4400000,
            total: 5400000,
            chain: 4,
          },
        },
        {
          turn: 2,
          bossHpPercent: 99.97,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 1,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '141ヒット|奥義6回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 9,
            ability: 0,
            special: 4400000,
            total: 5400000,
            chain: 4,
          },
        },
        {
          turn: 3,
          bossHpPercent: 99.93,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1703_3',
              id: '201621',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'summon',
              id: '2040425000',
              icon: '2040425000',
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 1,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '132ヒット|奥義2回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 9,
            ability: 0,
            special: 4400000,
            total: 5400000,
            chain: 4,
          },
        },
        {
          turn: 4,
          bossHpPercent: 99.87,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 1,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '118ヒット',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 9,
            ability: 0,
            special: 4400000,
            total: 5400000,
            chain: 4,
          },
        },
        {
          turn: 5,
          bossHpPercent: 99.84,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 1,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '109ヒット',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 9,
            ability: 0,
            special: 4400000,
            total: 5400000,
            chain: 4,
          },
        },
        {
          turn: 6,
          bossHpPercent: 99.81,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1703_3',
              id: '201621',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2497_3',
              id: '242661',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1916_3',
              id: '247611',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2800_1',
              id: '247585',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 4,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '100ヒット',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 17,
            ability: 4800000,
            special: 4400000,
            total: 10200000,
            chain: 4,
          },
        },
        {
          turn: 7,
          bossHpPercent: 99.71,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'temporary',
              icon: '1',
              id: '1',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'temporary',
              icon: '1',
              id: '1',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/s/3040390000_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 4,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 3,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '67ヒット',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 17,
            ability: 4800000,
            special: 4400000,
            total: 10200000,
            chain: 4,
          },
        },
        {
          turn: 8,
          bossHpPercent: 99.65,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 4,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 5,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '50ヒット',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 17,
            ability: 4800000,
            special: 4400000,
            total: 10200000,
            chain: 4,
          },
        },
        {
          turn: 9,
          bossHpPercent: 99.58,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 4,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 5,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '33ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 47,
            ability: 4800000,
            special: 4400000,
            total: 22676294,
            chain: 4,
          },
        },
        {
          turn: 10,
          bossHpPercent: 99.45,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1627_3',
              id: '228491',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1625_1',
              id: '228461',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1627_3',
              id: '228491',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/s/3040390000_01.jpg',
              ],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 1,
            },
            {
              num: 4,
              is_guard_status: 1,
            },
            {
              num: 2,
              is_guard_status: 1,
            },
            {
              num: 5,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果10回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 9,
            ability: 0,
            special: 0,
            total: 4246099,
            chain: 0,
          },
        },
        {
          turn: 11,
          bossHpPercent: 99.41,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1915_3',
              id: '247601',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1917_3',
              id: '234461',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2581_3',
              id: '244411',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2582_3',
              id: '244441',
              aim: [],
            },
            {
              type: 'summon',
              id: '2040065000',
              icon: '2040065000_02',
            },
            {
              type: 'temporary',
              icon: '2',
              id: '2',
            },
            {
              type: 'ability',
              icon: '2744_3',
              id: '246771',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1703_3',
              id: '201621',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 4,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 126,
            ability: 45333241,
            special: 34438428,
            total: 131772410,
            chain: 4,
          },
        },
        {
          turn: 12,
          bossHpPercent: 98.54,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'summon',
              id: '2040442000',
              icon: '2040442000',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 131,
            ability: 72571779,
            special: 45830833,
            total: 188610807,
            chain: 4,
          },
        },
        {
          turn: 13,
          bossHpPercent: 97.34,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '249_1',
              id: '244431',
              aim: [],
            },
            {
              type: 'summon',
              id: '2040205000',
              icon: '2040205000',
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果10回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 143,
            ability: 101297428,
            special: 50453764,
            total: 228301321,
            chain: 4,
          },
        },
        {
          turn: 14,
          bossHpPercent: 95.88,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 140,
            ability: 88519326,
            special: 46873593,
            total: 209173992,
            chain: 4,
          },
        },
        {
          turn: 15,
          bossHpPercent: 94.57,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果10回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 140,
            ability: 95729706,
            special: 50397751,
            total: 220208633,
            chain: 4,
          },
        },
        {
          turn: 16,
          bossHpPercent: 93.05,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 142,
            ability: 97176508,
            special: 46767875,
            total: 217543150,
            chain: 4,
          },
        },
        {
          turn: 17,
          bossHpPercent: 91.69,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 140,
            ability: 87123064,
            special: 48382574,
            total: 210032686,
            chain: 4,
          },
        },
        {
          turn: 18,
          bossHpPercent: 90.38,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '50ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 140,
            ability: 87284706,
            special: 46041289,
            total: 206679893,
            chain: 4,
          },
        },
        {
          turn: 19,
          bossHpPercent: 89.01,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2583_3',
              id: '244451',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2745_3',
              id: '246781',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '99,999,999ダメージ',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 247,
            ability: 151225051,
            special: 46675928,
            total: 408793165,
            chain: 4,
          },
        },
        {
          turn: 20,
          bossHpPercent: 86.5,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '奥義6回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 154,
            ability: 114528581,
            special: 51717120,
            total: 246843249,
            chain: 4,
          },
        },
        {
          turn: 21,
          bossHpPercent: 84.96,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              type: 'ability',
              icon: '249_1',
              id: '244431',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果10回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 156,
            ability: 123342220,
            special: 50755035,
            total: 254838838,
            chain: 4,
          },
        },
        {
          turn: 22,
          bossHpPercent: 83.32,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 154,
            ability: 116621130,
            special: 51445593,
            total: 249085984,
            chain: 4,
          },
        },
        {
          turn: 23,
          bossHpPercent: 81.77,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果10回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 154,
            ability: 114955042,
            special: 50823425,
            total: 246481271,
            chain: 4,
          },
        },
        {
          turn: 24,
          bossHpPercent: 80.23,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 156,
            ability: 123031397,
            special: 50769639,
            total: 254399522,
            chain: 4,
          },
        },
        {
          turn: 25,
          bossHpPercent: 78.69,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果10回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 153,
            ability: 113687354,
            special: 50817231,
            total: 245225672,
            chain: 4,
          },
        },
        {
          turn: 26,
          bossHpPercent: 77.1,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 110979171,
            special: 52231595,
            total: 244543329,
            chain: 4,
          },
        },
        {
          turn: 27,
          bossHpPercent: 75.57,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '奥義5回|ダメージアビリティ3回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 156,
            ability: 120883740,
            special: 50874272,
            total: 252630243,
            chain: 4,
          },
        },
        {
          turn: 28,
          bossHpPercent: 73.92,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2583_3',
              id: '244451',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 111701530,
            special: 52135976,
            total: 289155602,
            chain: 4,
          },
        },
        {
          turn: 29,
          bossHpPercent: 72.05,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 110469852,
            special: 50792674,
            total: 241668874,
            chain: 4,
          },
        },
        {
          turn: 30,
          bossHpPercent: 70.53,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '奥義5回|ダメージアビリティ3回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 156,
            ability: 119912336,
            special: 51688507,
            total: 252045851,
            chain: 4,
          },
        },
        {
          turn: 31,
          bossHpPercent: 68.92,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '奥義5回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 108914302,
            special: 50703910,
            total: 237453716,
            chain: 4,
          },
        },
        {
          turn: 32,
          bossHpPercent: 67.33,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1718_3',
              id: '230071',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 112678930,
            special: 52025094,
            total: 245563293,
            chain: 4,
          },
        },
        {
          turn: 33,
          bossHpPercent: 65.79,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '奥義5回|ダメージアビリティ3回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 155,
            ability: 121559751,
            special: 51996677,
            total: 254514693,
            chain: 4,
          },
        },
        {
          turn: 34,
          bossHpPercent: 64.18,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 154,
            ability: 116743465,
            special: 52035020,
            total: 249656770,
            chain: 4,
          },
        },
        {
          turn: 35,
          bossHpPercent: 62.62,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 154,
            ability: 117353908,
            special: 52072718,
            total: 250364161,
            chain: 4,
          },
        },
        {
          turn: 36,
          bossHpPercent: 61.06,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2745_3',
              id: '246781',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2583_3',
              id: '244451',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '奥義5回|ダメージアビリティ3回',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 257,
            ability: 166781979,
            special: 52722479,
            total: 433695120,
            chain: 4,
          },
        },
        {
          turn: 37,
          bossHpPercent: 58.34,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 154,
            ability: 116193371,
            special: 51871281,
            total: 248830048,
            chain: 4,
          },
        },
        {
          turn: 38,
          bossHpPercent: 56.72,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 154,
            ability: 116531462,
            special: 51991275,
            total: 249371683,
            chain: 4,
          },
        },
        {
          turn: 39,
          bossHpPercent: 55.16,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '50ヒット|弱体効果12回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 156,
            ability: 125654985,
            special: 52054444,
            total: 258650461,
            chain: 4,
          },
        },
        {
          turn: 40,
          bossHpPercent: 53.54,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 115493779,
            special: 52497653,
            total: 250174091,
            chain: 4,
          },
        },
        {
          turn: 41,
          bossHpPercent: 51.97,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '50ヒット|弱体効果12回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 154,
            ability: 117491960,
            special: 52078183,
            total: 250581311,
            chain: 4,
          },
        },
        {
          turn: 42,
          bossHpPercent: 50.41,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1703_3',
              id: '201621',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8001',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8002',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1703_3',
              id: '201621',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8001',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8002',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8001',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8002',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '30,000,000アビダメ|30,000,000奥義ダメ|アビリティ12回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 156,
            ability: 125676702,
            special: 52503784,
            total: 259790245,
            chain: 4,
          },
        },
        {
          turn: 43,
          bossHpPercent: 48.83,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 152,
            ability: 98491237,
            special: 44732390,
            total: 207888717,
            chain: 4,
          },
        },
        {
          turn: 44,
          bossHpPercent: 47.48,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2583_3',
              id: '244451',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 152,
            ability: 99727496,
            special: 46245651,
            total: 245925267,
            chain: 4,
          },
        },
        {
          turn: 45,
          bossHpPercent: 45.95,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: 'ディスペル5回|フェイタルチェイン1回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 156,
            ability: 115349193,
            special: 47853921,
            total: 234020621,
            chain: 4,
          },
        },
        {
          turn: 46,
          bossHpPercent: 44.49,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 100165567,
            special: 45873913,
            total: 211372352,
            chain: 4,
          },
        },
        {
          turn: 47,
          bossHpPercent: 43.17,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: 'ディスペル5回|フェイタルチェイン1回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 91,
            ability: 88126284,
            special: 47864723,
            total: 177067842,
            chain: 4,
          },
        },
        {
          turn: 48,
          bossHpPercent: 42.04,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 148,
            ability: 80136664,
            special: 41329382,
            total: 181723265,
            chain: 4,
          },
        },
        {
          turn: 49,
          bossHpPercent: 40.83,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 152,
            ability: 100938193,
            special: 45804236,
            total: 216171240,
            chain: 4,
          },
        },
        {
          turn: 50,
          bossHpPercent: 39.48,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8001',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8002',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '800万ダメ3ヒット|弱体アビリティ2回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 155,
            ability: 109229867,
            special: 45827015,
            total: 223640312,
            chain: 4,
          },
        },
        {
          turn: 51,
          bossHpPercent: 38.08,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 101470210,
            special: 45042423,
            total: 215066861,
            chain: 4,
          },
        },
        {
          turn: 52,
          bossHpPercent: 36.74,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2583_3',
              id: '244451',
              aim: [],
            },
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              type: 'ability',
              icon: '2745_3',
              id: '246781',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: 'ディスペル5回|フェイタルチェイン1回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 152,
            ability: 115439678,
            special: 48263720,
            total: 287308846,
            chain: 4,
          },
        },
        {
          turn: 53,
          bossHpPercent: 34.94,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 1,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 88,
            ability: 74139856,
            special: 45090445,
            total: 158646316,
            chain: 4,
          },
        },
        {
          turn: 54,
          bossHpPercent: 33.94,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: 'ディスペル5回|フェイタルチェイン1回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 151,
            ability: 93290060,
            special: 44058408,
            total: 203192707,
            chain: 4,
          },
        },
        {
          turn: 55,
          bossHpPercent: 32.65,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 152,
            ability: 102105254,
            special: 45742035,
            total: 222320062,
            chain: 4,
          },
        },
        {
          turn: 56,
          bossHpPercent: 31.26,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 152,
            ability: 101015904,
            special: 45773652,
            total: 216650228,
            chain: 4,
          },
        },
        {
          turn: 57,
          bossHpPercent: 29.9,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: 'ディスペル5回|フェイタルチェイン1回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 155,
            ability: 115554405,
            special: 47881438,
            total: 235188524,
            chain: 4,
          },
        },
        {
          turn: 58,
          bossHpPercent: 28.42,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              type: 'ability',
              icon: '249_1',
              id: '244431',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果15回|300万ダメ8ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 153,
            ability: 102246230,
            special: 45087193,
            total: 217079309,
            chain: 4,
          },
        },
        {
          turn: 59,
          bossHpPercent: 27.03,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '13_4',
              id: '8001',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8002',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '800万ダメ3ヒット|弱体アビリティ2回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 91,
            ability: 83436685,
            special: 45064661,
            total: 167986523,
            chain: 4,
          },
        },
        {
          turn: 60,
          bossHpPercent: 25.94,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2743_1',
              id: '246751',
              aim: [],
            },
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果15回|300万ダメ8ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 148,
            ability: 85294404,
            special: 44391164,
            total: 193193137,
            chain: 4,
          },
        },
        {
          turn: 61,
          bossHpPercent: 24.6,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 152,
            ability: 102093435,
            special: 46087674,
            total: 218976069,
            chain: 4,
          },
        },
        {
          turn: 62,
          bossHpPercent: 23.22,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8001',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8002',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '800万ダメ3ヒット|弱体アビリティ2回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 155,
            ability: 110405228,
            special: 45875352,
            total: 224031820,
            chain: 4,
          },
        },
        {
          turn: 63,
          bossHpPercent: 21.82,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: 'ディスペル5回|フェイタルチェイン1回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 88,
            ability: 79284620,
            special: 47851089,
            total: 168169836,
            chain: 4,
          },
        },
        {
          turn: 64,
          bossHpPercent: 20.75,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '249_1',
              id: '244431',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果15回|300万ダメ8ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 152,
            ability: 90900174,
            special: 39836147,
            total: 192311111,
            chain: 4,
          },
        },
        {
          turn: 65,
          bossHpPercent: 19.51,
          special_skill_flag: 0,
          actionList: [
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 153,
            ability: 104189361,
            special: 45824832,
            total: 225083880,
            chain: 4,
          },
        },
        {
          turn: 66,
          bossHpPercent: 18.11,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2743_1',
              id: '246751',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/leader/s/310901_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果15回|300万ダメ8ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 152,
            ability: 102221961,
            special: 45678297,
            total: 219578630,
            chain: 4,
          },
        },
        {
          turn: 67,
          bossHpPercent: 16.68,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '13_4',
              id: '8001',
              aim: [],
            },
            {
              type: 'ability',
              icon: '13_4',
              id: '8002',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '800万ダメ3ヒット|弱体アビリティ2回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 155,
            ability: 111240087,
            special: 45162596,
            total: 227227610,
            chain: 4,
          },
        },
        {
          turn: 68,
          bossHpPercent: 15.26,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 1,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 1,
            },
            {
              num: 6,
              is_guard_status: 1,
            },
          ],
          interrupt_display_text: '',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 53,
            ability: 17294019,
            special: 0,
            total: 44129702,
            chain: 0,
          },
        },
        {
          turn: 69,
          bossHpPercent: 15,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              type: 'temporary',
              icon: '2',
              id: '2',
            },
            {
              type: 'ability',
              icon: '2745_3',
              id: '246781',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/s/3040617000_01.jpg',
              ],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '600万ダメ5ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 245,
            ability: 124297805,
            special: 38497740,
            total: 272717428,
            chain: 4,
          },
        },
        {
          turn: 70,
          bossHpPercent: 13.26,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2745_3',
              id: '246781',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '120ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 240,
            ability: 117594319,
            special: 38560843,
            total: 265982958,
            chain: 4,
          },
        },
        {
          turn: 71,
          bossHpPercent: 11.62,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: 'ディスペル6回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 154,
            ability: 92186614,
            special: 38476978,
            total: 193798900,
            chain: 4,
          },
        },
        {
          turn: 72,
          bossHpPercent: 10.41,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2743_1',
              id: '246751',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/s/3040617000_01.jpg',
              ],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '100,000,000ダメージ',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 151,
            ability: 83948438,
            special: 38736757,
            total: 182488929,
            chain: 4,
          },
        },
        {
          turn: 73,
          bossHpPercent: 9.22,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              type: 'ability',
              icon: '249_1',
              id: '244431',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2743_1',
              id: '246751',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果15回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 151,
            ability: 83837654,
            special: 38734381,
            total: 183343374,
            chain: 4,
          },
        },
        {
          turn: 74,
          bossHpPercent: 8.01,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2745_3',
              id: '246781',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '240ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 245,
            ability: 120797299,
            special: 38112386,
            total: 267097656,
            chain: 4,
          },
        },
        {
          turn: 75,
          bossHpPercent: 6.36,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'summon',
              id: '2040080000',
              icon: '2040080000_04',
            },
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              type: 'ability',
              icon: '2583_3',
              id: '244451',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2743_1',
              id: '246751',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/s/3040617000_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '200,000,000ダメージ',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 152,
            ability: 90443528,
            special: 40918213,
            total: 221508586,
            chain: 4,
          },
        },
        {
          turn: 76,
          bossHpPercent: 4.87,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              id: '190071',
              icon: 'singularity_chain_1',
              aim: [],
            },
            {
              type: 'ability',
              icon: '249_1',
              id: '244431',
              aim: [],
            },
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '弱体効果30回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 154,
            ability: 96337575,
            special: 40565683,
            total: 200406614,
            chain: 4,
          },
        },
        {
          turn: 77,
          bossHpPercent: 3.37,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2743_1',
              id: '246751',
              aim: [],
            },
            {
              type: 'ability',
              icon: '2745_3',
              id: '246781',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1705_3',
              id: '8000',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: 'ディスペル12回',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 242,
            ability: 113402560,
            special: 38304135,
            total: 262179695,
            chain: 4,
          },
        },
        {
          turn: 78,
          bossHpPercent: 1.7,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'summon',
              id: '2040425000',
              icon: '2040425000',
            },
            {
              type: 'fc',
              id: '5',
              icon: '5',
            },
            {
              type: 'ability',
              icon: '1716_3',
              id: '230051',
              aim: [
                'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/npc/s/3040617000_01.jpg',
              ],
            },
            {
              type: 'ability',
              icon: '2743_1',
              id: '246751',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '600万ダメ10ヒット',
          special_skill_interrupt: true,
          normalAttackInfo: {
            hit: 154,
            ability: 96633501,
            special: 40586917,
            total: 201464221,
            chain: 4,
          },
        },
        {
          turn: 79,
          bossHpPercent: 0.32,
          special_skill_flag: 0,
          actionList: [
            {
              type: 'ability',
              icon: '2745_3',
              id: '246781',
              aim: [],
            },
            {
              type: 'ability',
              icon: '1715_3',
              id: '230041',
              aim: [],
            },
            {
              icon: 'attack',
              id: 'attack',
              type: 'attack',
            },
          ],
          guard_status: [
            {
              num: 0,
              is_guard_status: 0,
            },
            {
              num: 7,
              is_guard_status: 0,
            },
            {
              num: 2,
              is_guard_status: 0,
            },
            {
              num: 6,
              is_guard_status: 0,
            },
          ],
          interrupt_display_text: '360ヒット',
          special_skill_interrupt: false,
          normalAttackInfo: {
            hit: 24,
            ability: 33364619,
            special: 18857903,
            total: 53349021,
            chain: 2,
          },
        },
      ],
    },
    anonymous: true,
    questName: '顕現せし破壊の化身',
    questImage: '/sp/quest/assets/lobby/305701.png',
    account: 'グラン',
    createTime: 1777877844616,
    key: 'fHlgQww7fphBnNrmHptO',
  },
]

type DetailType = 'party' | 'action'

const loading = ref(false)
const feedList = ref<BuildResponse[]>([])
const dialogVisible = ref(false)
const currentBuild = ref<BuildResponse>()
const detailType = ref<DetailType>('party')

function handleQuery() {
  feedList.value = data as any
  // loading.value = true
  // listBuild({ questId: buildQuestId.value, npcFilter: buildNpcFilter.value }).then(({ data }) => {
  //   buildList.value = data.list
  //   msg.value = buildList.value.length === 0 ? '未找到匹配的数据' : ''
  // }).finally(() => {
  //   loading.value = false
  // })
}

function handleCommand(command: DetailType, data: BuildResponse) {
  detailType.value = command
  dialogVisible.value = true
  currentBuild.value = data
}

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <div sticky inset-x-0 top-0 z-999 h-10 flex items-center justify-between rounded bg-neutral-8 px-4 text-base>
    <TheButton icon="carbon:search" :loading="loading" @click="handleQuery">
      查询
    </TheButton>
  </div>
  <div grid mt-10px gap-10px>
    <el-card v-for="item, idx in feedList" :key="idx" w-300px text-12px body-style="padding: 5px !important">
      <div flex items-center justify-between>
        <div fc gap-5px>
          <img v-if="item.bossImage" h-44px w-44px :src="getBossImg('enemy', item.bossImage, 's')">
          <div>
            {{ `${item.account} · ${formatEventDate(item.createTime)}` }}
          </div>
        </div>
        <TheButton @click="handleCommand('party', item)">
          详情
        </TheButton>
      </div>

      <div whitespace-pre-line p-5px text-15px>
        {{ `操作时长/跑速: ${item.realSpeed}` }}
      </div>

      <div fc flex-wrap gap-2px>
        <div v-if="item.deck.priority.length > 6" w-40px shrink-0 />
        <div v-for="player, index in item.detail.player" :key="player.image_id" fc shrink-0 gap-2px>
          <img w-45px :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id, 's')">
          <div v-if="index === 3 && item.deck.priority.length > 6" w-40px shrink-0 />
        </div>
      </div>
    </el-card>
  </div>
</template>
