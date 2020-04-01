images folder is uploaded to google drive it is around 500mb and may be missing images they are printed in the console.
https://drive.google.com/open?id=1xjkJDqupzVb5tDthKdeEkjh5AjBDvLqI


link to grab missing images is 
https://gameinfo.albiononline.com/api/gameinfo/items/T4_ARTEFACT_ARMOR_CLOTH_KEEPER.png
you would replace the item name with the item you are looking for. so if you needed T6_ORE_LEVEL3@3
the link youd go to is https://gameinfo.albiononline.com/api/gameinfo/items/T6_ORE_LEVEL3@3.png
could possible just pull these from the web instead of locally hosted not sure performance wise since their site seems sluggish.

my code is very sloppy as I do not primarily work with js



<a href="https://imgur.com/l29a7jB"><img src="https://i.imgur.com/l29a7jBh.png" title="source: imgur.com" /></a>


to do:
adding quantity numbers on victim inventory

fix blank inventory spots(currently pulling from their location of victim bag example if is a blank space means item was not in that spot in their bag but items followed that space)

change when results folder is emptied sometimes it may empty during a merge and the merge might fail so the kill image comes out incorrect or distorted or not displayed

directions for noobs:
install node.js download link: https://nodejs.org/en/download/
in the folder where your project is create a file called .env and contents should be as follows
TOKEN=discord token goes here
MONGODB_URL=mongo db url goes here

download mongo db community server: https://www.mongodb.com/download-center/community
Discord token :https://discordapp.com/developers/applications
