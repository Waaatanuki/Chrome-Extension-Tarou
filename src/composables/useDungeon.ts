import type { DungeonActionScenario, DungeonScenarioStatus } from 'source'
import { DUNGEON_NORMAL_NODE_LIST, DUNGEON_SPECIAL_NODE_LIST } from '~/constants/dungeon'
import { dungeonInfo, dungeonStatusList } from '~/logic'

export function handleDungeonContent(data: any) {
  if (!data.option?.dungeon.node_list)
    return

  dungeonInfo.value.currentNodeId = data.option.dungeon.current_node_id

  dungeonInfo.value.nodeList = data.option.dungeon.node_list.map((node: any) => ({
    nodeId: node.node_id,
    nodeType: node.node_type,
    positionX: node.position_x,
    positionY: node.position_y,
    adjacentNodeIds: node.adjacent_node_ids,
    specialIncidentId: node.special_incident_id,
  }))
}

export function processDungeonActionScenario(scenarioList: DungeonActionScenario[]) {
  for (const scenario of scenarioList) {
    if (scenario.after_party_status) {
      dungeonInfo.value.party = scenario.after_party_status.map(p => ({
        attribute: String(p.attribute),
        imageId: p.image_id,
        maxHp: Number(p.max_hp),
        hp: Number(p.hp),
      }))
    }

    // 传送
    if (scenario.action_type === 5) {
      dungeonInfo.value.currentNodeId = scenario.warp_node_id
      for (const nodeId of scenario.delete_node_ids ?? []) {
        const hitNode = dungeonInfo.value.nodeList?.find(n => n.nodeId === nodeId)
        if (!hitNode)
          continue
        hitNode.nodeType = 0
      }
    }

    // UPDATE_NODE_TO_CLEARED
    if (scenario.action_type === 7) {
      for (const nodeId of scenario.delete_node_ids ?? []) {
        const hitNode = dungeonInfo.value.nodeList?.find(n => n.nodeId === nodeId)
        if (!hitNode)
          continue
        hitNode.nodeType = 0
      }
    }

    // FOCUS_NODE
    if (scenario.action_type === 11) {
      const hitNode = dungeonInfo.value.nodeList?.find(n => n.nodeId === scenario.node_id)
      if (!hitNode || !scenario.special_incident_id)
        return
      hitNode.specialIncidentId = scenario.special_incident_id
    }

    // 获得导本
    if (scenario.action_type === 400) {
      const statusIds = scenario.status_list?.map(s => s.status_id) ?? []
      addDungeonStatus(statusIds)
    }

    // 选择导本
    if (scenario.action_type === 401) {
      updateDungeonStatus(scenario.status_list)
    }

    // 删除导本
    if (scenario.action_type === 402) {
      for (const status of scenario.status_list ?? []) {
        const hitUserStatus = dungeonInfo.value.statusList?.find(s => s.statusId === status.status_id)
        if (hitUserStatus) {
          hitUserStatus.num--
        }
      }
    }
  }
}

export function addDungeonStatus(statusIds: number[]) {
  dungeonInfo.value.statusList = dungeonInfo.value.statusList || []

  for (const id of statusIds) {
    const hitUserStatus = dungeonInfo.value.statusList?.find(s => s.statusId === id)
    if (hitUserStatus) {
      hitUserStatus.num++
    }
    else {
      const hitStatus = dungeonStatusList.value.find(s => s.statusId === id)
      if (hitStatus)
        dungeonInfo.value.statusList.push({ ...hitStatus, num: 1 })
    }
  }
}

export function updateDungeonStatus(statusList: DungeonScenarioStatus[] = []) {
  for (const status of statusList) {
    const hitStatus = dungeonStatusList.value.find(s => s.statusId === status.status_id)
    const data = {
      statusId: status.status_id,
      rarity: status.rarity,
      name: status.name.replace(/@@/g, ''),
    }
    if (hitStatus)
      Object.assign(hitStatus, data)
    else
      dungeonStatusList.value.push({ ...data, isFavorited: false })
  }
}

export function processNodeSummary() {
  return [
    ...processNormalNodeSummary(),
    ...processSpecialNodeSummary(),
  ]
}

export function processNormalNodeSummary() {
  return DUNGEON_NORMAL_NODE_LIST.reduce((acc: { nodeType: number, icon: string, comment: string, count: number }[], node) => {
    const hitNodes = dungeonInfo.value.nodeList?.filter(n => n.nodeType === node.nodeType) || []
    if (hitNodes.length === 0)
      return acc
    acc.push({
      nodeType: node.nodeType,
      icon: String(node.nodeType),
      comment: node.name,
      count: hitNodes.length,
    })
    return acc
  }, [])
}

export function processSpecialNodeSummary() {
  return DUNGEON_SPECIAL_NODE_LIST.reduce((acc: { nodeType: number, incidentId: number, hasBackground?: boolean, icon: string, comment: string, count: number }[], node) => {
    const hitNodes = dungeonInfo.value.nodeList?.filter(n => n.nodeType === 10 && n.specialIncidentId === node.incidentId) || []
    if (hitNodes.length === 0)
      return acc
    acc.push({
      nodeType: 10,
      incidentId: node.incidentId,
      hasBackground: node.hasBackground,
      icon: node.icon,
      comment: node.comment,
      count: hitNodes.length,
    })
    return acc
  }, [])
}
