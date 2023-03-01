export interface EvokerState {
  materialInfo: Array<MaterialInfo>
  evokerInfo: {
    no: number
    name: string
    target: boolean
    tarotLevel: number
    evokerLevel: number
    weaponId: number
  }[]
}

export interface MaterialInfo {
  item_id: string
  image: string
  name: string
  number: string
  comment: string
  seq_id: string
  disable: string
  category_type: string[]
  is_display_select_item: boolean
}

export interface EvokerInfo {
  no: number
  name: string
  target: boolean
  tarotLevel: number
  evokerLevel: number
  weaponId: number
  weaponLevel?: number
  domainLevel?: number
}
