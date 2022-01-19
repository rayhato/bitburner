export async function main(ns) {
    if (ns.getHostname() !== "home") {
      throw new Exception("Run the script from home");
    }
  
    await ns.wget(
      `https://raw.githubusercontent.com/rayhato/bitburner/master/scripts/10-initHacking.js?ts=${new Date().getTime()}`,
      "10-initHacking.js"
    );
    ns.spawn("10-initHacking.js", 1);
  }