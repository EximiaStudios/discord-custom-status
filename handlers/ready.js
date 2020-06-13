let { status, activityType } = require("../config");

var admin = require('firebase-admin');
var serviceAccount = process.env.FIREBASE_CREDENTIALS || require("../../../core/serviceAccountKey.json");
const setupDatabase = require("../../../core/firebaseDB");;

module.exports = async client => {
    console.log("status: ready");

    setupDatabase(admin, "status-widget");

    var db = admin.database();
    var ref = db.ref("status");

    await ref.once("value", (data) => {
        var readStatus = data.val();

        status = readStatus.text;
        activityType = readStatus.activity;

        console.log(status, activityType);
    }, (errorObject) => {
        console.log("Status database read failed. " + errorObject.code);
    }); // async await

    admin.app().delete();

    client.user.setActivity(status, { type: activityType })
        .then(presence => console.log(`Activity set to "${presence.activities[0].name}", type "${presence.activities[0].type}"`))
        .catch(console.error);
};
