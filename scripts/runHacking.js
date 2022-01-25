function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toLocaleTimeString()
}

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting runHacking.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const homeRam = ns.getServerRam('home').shift()

  if (homeRam >= 32) {
    ns.tprint(`[${localeHHMMSS()}] Spawning worm.js`)
    await ns.run('worm.js', 1, 'mainHack.js')
    await ns.sleep(3000)
    ns.tprint(`[${localeHHMMSS()}] Spawning playerServers.js`)
    ns.spawn('playerServers.js', 1)
  } else {
    ns.tprint(`[${localeHHMMSS()}] Spawning worm.js`)
    ns.spawn('worm.js', 1, 'mainHack.js')
  }
}
