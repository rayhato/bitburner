function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toLocaleTimeString()
}

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting runHacking.ns`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const homeRam = ns.getServerRam('home').shift()

  if (homeRam >= 32) {
    ns.tprint(`[${localeHHMMSS()}] Spawning worm.ns`)
    await ns.run('worm.ns', 1, 'mainHack.ns')
    await ns.sleep(3000)
    ns.tprint(`[${localeHHMMSS()}] Spawning playerServers.ns`)
    ns.spawn('playerServers.ns', 1)
  } else {
    ns.tprint(`[${localeHHMMSS()}] Spawning worm.ns`)
    ns.spawn('worm.ns', 1, 'mainHack.ns')
  }
}
