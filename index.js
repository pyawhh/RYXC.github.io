const req = require('./request.js')
const cheerio = require('cheerio')
const args = process.argv;
const wait = ms => new Promise(res => setTimeout(res, ms * 1000))

async function bypass(hwid) {
    const commoncookie = "Anti-Bypass=BypassersKHTTP_VERSION5069e4e61337c2fbea2368f9da1a07725f2a65bb1eab2d8de6dc9cf83e7a683e; .pipe=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJLMGc4SjNsRmY1TW43UWw4bVh5bytpNnVBeGh4aWFSYTU2bldDZEcxQnlNPSIsImUiOjE2ODkyNTAyODEsImlzc3VlZCI6MTY4OTI0NjY4MS44MzksInNhbHQiOiJzYWx0eSIsImNvbm5lY3RvciI6LTF9.tHnUGnosgCctAafGTgta4F1_1KQezhvdIATrj9YwQU0"
    const start_url = "https://flux.li/windows/start.php?HWID=" + hwid
    const commonheader = {
        'Referer': 'https://linkvertise.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
    }
    console.log("Starting bypass")
    await req.request(start_url, {
        'Referer': 'https://fluxteam.net/'
    })
    await wait(3)
    await req.request("https://flux.li/windows/start.php?7b20bcc1dfe26db966bb84f159da392f=false&HWID=" + hwid, {
        'Referer': start_url,
        'Cookie': commoncookie
    })
    await wait(1)
    console.log("\n已到达检查点 1")
    await req.request("https://fluxteam.net/windows/checkpoint/check1.php", commonheader)
    console.log("\n已到达检查点 2")
    await req.request("https://fluxteam.net/windows/checkpoint/check2.php", commonheader)
    await wait(1)
    const response = await req.request("https://fluxteam.net/windows/checkpoint/main.php",
        commonheader // "试图绕过Fluxus钥匙系统会让你被禁止使用Fluxus."
    )
    console.log("\n绕过最后一个检查点 & 获取密钥...")
    const parsed = cheerio.load(response['data'])
    const key = parsed("body > main > code:nth-child(5)").text()
    console.log("\n你的秘钥:", key.replace(/\s+/g, '') + '\n')
}

// 我们真的不需要净化数据，这是为了你而不是我
bypass(args[2])
