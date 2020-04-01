const mergeImg = require("merge-img");
const sharp = require('sharp');
const moment = require("moment");
var jimp = require("jimp");
const i18n = require("i18n");
const LOCALE_DIR = __dirname + "/locales";
const GREEN = 52224;
const RED = 13369344;
const BATTLE = 16752981;
const RANKING_LINE_LENGTH = 23;

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

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

waitforsheet(event)
 return {    

    embed: {
      color: good ? GREEN : RED,
      title,
      url: `https://albiononline.com/en/killboard/kill/${event.EventId}`,
      description,
      files: [{
    attachment: 'result/final'+event.EventId+'.png',
    name:'finished.png'
  }],
      image: {
      url: "attachment://finished.png"},
    }
  };
};

exports.embedInventory = (event, locale) => {
  const l = setLocale(locale);
  const good = event.good;
  const title = l.__("KILL.EVENT", {
    killer: event.Killer.Name,
    victim: event.Victim.Name
  });
inventorybuild(event);
 return {    

    embed: {
      color: good ? GREEN : RED,
      title,
      url: `https://albiononline.com/en/killboard/kill/${event.EventId}`,
      description: event.Victim.Name+' Inventory',
      files: [{
    attachment: 'result/inventoryf'+event.EventId+'.png',
    name:'finished.png'
  }],
      image: {
      url: "attachment://finished.png"},
    }
  };
};

async function makesheet(event, guild, locale){
    return new Promise(resolve=>{
     
if (event.Killer.Equipment.Bag){
var KBag=event.Killer.Equipment.Bag.Type;
}

if (event.Killer.Equipment.Head){
var KHead=event.Killer.Equipment.Head.Type;
}

if (event.Killer.Equipment.Cape){
var KCape=event.Killer.Equipment.Cape.Type;
}

if (event.Killer.Equipment.MainHand){
var KMainHand=event.Killer.Equipment.MainHand.Type;
}

if (event.Killer.Equipment.Armor){
var KArmor=event.Killer.Equipment.Armor.Type;
}

if (event.Killer.Equipment.OffHand){
var KOffhand=event.Killer.Equipment.OffHand.Type;
}

if (event.Killer.Equipment.Food){
var KFood=event.Killer.Equipment.Food.Type;
}

if (event.Killer.Equipment.Shoes){
var KShoes=event.Killer.Equipment.Shoes.Type;
}

if (event.Killer.Equipment.Potion){
var KPotion=event.Killer.Equipment.Potion.Type;
}

if (event.Killer.Equipment.Mount){
var KMount=event.Killer.Equipment.Mount.Type;
}    

if (event.Victim.Equipment.Bag){
var VBag=event.Victim.Equipment.Bag.Type;
}

if (event.Victim.Equipment.Head){
var VHead=event.Victim.Equipment.Head.Type;
}

if (event.Victim.Equipment.Cape){
var VCape=event.Victim.Equipment.Cape.Type;
}

if (event.Victim.Equipment.MainHand){
var VMainHand=event.Victim.Equipment.MainHand.Type;
}

if (event.Victim.Equipment.Armor){
var VArmor=event.Victim.Equipment.Armor.Type;
}

if (event.Victim.Equipment.OffHand){
var VOffhand=event.Victim.Equipment.OffHand.Type;
}

if (event.Victim.Equipment.Food){
var VFood=event.Victim.Equipment.Food.Type;
}

if (event.Victim.Equipment.Shoes){
var VShoes=event.Victim.Equipment.Shoes.Type;
}

if (event.Victim.Equipment.Potion){
var VPotion=event.Victim.Equipment.Potion.Type;
}

if (event.Victim.Equipment.Mount){
var VMount=event.Victim.Equipment.Mount.Type;
}   

mergeImg(['images/'+VBag+'.png', 'images/'+VHead+'.png', 'images/'+VCape+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/vtop'+event.EventId+'.png', () => console.log('vtop'+event.EventId));   
  });
  
mergeImg(['images/'+VMainHand+'.png', 'images/'+VArmor+'.png', 'images/'+VOffhand+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/vmiddle'+event.EventId+'.png', () => console.log('vmiddle'+event.EventId)); 
  });  
   
mergeImg(['images/'+VFood+'.png', 'images/'+VShoes+'.png', 'images/'+VPotion+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/vbottom'+event.EventId+'.png', () => console.log('vbottom'+event.EventId)); 
  });   
  
mergeImg(['images/undefined.png', 'images/'+VMount+'.png', 'images/undefined.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/vmount1'+event.EventId+'.png', () => console.log('vmount1'+event.EventId)); 
  });
  
mergeImg(['images/'+KBag+'.png', 'images/'+KHead+'.png', 'images/'+KCape+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/ktop'+event.EventId+'.png', () => console.log('ktop'+event.EventId));
  });
  
mergeImg(['images/'+KMainHand+'.png', 'images/'+KArmor+'.png', 'images/'+KOffhand+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/kmiddle'+event.EventId+'.png', () => console.log('Killer Middle'+event.EventId));
  });  
   
mergeImg(['images/'+KFood+'.png', 'images/'+KShoes+'.png', 'images/'+KPotion+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/kbottom'+event.EventId+'.png', () => console.log('Kbottom'+event.EventId));
  });   
  
mergeImg(['images/undefined.png', 'images/'+KMount+'.png', 'images/undefined.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/kmount1'+event.EventId+'.png', () => console.log('Kmount1'+event.EventId));
  }); 
  setTimeout(() => resolve(1), 4000);
    });
}  
 
