const fetch = require('node-fetch');
url = "http://localhost:3001/api/image";
async function send_requests() {
    for (let i = 0; i < 4; i++) {
        parallelReq = []
        for (let j = 0; j < 2; j++) {
            parallelReq.push(
                fetch(url)
                    .then((data) => {
                        return data.json();
                    })
                    .then((res) => {
                        data = res.data;
                        return data;
                    })
                    .catch((error) => {
                        return error;
                    })
            )
        }
        await Promise.all(parallelReq).then(
            data=>console.log(data)
        );
    }
}
send_requests()