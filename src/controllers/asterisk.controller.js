import AMI from "../libs/ami";

export const OriginateCall = async (req, res) => {

    try {

        const s = req.body,
            i = s.Data;

        //Si queremos validar
        // if (s.Action === 'OriginateCall') {
        //     console.log(i); 
        // } else {
        //     console.log("acción no reconocido"); 
        // }

        const variables = {
            ringtime: i.ringtime,
            CallerID: "999999999",
            "CHANNEL(accountcode)": i.code,
            other: i.other,
            Nombre: i.nombre,
        }

        let DataAMI = {
            Action: "Originate",
            Channel: "Local/" + i.phone + "@DIALER/n",
            Context: "ivr-tts-asr",
            Exten: "s",
            Priority: 1,
            CallerID: i.phone,
            Async: "true",
            Variable: variables,
        }

        console.log(DataAMI);
        // while (10) {
        //     let action = /*await*/ ActionAMI(DataAMI);
        // }

        let action = await ActionAMI(DataAMI);

        res.json({ success: true, message: action });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something goes wrong retriving the OriginateCall",
        });
    }


};

//Llamamos
async function ActionAMI(DataAMI) {
    return new Promise((resolve) => {
        AMI.action(DataAMI, function (err, res) {
            err
                ? (console.log("response error :", err.message), resolve(err.message))
                : resolve(res);
        });
    });
}