import useEvokerStore from './modules/evoker'
import useDashboardStore from './modules/dashboard'
import useBattleLogStore from './modules/battleLog'

const useStore = () => ({
  evoker: useEvokerStore(),
  dashboard: useDashboardStore(),
  battleLog: useBattleLogStore(),
})

export default useStore
