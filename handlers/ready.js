let { status, activityType } = require("../config");

const Sequelize = require("sequelize");

// const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "../../../../db/status.sqlite"
// });

const sequelize = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    // SQLite only
    storage: "db/status.sqlite",
});

const StatusDB = sequelize.define("status", {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    text: Sequelize.STRING,
    activity: Sequelize.STRING
});

module.exports = async client => {
    console.log("status: ready");

    StatusDB.sync();

    const statusFromDB = await StatusDB.findOne({ where: {name: "status"} });

    if (statusFromDB) {
        status = statusFromDB.get("text");
        activityType = statusFromDB.get("activity");
    }
    
    client.user.setActivity(status, { type: activityType })
        .then(presence => console.log(`Activity set to "${presence.activities[0].name}", type "${presence.activities[0].type}"`))
        .catch(console.error);
};
