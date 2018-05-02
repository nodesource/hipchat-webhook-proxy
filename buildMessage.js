
const messages = {
  'nsolid-saved-view-match': savedView, // v3
  'nsolid-agent-exit': agentExit, // v3
  'nsolid-agent-online': agentOnline, // v2
  'nsolid-agent-offline': agentOffline, // v2
  'nsolid-cpu-threshold-exceeded': cpuThresholdExceeded, // v2
  'nsolid-heap-threshold-exceeded': heapThresholdExceeded, // v2
  'nsolid-vulnerability-detected': vulnerabilityDetected, //v2 and v3
  'nsolid-snapshot-generated': snapshot, // v2 and v3
  'nsolid-profile-generated': profile, // v2 and v3
  'nsolid-process-blocked': processBlocked // v2 and v3
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
  if (evt.vulnerability) {
    return `> Vulnerability found in ${evt.vulnerability.package}@${evt.vulnerability.vulnerable} in ${describeAgent(evt)}.`
  } else if (evt.vulnerabilities) {
    let vuln = 'Vulnerability found in \n'
    for (let i = 0, length1 = evt.vulnerabilities.length; i < length1; i++) {
      vuln += `${evt.vulnerabilities[i].package}@${evt.vulnerabilities[i].vulnerable} in ${describeAgent(evt)}. \n`
    }
    return vuln
  } else {
    return 'Unknown vulnerability package on Unknown version'
  }

}

function snapshot (evt) {
  return `> New heap snapshot taken of ${describeAgent(evt)}.`
}

function profile (evt) {
  return `> New CPU profile taken of ${describeAgent(evt)}.`
}

function processBlocked (evt) {
  const trace = (evt.stacktrace) ? evt.stacktrace.replace('```', `'''`) : evt.stack.replace('```', `'''`)
  const lines = trace.split('\n')
  const first = lines.shift()
  const result = '> ' + first + ' ```' + lines.join('\n') + '```'
  return result
}

function savedView (evt) {
  return `> Saved view ${evt.config.name} match: ${describeAgent(evt)}`
}

function agentExit (evt) {
  return `> Agent exit: ${describeAgent(evt)}`
}

function describeAgent (evt) {
  if (evt.agent) {
    const agent = evt.agent || {}
    const pid = agent.pid || 'Unknown pid'
    const hostname = agent.hostname || 'Unknown hostname'
    const app = evt.app || 'Unknown application'

    return `${app} (${pid}) on ${hostname}`
  } else if (evt.agents) {
    let agents = '\n'
    for (let i = 0, length1 = evt.agents.length; i < length1; i++) {
      let { app, pid, hostname } = evt.agents[i].info
      agents += `${app} (${pid}) on ${hostname} \n`
    }

    return agents
  } else {
    return 'Unknown application on Unknown hostname'
  }
}

function toPercent (num) {
  return `${Math.round(100 * num)}%`
}