async function mergesheet(event, guild, locale){
    return new Promise(resolve=>{
mergeImg(['result/ktop'+event.EventId+'.png', 'result/kmiddle'+event.EventId+'.png', 'result/kbottom'+event.EventId+'.png', 'result/kmount1'+event.EventId+'.png'], {direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/k'+event.EventId+'.png', () => console.log('k'+event.EventId));  
  }); 

mergeImg(['result/vtop'+event.EventId+'.png', 'result/vmiddle'+event.EventId+'.png', 'result/vbottom'+event.EventId+'.png', 'result/vmount1'+event.EventId+'.png'], {direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/v'+event.EventId+'.png', () => console.log('v'+event.EventId)); 
});
  setTimeout(() => resolve(1), 2000);
    });
}

async function mergebg(event, guild, locale){
        return new Promise(resolve=>{
 sharp( 'images/background2.png')
    .composite([{ input: 'result/v'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/vfinished'+event.EventId+'.png',() =>console.log('vfinished'+event.EventId+'.png')  );


sharp( 'images/background2.png')
    .composite([{ input: 'result/k'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/kfinished'+event.EventId+'.png',() =>console.log('kfinished'+event.EventId+'.png')  );
   setTimeout(() => resolve(1), 2000);
    });   
}

async function mergetops(event, guild, locale){
        return new Promise(resolve=> {    
 mergeImg(['images/top.png', 'result/kfinished'+event.EventId+'.png'], {direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/k'+event.EventId+'.png', () => console.log('k'+event.EventId));  
  }); 

mergeImg(['images/top.png', 'result/vfinished'+event.EventId+'.png'], {direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/v'+event.EventId+'.png', () => console.log('k'+event.EventId)); 
}); 
setTimeout(() => resolve(1), 2000);
    });
}

async function mergevandk(event, guild, locale){
     return new Promise(resolve=>{
mergeImg(['result/finalk'+event.EventId+'.png', 'result/finalv'+event.EventId+'.png'],{offset : 150}  )
  .then((img) => {
    // Save image as file
    img.write('result/final'+event.EventId+'.png', () => console.log('final'+event.EventId));  
});
 setTimeout(() => resolve(1), 2000);
    });
}

async function addtext1(event, guild, locale){
var maxWidth=651;
var maxHeight=200;
var killerGuildValue;
 if (event.Killer.GuildName) {
    killerGuildValue = event.Killer.AllianceName
      ? `[${event.Killer.AllianceName}] `
      : "";
    killerGuildValue += event.Killer.GuildName;
  }

  if (event.Victim.GuildName) {
    victimGuildValue = event.Victim.AllianceName
      ? `[${event.Victim.AllianceName}] `
      : "";
    victimGuildValue += event.Victim.GuildName;
  }

const image= await jimp.read('result/k'+event.EventId+'.png');
const font = await jimp.loadFont('font/green_32.fnt');
        image.print(font, 20, 5, {text: 'Killer', alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
}, maxWidth, maxHeight);
const font1 = await jimp.loadFont('font/green_64.fnt');
        image.print(font1, 20, 38, {text: event.Killer.Name, alignmentX:  jimp.HORIZONTAL_ALIGN_CENTER
}, maxWidth, maxHeight);
        image.print(font, 20, 108, {text: 'Guild: '+killerGuildValue, alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
}, maxWidth, maxHeight);
        image.print(font1, 20, 141, {text: 'Average IP: '+Math.round(event.Killer.AverageItemPower), alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
}, maxWidth, maxHeight);
                   await image.writeAsync('result/finalk'+event.EventId+'.png');


}

async function addtext2(event, guild, locale){
var maxWidth=651;
var maxHeight=200;
var victimGuildValue;
const font2 = await jimp.loadFont('font/red_32.fnt');
const font3 = await jimp.loadFont('font/red_64.fnt');
  if (event.Victim.GuildName) {
    victimGuildValue = event.Victim.AllianceName
      ? `[${event.Victim.AllianceName}] `
      : "";
    victimGuildValue += event.Victim.GuildName;
  }
const image= await jimp.read('result/v'+event.EventId+'.png')
const font = await jimp.loadFont('font/red_64.fnt');
        image.print(font2, 20, 10, {text: 'Victim', alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
}, maxWidth, maxHeight);
        image.print(font3, 20, 38, {text: event.Victim.Name, alignmentX:  jimp.HORIZONTAL_ALIGN_CENTER
}, maxWidth, maxHeight);
        image.print(font2, 20, 108, {text: 'Guild: '+victimGuildValue, alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
}, maxWidth, maxHeight);
        image.print(font, 20, 141, {text: 'Average IP: '+Math.round(event.Victim.AverageItemPower), alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
}, maxWidth, maxHeight);
  await image.writeAsync('result/finalv'+event.EventId+'.png');
}

async function waitforsheet(event, locale,guild) {
  const result1 = await makesheet(event, locale);
  const result2 = await mergesheet(event, locale);
  const result3 = await mergebg(event, locale);
  const result4 = await mergetops(event,locale);
  const result5 = await addtext1(event, locale);
  const result6 = await addtext2(event, locale);
  const result7 = await mergevandk(event, locale);
}

async function inventorybuild(event, guild, locale){
await inventory(event, locale);
await inventorybgmerge(event, locale);
await inventorymerge(event, locale);
}

async function inventory(event, guild, locale){
    return new Promise(resolve=> {    
let victimloot;
var loot;
if (event.Victim.Inventory){
victimloot=event.Victim.Inventory;
for(i=0; i<48; i++){
    if (victimloot[i]!=null){
    }
    else{
       break;
    }
}
for(a=0; a<48; a++){
    if (victimloot[a]!=null){
    }
    else{
       victimloot[a]='empty';
    }
loot+='slot'+a+': '+victimloot[a].Type+', ';
}
}

if (i<8){
mergeImg(['images/'+victimloot[0].Type+'.png', 'images/'+victimloot[1].Type+'.png', 'images/'+victimloot[2].Type+'.png', 'images/'+victimloot[3].Type+'.png', 'images/'+victimloot[4].Type+'.png', 'images/'+victimloot[5].Type+'.png', 'images/'+victimloot[6].Type+'.png', 'images/'+victimloot[7].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory1'+event.EventId+'.png', () => console.log('created inventory1'+event.EventId));   
  }); 
} 
  
if ((i >=8) && (i<16)){
    mergeImg(['images/'+victimloot[0].Type+'.png', 'images/'+victimloot[1].Type+'.png', 'images/'+victimloot[2].Type+'.png', 'images/'+victimloot[3].Type+'.png', 'images/'+victimloot[4].Type+'.png', 'images/'+victimloot[5].Type+'.png', 'images/'+victimloot[6].Type+'.png', 'images/'+victimloot[7].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory1'+event.EventId+'.png', () => console.log('created inventory1 '+event.EventId));   
  });
mergeImg(['images/'+victimloot[8].Type+'.png', 'images/'+victimloot[9].Type+'.png', 'images/'+victimloot[10].Type+'.png', 'images/'+victimloot[11].Type+'.png', 'images/'+victimloot[12].Type+'.png', 'images/'+victimloot[13].Type+'.png', 'images/'+victimloot[14].Type+'.png', 'images/'+victimloot[15].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory2'+event.EventId+'.png', () => console.log('created inventory2 '+event.EventId));   
  });
}

if ((i >=16) && (i<24)){
    mergeImg(['images/'+victimloot[0].Type+'.png', 'images/'+victimloot[1].Type+'.png', 'images/'+victimloot[2].Type+'.png', 'images/'+victimloot[3].Type+'.png', 'images/'+victimloot[4].Type+'.png', 'images/'+victimloot[5].Type+'.png', 'images/'+victimloot[6].Type+'.png', 'images/'+victimloot[7].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory1'+event.EventId+'.png', () => console.log('created inventory1'+event.EventId));   
  });
mergeImg(['images/'+victimloot[8].Type+'.png', 'images/'+victimloot[9].Type+'.png', 'images/'+victimloot[10].Type+'.png', 'images/'+victimloot[11].Type+'.png', 'images/'+victimloot[12].Type+'.png', 'images/'+victimloot[13].Type+'.png', 'images/'+victimloot[14].Type+'.png', 'images/'+victimloot[15].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory2'+event.EventId+'.png', () => console.log('created inventory2 '+event.EventId));   
  });
mergeImg(['images/'+victimloot[16].Type+'.png', 'images/'+victimloot[17].Type+'.png', 'images/'+victimloot[18].Type+'.png', 'images/'+victimloot[19].Type+'.png', 'images/'+victimloot[20].Type+'.png', 'images/'+victimloot[21].Type+'.png', 'images/'+victimloot[22].Type+'.png', 'images/'+victimloot[23].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory3'+event.EventId+'.png', () => console.log('created inventory3'+event.EventId));   
  });  
mergeImg(['images/'+victimloot[24].Type+'.png', 'images/'+victimloot[25].Type+'.png', 'images/'+victimloot[26].Type+'.png', 'images/'+victimloot[27].Type+'.png', 'images/'+victimloot[28].Type+'.png', 'images/'+victimloot[29].Type+'.png', 'images/'+victimloot[30].Type+'.png', 'images/'+victimloot[31].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory4'+event.EventId+'.png', () => console.log('created inventory4'+event.EventId));   
  });
}

if ((i >=32) && (i<40)){
     mergeImg(['images/'+victimloot[0].Type+'.png', 'images/'+victimloot[1].Type+'.png', 'images/'+victimloot[2].Type+'.png', 'images/'+victimloot[3].Type+'.png', 'images/'+victimloot[4].Type+'.png', 'images/'+victimloot[5].Type+'.png', 'images/'+victimloot[6].Type+'.png', 'images/'+victimloot[7].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory1'+event.EventId+'.png', () => console.log('created inventory1'+event.EventId));   
  });
mergeImg(['images/'+victimloot[8].Type+'.png', 'images/'+victimloot[9].Type+'.png', 'images/'+victimloot[10].Type+'.png', 'images/'+victimloot[11].Type+'.png', 'images/'+victimloot[12].Type+'.png', 'images/'+victimloot[13].Type+'.png', 'images/'+victimloot[14].Type+'.png', 'images/'+victimloot[15].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory2'+event.EventId+'.png', () => console.log('created inventory2'+event.EventId));   
  });
mergeImg(['images/'+victimloot[16].Type+'.png', 'images/'+victimloot[17].Type+'.png', 'images/'+victimloot[18].Type+'.png', 'images/'+victimloot[19].Type+'.png', 'images/'+victimloot[20].Type+'.png', 'images/'+victimloot[21].Type+'.png', 'images/'+victimloot[22].Type+'.png', 'images/'+victimloot[23].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory3'+event.EventId+'.png', () => console.log('created inventory3'+event.EventId));   
  });  
mergeImg(['images/'+victimloot[24].Type+'.png', 'images/'+victimloot[25].Type+'.png', 'images/'+victimloot[26].Type+'.png', 'images/'+victimloot[27].Type+'.png', 'images/'+victimloot[28].Type+'.png', 'images/'+victimloot[29].Type+'.png', 'images/'+victimloot[30].Type+'.png', 'images/'+victimloot[31].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory4'+event.EventId+'.png', () => console.log('created inventory4'+event.EventId));   
  });
mergeImg(['images/'+victimloot[32].Type+'.png', 'images/'+victimloot[33].Type+'.png', 'images/'+victimloot[34].Type+'.png', 'images/'+victimloot[35].Type+'.png', 'images/'+victimloot[36].Type+'.png', 'images/'+victimloot[37].Type+'.png', 'images/'+victimloot[38].Type+'.png', 'images/'+victimloot[39].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory5'+event.EventId+'.png', () => console.log('created inventory5'+event.EventId));   
  });
}

if ((i >=40) && (i<48)){
   mergeImg(['images/'+victimloot[0].Type+'.png', 'images/'+victimloot[1].Type+'.png', 'images/'+victimloot[2].Type+'.png', 'images/'+victimloot[3].Type+'.png', 'images/'+victimloot[4].Type+'.png', 'images/'+victimloot[5].Type+'.png', 'images/'+victimloot[6].Type+'.png', 'images/'+victimloot[7].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory1'+event.EventId+'.png', () => console.log('created inventory1'+event.EventId));   
  });
mergeImg(['images/'+victimloot[8].Type+'.png', 'images/'+victimloot[9].Type+'.png', 'images/'+victimloot[10].Type+'.png', 'images/'+victimloot[11].Type+'.png', 'images/'+victimloot[12].Type+'.png', 'images/'+victimloot[13].Type+'.png', 'images/'+victimloot[14].Type+'.png', 'images/'+victimloot[15].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory2'+event.EventId+'.png', () => console.log('created inventory2'+event.EventId));   
  });
mergeImg(['images/'+victimloot[16].Type+'.png', 'images/'+victimloot[17].Type+'.png', 'images/'+victimloot[18].Type+'.png', 'images/'+victimloot[19].Type+'.png', 'images/'+victimloot[20].Type+'.png', 'images/'+victimloot[21].Type+'.png', 'images/'+victimloot[22].Type+'.png', 'images/'+victimloot[23].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory3'+event.EventId+'.png', () => console.log('created inventory3'+event.EventId));   
  });  
mergeImg(['images/'+victimloot[24].Type+'.png', 'images/'+victimloot[25].Type+'.png', 'images/'+victimloot[26].Type+'.png', 'images/'+victimloot[27].Type+'.png', 'images/'+victimloot[28].Type+'.png', 'images/'+victimloot[29].Type+'.png', 'images/'+victimloot[30].Type+'.png', 'images/'+victimloot[31].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory4'+event.EventId+'.png', () => console.log('created inventory4'+event.EventId));   
  });
mergeImg(['images/'+victimloot[32].Type+'.png', 'images/'+victimloot[33].Type+'.png', 'images/'+victimloot[34].Type+'.png', 'images/'+victimloot[35].Type+'.png', 'images/'+victimloot[36].Type+'.png', 'images/'+victimloot[37].Type+'.png', 'images/'+victimloot[38].Type+'.png', 'images/'+victimloot[39].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory5'+event.EventId+'.png', () => console.log('created inventory5'+event.EventId));   
  });
mergeImg(['images/'+victimloot[40].Type+'.png', 'images/'+victimloot[41].Type+'.png', 'images/'+victimloot[42].Type+'.png', 'images/'+victimloot[43].Type+'.png', 'images/'+victimloot[44].Type+'.png', 'images/'+victimloot[45].Type+'.png', 'images/'+victimloot[46].Type+'.png', 'images/'+victimloot[47].Type+'.png'] )
  .then((img) => {
    // Save image as file
    img.write('result/inventory6'+event.EventId+'.png', () => console.log('created inventory6'+event.EventId));   
  });
} 
 setTimeout(() => resolve(1), 4000);
    });  
 }

async function inventorybgmerge(event, guild, locale){
       return new Promise(resolve=> {   
if (i<8){       
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory1'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory1m'+event.EventId+'.png',() =>console.log('created inventory1m'+event.EventId+'.png')  );  
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory1'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventoryf'+event.EventId+'.png',() =>console.log('created inventory1m'+event.EventId+'.png')  );  
}

if ((i >=8) && (i<16)){
     sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory1'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory1m'+event.EventId+'.png',() =>console.log('created inventory1m'+event.EventId+'.png')  );
    sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory2'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory2m'+event.EventId+'.png',() =>console.log('created inventory2m'+event.EventId+'.png')  );
}

if ((i >=16) && (i<24)){
     sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory1'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory1m'+event.EventId+'.png',() =>console.log('created inventory1m'+event.EventId+'.png')  );
    sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory2'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory2m'+event.EventId+'.png',() =>console.log('created inventory2m'+event.EventId+'.png')  );
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory3'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory3m'+event.EventId+'.png',() =>console.log('created inventory3m'+event.EventId+'.png')  );
}

if ((i >=24) && (i<32)){
   sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory1'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory1m'+event.EventId+'.png',() =>console.log('created inventory1m'+event.EventId+'.png')  );
  
  sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory2'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory2m'+event.EventId+'.png',() =>console.log('created inventory2m'+event.EventId+'.png')  );
   
   sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory3'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory3m'+event.EventId+'.png',() =>console.log('created inventory3m'+event.EventId+'.png')  );
   sharp( 'images/inventorybg.png')
   
  .composite([{ input: 'result/inventory4'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory4m'+event.EventId+'.png',() =>console.log('created inventory4m'+event.EventId+'.png')  );
}

if ((i >=32) && (i<40)){
     sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory1'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory1m'+event.EventId+'.png',() =>console.log('created inventory1m'+event.EventId+'.png')  );
    sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory2'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory2m'+event.EventId+'.png',() =>console.log('created inventory2m'+event.EventId+'.png')  );
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory3'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory3m'+event.EventId+'.png',() =>console.log('created inventory3m'+event.EventId+'.png')  );
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory4'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory4m'+event.EventId+'.png',() =>console.log('created inventory4m'+event.EventId+'.png')  );
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory5'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory5m'+event.EventId+'.png',() =>console.log('created inventory5m'+event.EventId+'.png')  );  
 } 
 
