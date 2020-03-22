const moment = require("moment");
const i18n = require("i18n");

const LOCALE_DIR = __dirname + "/locales";
const GREEN = 52224;
const RED = 13369344;
const BATTLE = 16752981;
const RANKING_LINE_LENGTH = 23;

// TODO: Move to utils file
function nFormatter(num, digits) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "b" },
    { value: 1e12, symbol: "t" },
    { value: 1e15, symbol: "q" },
    { value: 1e18, symbol: "Q" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

function dFormatter(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0;
}

function rFormatter(str){
 return str;
}
    

function setLocale(locale = "en") {
  const l = {};
  i18n.configure({
    directory: LOCALE_DIR,
    objectNotation: true,
    defaultLocale: "en",
    register: l
  });
  l.setLocale(locale);
  return l;
}

exports.getI18n = guild => setLocale(guild.config.lang);

exports.embedEvent = (event, locale) => {
  const l = setLocale(locale);
  const good = event.good;
  const title = l.__("KILL.EVENT", {
    killer: event.Killer.Name,
    victim: event.Victim.Name
  });

  let description;
  if (event.numberOfParticipants === 1) {
    description = l.__(`KILL.SOLO_${Math.floor(Math.random() * 6)}`);
  } else {
    const totalDamage = event.Participants.reduce((sum, participant) => {
      return sum + participant.DamageDone;
    }, 0);
    const assist = [];
    event.Participants.forEach(participant => {
      // Self-damage isn't assist :P
      if (participant.Name === event.Victim.Name) {
        return;
      }
      const damagePercent = Math.round(
        (participant.DamageDone / totalDamage) * 100
      );
      assist.push(`${participant.Name} (${damagePercent}%)`);
    });

    if (assist.length > 0) {
      description = l.__("KILL.ASSIST", { assists: assist.join(" / ") });
    }
  }

  let killerGuildValue;
  if (event.Killer.GuildName) {
    killerGuildValue = event.Killer.AllianceName
      ? `[${event.Killer.AllianceName}] `
      : "";
    killerGuildValue += event.Killer.GuildName;
  }

  let victimGuildValue;
  if (event.Victim.GuildName) {
    victimGuildValue = event.Victim.AllianceName
      ? `[${event.Victim.AllianceName}] `
      : "";
    victimGuildValue += event.Victim.GuildName;
  }

let victimloot;
if (event.Victim.Inventory){
    var loot='';
victimloot=event.Victim.Inventory
for(i=0; i<48; i++){
    if (victimloot[i]!=null){
         loot+=victimloot[i].Type+', ';
    }     
    if (loot.length==0)
    loot="no inventory"
}
}

  return {
    embed: {
      color: good ? GREEN : RED,
      title,
      url: `https://albiononline.com/pt/killboard/kill/${event.EventId}`,
      description,
      thumbnail: {
        url:
          "https://user-images.githubusercontent.com/13356774/76129825-ee15b580-5fde-11ea-9f77-7ae16bd65368.png"
      },
      fields: [
        {
          name: l.__("KILL.FAME"),
          value: dFormatter(event.TotalVictimKillFame),
          inline: false
        },
        {
          name: l.__("KILL.KILLER_GUILD"),
          value: killerGuildValue || l.__("KILL.NO_GUILD"),
          inline: true
        },
        {
          name: l.__("KILL.VICTIM_GUILD"),
          value: victimGuildValue || l.__("KILL.NO_GUILD"),
          inline: true
        },
        {
          name: "\u200B",
          value: "\u200B",
          inline: true
        },
        {
          name: l.__("KILL.KILLER_IP"),
          value: Math.round(event.Killer.AverageItemPower),
          inline: true
        },
        {
          name: l.__("KILL.VICTIM_IP"),
          value: Math.round(event.Victim.AverageItemPower),
          inline: true
        },
        {
          name: "\u200B",
          value: "\u200B",
          inline: true
        },
        {
          name: "Victim Loot",
          value:  loot,
          inline:true 
        }
      ]
    }
  };
};

exports.embedBattle = (battle, locale) => {
  const l = setLocale(locale);

  const guildCount = Object.keys(battle.guilds || {}).length;

  const duration = moment
    .duration(moment(battle.endTime) - moment(battle.startTime))
    .locale(locale || "en")
    .humanize();
  const description = l.__("BATTLE.DESCRIPTION", {
    players: Object.keys(battle.players || {}).length,
    kills: battle.totalKills,
    fame: dFormatter(battle.totalFame),
    duration
  });

  const line = item => {
    return l.__("BATTLE.LINE", {
      name: item.name,
      kills: item.kills,
      deaths: item.deaths,
      fame: dFormatter(item.killFame)
    });
  };

  const fields = [];
  Object.keys(battle.alliances).forEach(id => {
    const alliance = battle.alliances[id];
    const name = line(alliance);

    let value = "";
    Object.values(battle.guilds)
      .filter(guild => guild.allianceId === id)
      .forEach(guild => {
        value += line(guild);
        value += "\n";
      });

    fields.push({
      name,
      value
    });
  });

  const guildsWithoutAlliance = Object.values(battle.guilds).filter(
    guild => !guild.allianceId
  );
  const playersWithoutGuild = Object.values(battle.players).filter(
    player => !player.guildId
  );
  if (guildsWithoutAlliance.length > 0 || playersWithoutGuild.length > 0) {
    const name = l.__("BATTLE.NO_ALLIANCE");

    let value = "";
    guildsWithoutAlliance.forEach(guild => {
      value += line(guild);
      value += "\n";
    });

    if (playersWithoutGuild.length > 0) {
      const stats = {
        name: l.__("BATTLE.NO_GUILD"),
        kills: 0,
        deaths: 0,
        killFame: 0
      };
      playersWithoutGuild.forEach(player => {
        stats.kills += player.kills;
        stats.deaths += player.deaths;
        stats.killFame += player.killFame;
      });
      value += line(stats);
      value += "\n";
    }

    fields.push({
      name,
      value
    });
  }

  return {
    embed: {
      color: BATTLE,
      title: l.__("BATTLE.EVENT", { guilds: guildCount }),
      url: `http://www.yaga.sk/killboard/battle.php?id=${battle.id}`,
      description,
      thumbnail: {
        url:
          "https://user-images.githubusercontent.com/13356774/76130049-b9eec480-5fdf-11ea-95c0-7de130a705a3.png"
      },
      fields
    }
  };
};

exports.embedRankings = (trackedGuild, rankings, locale) => {
  const l = setLocale(locale);

  const guildId = trackedGuild.id;
  const guildName = trackedGuild.name;

  const generateRankFieldValue = (ranking, pvp = false) => {
    let value = "```c";
    ranking.forEach(item => {
      if (pvp) {
        const fameValue = nFormatter(item.KillFame, 2);
        value += `\n${item.Name}${" ".repeat(
          RANKING_LINE_LENGTH - fameValue.length - item.Name.length
        )}${fameValue}`;
      } else {
        const fameValue = nFormatter(item.Fame, 2);
        value += `\n${item.Player.Name}${" ".repeat(
          RANKING_LINE_LENGTH - fameValue.length - item.Player.Name.length
        )}${fameValue}`;
      }
    });
    value += "```";
    return value;
  };

  return {
    embed: {
      title: l.__("RANKING.MONTHLY", { guild: guildName }),
      url: `https://albiononline.com/pt/killboard/guild/${guildId}`,
      thumbnail: {
        url:
          "https://user-images.githubusercontent.com/13356774/76129834-f53cc380-5fde-11ea-8c88-daa9872c2d72.png"
      },
      fields: [
        {
          name: l.__("RANKING.PVE"),
          value: generateRankFieldValue(rankings.pve),
          inline: true
        },
        {
          name: l.__("RANKING.PVP"),
          value: generateRankFieldValue(rankings.pvp, true),
          inline: true
        },
        {
          name: "\u200B",
          value: "\u200B",
          inline: false
        },
        {
          name: l.__("RANKING.GATHERING"),
          value: generateRankFieldValue(rankings.gathering),
          inline: true
        },
        {
          name: l.__("RANKING.CRAFTING"),
          value: generateRankFieldValue(rankings.crafting),
          inline: true
        }
      ],
      timestamp: moment().toISOString()
    }
  };
};

exports.embedList = config => {
  const l = setLocale(config.lang);

  const configToList = list => {
    if (!list || list.length === 0) return l.__("TRACK.NONE");
    return list.map(item => item.name).join("\n");
  };

  return {
    embed: {
      description: l.__("TRACK.LIST"),
      fields: [
        {
          name: l.__("TRACK.PLAYERS"),
          value: configToList(config.trackedPlayers),
          inline: true
        },
        {
          name: l.__("TRACK.GUILDS"),
          value: configToList(config.trackedGuilds),
          inline: true
        },
        {
          name: l.__("TRACK.ALLIANCES"),
          value: configToList(config.trackedAlliances),
          inline: true
        }
      ]
    }
  };
};
