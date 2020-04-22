const { status, activityType } = require("../config");

module.exports = async client => {
    console.log("status: ready");

    client.user.setActivity(status, { type: activityType })
        .then(presence => console.log(`Activity set to "${presence.activities[0].name}", type "${presence.activities[0].type}"`))
        .catch(console.error);
};
