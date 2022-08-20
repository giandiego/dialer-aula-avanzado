const AGIServer = require("voxo-agi").AGIServer;
const { Wit, log } = require("node-wit");

const client = new Wit({
  accessToken: "EGOFXRGUVGUC4RMS3MVWF775ZWDCD6FX",
  logger: new log.Logger(log.DEBUG), // optional
});

async function testScript(channel) {
  console.log(
    "Script got call %s -> %s",
    channel.request.callerid,
    channel.request.extension
  );

  let asr = await channel.request.arg_1;
  console.log("asr: ", asr);

  await client
    .message(asr, {})
    .then(async (data) => {
      console.log("data: ", data.intents[0]);

      //validamos que no traiga vació el resultado
      if (!data.intents[0]) {
        let wit = await channel.setVariable("wit", "none");
        return 200;
      }
      //let result = data.intents.find(o => o.confidence > '0.89');

      const result = data.intents.reduce((prev, current) =>
        prev.confidence > current.confidence ? prev : current
      );

      console.log("Result: ", result);

      if (result) {
        //si quieren poner mas código así:
        // if (result.confidence > '0.89') {
        //      let wit = await channel.setVariable('wit',result.name);
        // } else {
        //     let wit = await channel.setVariable('wit','none');
        // }

        let wit =
          result.confidence > "0.89"
            ? await channel.setVariable("wit", result.name)
            : await channel.setVariable("wit", "none");
        //let wit = await channel.setVariable('wit',result.name);
        console.log("Wit: ", wit);
        return 200;
      } else {
        let wit = await channel.setVariable("wit", "error");
        return 200;
      }
    })
    .catch(console.error);
}

/* AGI Server */
console.log("Iniciamos AGIServer...");
var server = new AGIServer(testScript, 4573);
