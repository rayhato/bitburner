const baseUrl = 'https://raw.githubusercontent.com/rayhato/bitburner/master/scripts/'
const filesToDownload = [
  '11-common.js',
  '11-mainHack.js',
  '11-worm.js',
  '11-grow.js',
  '11-hack.js',
  '11-weaken.js',
  '11-killAll.js',
  '11-runHacking.js',
  '11-find.js',
  '20-playerServers.js',
]
const valuesToRemove = ['BB_SERVER_MAP']

function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toLocaleTimeString()
}

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting initHacking.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  for (let i = 0; i < filesToDownload.length; i++) {
    const filename = filesToDownload[i]
    const path = baseUrl + filename
    await ns.scriptKill(filename, 'home')
    await ns.rm(filename)
    await ns.sleep(200)
    ns.tprint(`[${localeHHMMSS()}] Trying to download ${path}`)
    await ns.wget(path + '?ts=' + new Date().getTime(), filename)
  }

  valuesToRemove.map((value) => localStorage.removeItem(value))

  ns.tprint(`[${localeHHMMSS()}] Spawning killAll.js`)
  ns.spawn('11-killAll.js', 1, '11-runHacking.js')
}
