let { status, activityType } = require("../config");
var admin = require("firebase-admin");

module.exports = async (client) => {
  var db = admin.database();
  var ref = db.ref("status");

  await ref.once(
    "value",
    (data) => {
      if (data.exists && data.hasChild("text") && data.hasChild("activity")) {
        var readStatus = data.val();

        status = readStatus.text;
        activityType = readStatus.activity;
      } else {
        console.log("Status database read failed. Empty database.");
      }
    },
    (errorObject) => {
      console.log("Status database read failed. " + errorObject.code);
    }
  );

  client.user
    .setActivity(status, { type: activityType })
    .then((presence) =>
      console.log(
        `Activity set to "${presence.activities[0].name}", type "${presence.activities[0].type}"`
      )
    )
    .catch(console.error);

  console.log("status: ready");
};
