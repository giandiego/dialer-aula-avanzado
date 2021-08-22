import config from "../config";
import AsteriskManager from "asterisk-manager";

//Conectando a asterisk manager
const AMI = new AsteriskManager(config.amiPort,config.amiHost,config.amiUser,config.amiPass, true);

//Si la conexión falla intentar cada 10seg.
AMI.keepConnected();

//console.log(AMI);

export default AMI;
