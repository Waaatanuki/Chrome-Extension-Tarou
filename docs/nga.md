===概述===
[quote]
摸鱼做的一些gbf用得到的小玩意，随缘更新。
[/quote]
===主要功能===
[quote]
[list]
[*]贤者素材：输入素材信息和贤者信息后计算所需素材数量
[*]猎金统计：依赖另外开发的 chrome 插件收集的猎金信息，统计并分析个人的猎金数据
[*]抽卡模拟：计算当前一共多少抽，还可以进行模拟抽卡
[*]子弹制作：选择子弹后，可查看所需素材，并且可以点击隐藏已经刷完的素材
[*]战货计算：输入数据计算月末战货、工会战、团战可抽战货箱子数
[*]暴击计算：选择武器技能，显示不同加护下的暴击率
[/list]
[/quote]
===使用方法===
[quote]
[url=https://waaatanuki.github.io/gbf-app/]网站地址 点击即用[/url]  [url=https://waaatanuki.gitee.io/gbf-app/]备用地址[/url]
[/quote]
===Chrome插件===
[color=crimson][b]写在前面：下文提到的插件不涉及任何游戏数据及页面修改。我写的我在用。责任自负。珍惜自己的游戏账号。[/b][/color]

[quote]
[size=200%][b][align=center]太郎Tarou v2.0 更新日志[/align][/b][/size]
===新的特性===
[list]
[*]数据上传：是的，我们终于可以通过上传掉落数据来代替之前的手动合并了，幸福指数提升114514%
[*]友招信息：现在进入个人信息页面，将会自动获取友招信息，并展示在详细面板主页
[*]角色状态：战斗日志界面现在会展示我方所有角色状态信息，并可切换是否只显示标记状态
[*]武器信息：队伍信息中武器盘增加法武和U武的2技能插件展示
[*]攻击结果：原战斗日志中的平A结果更新为攻击结果，记录按下攻击按钮造成的所有伤害类型(不包括回合后伤害)的hit数和伤害总和
[*]伤害统计：底部总计旁增加信息图标，悬浮展示不同类别伤害的总计及占比
[*]系统优化：优化通信机制和一些报错的自动处理
[/list]
===更新指南===
本次更新变动最大的地方就是掉落统计功能，简要说明一下更新点和使用方法(以下说明全都基于2.0版本)：
[list]
[*]插件会自动上传所有检测到的掉落记录，上传失败的数据会存起来，下次上传时合并一起上传，插件图标上的数字代表当前有多少条上传失败的数据，正常情况不显示。
[*]新增[引继码]用于绑定掉落记录，引继码不存在的时候会在上传流程中自动生成，点击插件面板右下角的玩家ID可以查看或变更引继码
[*]每台设备都会生成唯一的引继码，变更引继码可以把旧引继码绑定的数据转移到新引继码上，同时也统一了多台设备的引继码，这样设备产生的数据就可以用一个引继码查询出来
[*]变更引继码时，新引继码使用其他设备已经生成的引继码或者自己生成一个[url=https://www.uuidgenerator.net/version4]uuidv4[/url]
[*]数据不会消失，但是可能转移。妥善保管你的引继码，各个设备引继码统一后一般不需要再做更改，如果你觉得你的引继码泄露了，你需要自己给每一个设备更新
[*]掉落统计默认没有收藏副本，详细面板中掉落统计右上角的管理副本可以点击副本切换显影，拖动改变顺序。数据则是根据当前引继码所绑定的记录统计而来。
[*]gbfApp和旧版插件导出的猎金数据都可以在掉落统计中导入，沙漏数据因为缺少原始信息无法导入。
[/list]
一句话流程：导出或截图沙漏数据纪念(需要的话)→更新插件→随便点开个战斗记录触发引继码生成→进入详细面板掉落统计页面管理副本→导入旧猎金数据→结束，其他设备触发引继码生成后将引继码替换为自己主设备的引继码。
===最后===
感谢磁盘人提供的服务器和后端支持！没有他的支持2.0可能猴年马月才能出来了，磁盘人nb！同时太郎能走到今天也离不开大家的支持，红豆泥阿里嘎多~
[/quote]

[quote]
[size=150%][b]太郎Tarou v2.0.0[/b][/size][url=https://img.nga.178.com/attachments/mon_202403/25/-zv3miQk5c-9ulsXfZ44.zip?filename=Chrome%2dExtension%2dTarou%20v1%2e4%2e0%2ezip][color=green]下载[/color][/url] [url=https://github.com/Waaatanuki/Chrome-Extension-Tarou]仓库地址[/url] [size=80%][color=crimson]*Chrome最低版本要求99[/color][/size]
[color=coral]插件所在文件夹不要带版本号，保持Chrome-Extension-Tarou这个名称，更新先将原文件夹删除，将解压出来的Chrome-Extension-Tarou文件夹放到之前的位置，然后[b][color=crimson]插件管理界面点一下重载或刷新按钮(重要！)[/color][/b]，游戏界面也需要刷新或重开。
[b]千万不要在插件管理界面移除插件再加载，这样操作插件数据将会丢失！[/b][/color]
===插件面板(点击插件图标显示)===
[quote]
[img]./mon_202404/22/-zv3miQk6d-4tt6ZiT3cSgd-ie.png[/img]
[/quote]

===详细面板(游戏页面右键打开或插件面板按钮点击打开)===
[quote]
===主页===
[img]./mon_202404/22/-zv3miQk6d-ct3rZ15T3cS12i-la.png[/img]
[/quote]

[quote]
===贤者素材===
[img]./mon_202404/22/-zv3miQk6d-92ddZ1iT3cSmy-to.png[/img]
[/quote]

[quote]
===掉落统计===
[img]./mon_202404/22/-zv3miQk6d-p1tZmT3cSt4-he.png[/img]
[/quote]

[quote]
===队伍信息===
[img]./mon_202404/22/-zv3miQk6d-5kt5Z1wT3cSsu-m8.png[/img]
[/quote]

[quote]
===战斗日志===
[img]./mon_202404/22/-zv3miQk6d-7nscZ1iT3cSz0-w9.png[/img]
[/quote]

[quote]
===战斗历史===
[img]./mon_202404/22/-zv3miQk6d-3623K24T3cSsg-fi.png[/img]
[/quote]

[quote]
===标记用户===
[img]./mon_202404/22/-zv3miQk6d-h3fgK17T3cSnp-b8.png[/img]
[/quote]

[collapse=常见问题]
[b]一、插件如何获取的数据[/b]
掉落数据是通过分析页面元素来获得，详细面板数据是通过[url=https://developer.chrome.com/docs/extensions/reference/debugger]chrome.debugger[/url]API服务对浏览器进行调试，监听游戏中的各种请求返回的数据，[color=crimson]两者都不会对数据做任何修改[/color]。

[b]二、掉落数据不统计[/b]
[list]
[*]使用汉化插件时，如果boss名称也被汉化就会统计不到
[*]结算页面过快的使用后退刷新会统计不到结算结果
[/list]

[b]三、如何隐藏详细面板上方调试浏览器的提示信息[/b]
[img]./mon_202311/13/fkQk0h-aikeKmT1kSb1-55.png.thumb.jpg[/img]
添加启动项命令 --silent-debugger-extension-api (--前面有个空格)
如果你是直接点桌面的chrome启动的，那你就右击桌面这个快捷方式加命令
如果你是点固定在任务栏的chrome启动的，先把浏览器关了，然后按住shift，右击任务栏的chrome图标在属性里加语句，记得加之前先把浏览器关了
[img]./mon_202311/13/fkQk0h-2b15KuT3cSnt-4x.png.thumb.jpg[/img]
edge用户还需要关闭设置-系统和性能中的这两个选项

[b]四、详细面板的顶部调试信息加了隐藏启动参数也无法隐藏[/b]
多用户的情况下，整个 Chrome 启动第一个实例时如果有该参数，则可以正常隐藏；后续实例即使有该参数也没法生效。

[b]五、不显示弹窗[/b]
一般是系统禁用了浏览器通知，自行百度如何打开浏览器通知
[/collapse]

[collapse=更新日志]
24.04.25 v2.0.0：见上方2.0更新日志
24.03.25 v1.4.0：新增标记玩家功能；队伍信息中主角技能增加图标显示；修复战斗日志报错
24.03.12 v1.3.6：修复官方数据变更导致的战斗日志报错
24.03.06 v1.3.5：修复掉落统计失败的问题
24.02.21 v1.3.4：沙漏增加极法计数，日志增加极法THE END倒计时
24.01.25 v1.3.3：修复掉落统计中时区导致的时间转换错误
24.01.18 v1.3.2：武器盘法武增加超限和新插件信息；日志中救援码点击复制；修复伤害统计问题
24.01.15 v1.3.1：修复弹窗失效问题；修复英文版历史结算的读取问题
24.01.14 v1.3.0：增加右键菜单用于打开详细面板；修复ubn会统计为cb的问题
24.01.05 v1.2.10：优化掉落统计的时间处理；删除过期数据
24.01.05 v1.2.9：修复掉落统计失效的问题；增加战斗历史记录中没有统计过的金本掉落数据
24.01.04 v1.2.8：增加未结算页面的检测；优化掉落统计触发逻辑；修复抽卡刷新结果时重复记录的问题；修复一些报错问题
23.12.28 v1.2.7：修复接口数据变更导致的战斗日志报错
23.12.22 v1.2.6：插件面板及详细面板的副本统计样式优化和统一
23.12.21 v1.2.5：调整插件面板样式，显示金本+收藏沙漏本，点击副本图片隐藏
23.12.19 v1.2.4：沙漏统计增加世界多人本
23.12.18 v1.2.3：修复抽卡统计中傻必10连统计不到的问题
23.11.29 v1.2.2：优化队伍信息处理；修复伤害统计不正确的问题；修复详细面板的位置大小信息记录问题
23.11.21 v1.2.1：修复伤害统计不正确的问题；修复排名没有按顺序显示的问题
23.11.15 v1.2.0：队伍信息中增加队伍比较功能，方便比较不同盘子的效果量
23.11.13 v1.1.1：副本笔记增加图钉功能
23.11.13 v1.1.0：增加可自定义的副本笔记功能；修复bug
23.11.11 v1.0.0：调整启动方式，战斗日志增加实时监控，包括玩家贡献度以及boss状态(需要开启游戏内的贡献度显示)
23.11.06 v0.2.7：武器盘增加龙武2技能显示；展开boss状态栏时也会更新buff数据；优化共斗房间内查看成员信息的体验；修复操作记录滚动延迟问题；修复多头boss仪表盘显示问题
23.10.28 v0.2.6：攒井统计增加查看抽卡记录按钮(需要打开tarou才能记录)；战斗日志增加FC记录
23.10.26 v0.2.5：沙漏统计增加天元；战斗日志boss表盘左下角增加小提示，目前只有天元有；操作列表现在会正确记录子技能图标，比如愚者的34
23.10.16 v0.2.4：战斗日志增加角色承伤统计
23.10.13 v0.2.3：战斗日志增加角色连击率统计，死亡角色增加标记，优化战斗历史数据，修复bug以及优化调整
23.09.18 v0.2.2：战斗日志增加可解除的特动条件显示，增加操作时间([b][i]进本后[/i][/b]到最后一次操作的时间)记录
23.09.16 v0.2.1：修复无伤害奥义导致统计报错的问题，修复部分技能伤害不统计的问题
23.09.15 v0.2.0：战斗日志增加实时的伤害统计与操作记录，增加战斗历史页面
23.09.05 v0.1.9：修复显示其他参展者个人buff的问题、修复没有结算结果时会报错的问题、队伍信息增加技能fa开关状态
23.09.03 v0.1.8：修复副本结算数据统计不到的问题
23.09.01 v0.1.7：武器盘丰富展示信息、战斗日志增加db倒计时
23.08.28 v0.1.6：增加记录队伍信息功能
23.08.13 v0.1.5：优化战斗日志，攻击、召唤、刷新现在都会触发更新
23.08.10 v0.1.4：沙漏统计增加导入导出功能
23.08.07 v0.1.3：修复计数问题
23.08.04 v0.1.2：修复因图标不存在导致的弹窗提醒无效的问题
23.08.02 v0.1.1：修复贤者素材计算不正确的问题
23.08.01 v0.1.0：集成猎金统计插件
23.07.28 v0.0.7：修复因数据结构改变导致抽卡数据不正确的问题
23.05.23 v0.0.6：战斗日志增加多人副本的救援ID显示
23.04.18 v0.0.5：贤者素材界面增加沙盒boss的门票信息展示
23.04.07 v0.0.4：首页增加回复类道具的数量纪录信息
23.04.03 v0.0.3：增加贤者解锁4技能所需素材信息，点进贤者技能说明页面自动读取
23.03.31 v0.0.2：增加贤者5凸素材信息
23.03.29 v0.0.1：初版发布
[/collapse]
[/quote]

===油猴脚本===
[quote]
[size=150%][b]掉落提醒[/b][/size]
targetInfo里面可以自行添加想要提醒的物品，key是 物品类型+下划线+物品id，F12里都能看到，comment是给自己看的，写什么都行
[code=js]
// ==UserScript==
// @name         碧蓝幻想掉落提醒
// @version      0.0.3
// @description  结算出现目标物品时弹窗提醒
// @icon         http://game.granbluefantasy.jp/favicon.ico
// @author       w
// @match        *://game.granbluefantasy.jp/*
// @match        *://gbf.game.mbga.jp/*
// @run-at       document-end
// @grant        GM_notification
// ==/UserScript==
(function () {
  'use strict'

  const targetInfo = [
    { key: '1_1040025400', comment: '极星器 剑' },
    { key: '1_1040816300', comment: '极星器 琴' },
  ]

  const AUDIO_URL = 'https://prd-game-a5-granbluefantasy.akamaized.net/assets/sound/se/treasure_se_2.mp3'
  const audio = new Audio(AUDIO_URL)

  const send = (itemInfo) => {
    GM_notification({
      title: '出货啦',
      text: `${itemInfo.name} GET!!!`,
      image: `https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/assets/${itemInfo.type}/s/${itemInfo.thumbnail_img || itemInfo.id}.jpg`,
      timeout: 3000,
    })
    audio.play()
  }

  let eventOn = false
  window.addEventListener('hashchange', () => {
    if (/^#result(_multi)?\/\d/.test(location.hash)) {
      if (eventOn)
        return
      eventOn = true

      $(document).ajaxSuccess((event, xhr, settings, data) => {
        if (/\/result(multi)?\/content\/index\/\d+/.test(settings.url)) {
          const reward_list = data.option.result_data.rewards.reward_list
          Object.values(reward_list).forEach((box) => {
            for (const [key, info] of Object.entries(box)) {
              if (targetInfo.some(i => i.key === key))
                send(info)
            }
          })
        }
      })
    }
  })
})()
[/code]
[/quote]

[quote]
[color=orangered]报bug、提需求或者有什么问题都可以在本帖回复，也可以加这个qq群咨询→194260754[/color]
[color=orangered]楼里有问题没回复的，基本都是单靠描述无法确定问题的，也欢迎加群询问[/color]
[/quote]
