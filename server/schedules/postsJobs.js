const cron = require('node-cron');
const { initRanking } = require("../controllers/util/rankingFunction")
const { updateWeeklyRankAchievements } = require("../controllers/achievementsController");

cron.schedule("0 0 * * *", () => initRanking("daily"));
cron.schedule("5 0 * * *", () => initRanking("weekly"));
cron.schedule("15 0 * * 1", () => updateWeeklyRankAchievements());
cron.schedule("20 0 * * *", () => initRanking("monthly"));
cron.schedule("30 0 * * *", () => initRanking("yearly"));