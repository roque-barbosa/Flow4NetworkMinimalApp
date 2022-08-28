/* eslint-disable */
var rn_bridge = require('rn-bridge');


rn_bridge.channel.on('message', async (url) => {
    

    try {
        const FastSpeedtest = require("fast-speedtest-api");
        let speedtest = new FastSpeedtest({
            token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
            verbose: false, // default: false
            timeout: 10000, // default: 5000
            https: true, // default: true
            urlCount: 5, // default: 5
            bufferSize: 8, // default: 8
            unit: FastSpeedtest.UNITS.Mbps // default: Bps
        });
        speedtest.getSpeed().then(s => {
            rn_bridge.channel.send(`${s}`);
        }).catch(e => {
            rn_bridge.channel.send(e.message);
        });
        // rn_bridge.channel.send(`oi`);
    } catch (error) {
        rn_bridge.channel.send(`deu erro: ${error}`);
    }
});