if ((i >=40) && (i<48)){ 
     sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory1'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory1m'+event.EventId+'.png',() =>console.log('created inventory1m'+event.EventId+'.png')  );
    sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory2'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory2m'+event.EventId+'.png',() =>console.log('created inventory2m'+event.EventId+'.png')  );
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory3'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory3m'+event.EventId+'.png',() =>console.log('created inventory3m'+event.EventId+'.png')  );
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory4'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory4m'+event.EventId+'.png',() =>console.log('created inventory4m'+event.EventId+'.png')  );
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory5'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory5m'+event.EventId+'.png',() =>console.log('created inventory5m'+event.EventId+'.png')  );  
 
 sharp( 'images/inventorybg.png')
    .composite([{ input: 'result/inventory6'+event.EventId+'.png', gravity: 'southeast' }])
    .toFile('result/inventory6m'+event.EventId+'.png',() =>console.log('created inventory6m'+event.EventId+'.png')  ); 
}
setTimeout(() => resolve(1), 2000);
    });  
}

async function inventorymerge(event, guild, locale){
 return new Promise(resolve=> { 
console.log(i);

if ((i >=8) && (i<16)){
mergeImg(['result/inventory1m'+event.EventId+'.png','result/inventory2m'+event.EventId+'.png'],{direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/inventoryf'+event.EventId+'.png', () => console.log('created inventoryf'+event.EventId));   
  });  
}

if ((i >=16) && (i<24)){
    
 mergeImg(['result/inventory1m'+event.EventId+'.png','result/inventory2m'+event.EventId+'.png','result/inventory3m'+event.EventId+'.png'],{direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/inventoryf'+event.EventId+'.png', () => console.log('created inventoryf'+event.EventId));   
  });    
}

if ((i >=24) && (i<32)){
 mergeImg(['result/inventory1m'+event.EventId+'.png','result/inventory2m'+event.EventId+'.png','result/inventory3m'+event.EventId+'.png'],{direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/inventoryf'+event.EventId+'.png', () => console.log('created inventoryf'+event.EventId));   
  });   
}

if ((i >=32) && (i<40)){
    
 mergeImg(['result/inventory1m'+event.EventId+'.png','result/inventory2m'+event.EventId+'.png','result/inventory3m'+event.EventId+'.png','result/inventory4m'+event.EventId+'.png','result/inventory5m'+event.EventId+'.png'],{direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/inventoryf'+event.EventId+'.png', () => console.log('created inventoryf'+event.EventId));   
  });   
}

if ((i >=40) && (i<48)){
 mergeImg(['result/inventory1m'+event.EventId+'.png','result/inventory2m'+event.EventId+'.png','result/inventory3m'+event.EventId+'.png','result/inventory4m'+event.EventId+'.png','result/inventory5f'+event.EventId+'.png','result/inventory6m'+event.EventId+'.png'],{direction : true} )
  .then((img) => {
    // Save image as file
    img.write('result/inventoryf'+event.EventId+'.png', () => console.log('created inventoryf'+event.EventId));   
  });    
}
setTimeout(() => resolve(1), 5000);
    });     
} 

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
