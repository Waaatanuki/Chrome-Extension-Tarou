export function setupDebuggerListener() {
  chrome.debugger.onEvent.addListener((source, method, params: any) => {
    if (method === 'Network.webSocketFrameReceived') {
      const payloadData: string = params.response?.payloadData || ''
      if (payloadData.substring(0, 2) === '42') {
        // console.log(JSON.parse(payloadData.substring(2))[1].bossUpdate?.param?.boss1_condition)
        handleWsPayloadJson(JSON.parse(payloadData.substring(2))[1])
      }
    }
  })
}
