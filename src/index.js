document.addEventListener('DOMContentLoaded', function () {
  if (window.qapp_monitor && window.qapp_monitor.callInternalStepPoint) {
    window.qapp_monitor.callInternalStepPoint('perfContentLoad')
  }
  console.log('DOMContentLoaded...')
})
