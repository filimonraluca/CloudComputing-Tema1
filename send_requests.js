const fetch = require('node-fetch');
url = "http://localhost:3001/api/image";
async function send_requests() {
    parallelReq = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            parallelReq.push(
                fetch(url)
                    .then((data) => {
                        return data.json();
                    })
                    .then((res) => {
                        console.log(res)
                        data = res.data;
                        console.log(data);
                        return data;
                    })
                    .catch((error) => {
                        return error;
                        console.log(error);
                    })
            )
        }
        await Promise.all(parallelReq).then(
            data=>console.log(data)
        );
        parallelReq.splice(0, parallelReq.length);
    }
}
send_requests()