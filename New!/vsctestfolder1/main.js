console.log("start");
async function cool() {
    const html = await fetch("https://api.allorigins.win/get?url=https://www.newgrounds.com/audio/listen/1574565",
        {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
            },
            method: "GET"
        }).then(r => r.text()).catch(() => { console.log("err") });


    console.log(html);
}
cool();

