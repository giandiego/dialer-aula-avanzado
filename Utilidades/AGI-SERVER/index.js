const AGIServer = require('voxo-agi').AGIServer;
const {Wit, log} = require('node-wit');

const client = new Wit({
    accessToken: 'A6C7R2FTXPCDUMVSTRDS3ELERPI2UIC2',
    logger: new log.Logger(log.DEBUG) // optional
});

async function testScript(channel) {
    console.log('Script got call %s -> %s', channel.request.callerid, channel.request.extension);

    let asr = await channel.request.arg_1;
    console.log('asr: ',asr);

    await client.message(asr, {})
    .then(async (data) => {
        
        //console.log('data: ',data);

        //let result = data.intents.find(o => o.confidence > '0.89');

        const result = data.intents.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current)

        console.log(result);

        if (result) {
            let wit = await channel.setVariable('wit',result.name);
            console.log(wit);
            return 200;
        }else{
            let wit = await channel.setVariable('wit','error');
            return 200;
        }
        

    })
    .catch(console.error);



}
 
/* AGI Server */
console.log('Iniciamos AGIServer...');
var server = new AGIServer(testScript, 4573);