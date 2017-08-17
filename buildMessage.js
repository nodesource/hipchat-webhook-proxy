const messages = {
  'nsolid-agent-online': agentOnline,
  'nsolid-agent-offline': agentOffline,
  'nsolid-cpu-threshold-exceeded': cpuThresholdExceeded,
  'nsolid-heap-threshold-exceeded': heapThresholdExceeded,
  'nsolid-vulnerability-detected': vulnerabilityDetected,
  'nsolid-snapshot-generated': snapshot,
  'nsolid-profile-generated': profile,
  'nsolid-process-blocked': processBlocked
}

module.exports = function buildMessage (task) {
  if (!messages[task.event]) {
    return
  }

  return messages[task.event](task)
}

function agentOnline (evt) {
  return `> New agent online. ${describeAgent(evt)}.`
}

function agentOffline (evt) {
  return `> An agent has gone offline. ${describeAgent(evt)}.`
}

function cpuThresholdExceeded (evt) {
  const curr = toPercent(evt.threshold.cpu.value)
  const thresh = toPercent(evt.threshold.cpu.threshold)
  var msg = `> CPU used (${curr}) exceeds threshold (${thresh}) by ${describeAgent(evt)}.`
  if (evt.assets) {
    for (let type of Object.keys(evt.assets)) {
      msg += `\n> \u{2022} ${type} created, view at ${evt.assets[type]}`
    }
  }
  return msg
}

function heapThresholdExceeded (evt) {
  const curr = toPercent(evt.threshold.heap.value)
  const thresh = toPercent(evt.threshold.heap.threshold)
  var msg = `> Heap memory used (${curr}) exceeds threshold (${thresh}) by ${describeAgent(evt)}.`
  if (evt.assets) {
    for (let type of Object.keys(evt.assets)) {
      msg += `\n> \u{2022} ${type} created, view at ${evt.assets[type]}`
    }
  }
  return msg
}

function vulnerabilityDetected (evt) {
  return `> Vulnerability found in ${evt.vulnerability.package}@${evt.vulnerability.vulnerable} in ${describeAgent(evt)}.`
}

function snapshot (evt) {
  return `> New heap snapshot taken of ${describeAgent(evt)}.`
}

function profile (evt) {
  return `> New CPU profile taken of ${describeAgent(evt)}.`
}

function processBlocked (evt) {
  const trace = evt.stacktrace.replace('```', `'''`)
  const lines = trace.split('\n')
  const first = lines.shift()
  const result = '> ' + first + ' ```' + lines.join('\n') + '```'
  return result
}

function describeAgent (evt) {
  const agent = evt.agent || {}
  const pid = agent.pid || 'Unknown pid'
  const hostname = agent.hostname || 'Unknown hostname'
  const app = evt.app || 'Unknown application'
  return `${app} (${pid}) on ${hostname}`
}

function toPercent (num) {
  return `${Math.round(100 * num)}%`
}
