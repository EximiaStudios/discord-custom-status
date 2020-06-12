let { status, activityType } = require("../config");

var admin = require('firebase-admin');
var serviceAccount = process.env.FIREBASE_CREDENTIALS || require("../../../core/serviceAccountKey.json");

module.exports = async client => {
    console.log("status: ready");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_URL || "https://eximiabot-dev.firebaseio.com",
        databaseAuthVariableOverride: {
            uid: "status-widget",
        },
    });

    ref.once("value", (data) => {
        var readStatus = data.val();

        status = readStatus.text;
        activityType = readStatus.activity;
    }, (errorObject) => {
        console.log("Status database read failed. " + errorObject.code);
    });

    client.user.setActivity(status, { type: activityType })
        .then(presence => console.log(`Activity set to "${presence.activities[0].name}", type "${presence.activities[0].type}"`))
        .catch(console.error);
};
