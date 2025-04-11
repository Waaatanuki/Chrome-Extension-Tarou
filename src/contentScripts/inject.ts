(() => {
  const maxAttempts = 100
  const interval = 100
  let attempts = 0

  const currentScript = document.currentScript as HTMLScriptElement
  const params = new URLSearchParams(currentScript.src.split('?')[1])
  const extensionId = params.get('extensionId')

  if (!extensionId)
    return

  const checkJquery = setInterval(() => {
    if (typeof $ !== 'undefined' || typeof jQuery !== 'undefined') {
      clearInterval(checkJquery)
      $(document).ajaxSuccess((event, xhr, settings, data) => {
        document.dispatchEvent(new CustomEvent(extensionId, {
          detail: JSON.stringify({
            url: settings.url,
            requestData: settings.data,
            responseData: data,
          }),
        }),
        )
      })
    }
    else if (attempts++ > maxAttempts) {
      clearInterval(checkJquery)
    }
  }, interval)
})()
