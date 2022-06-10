"use strict";
const fs = require("fs");
const path = require("path");

const folder = path.dirname(__dirname) + "/src/data";
const dataFile = path.join(folder, "data.json")


module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
   bootstrap(/*{ strapi }*/) {

    let reader = fs.readFileSync(dataFile, {encoding: "utf8"});
    let obj = JSON.parse(reader);

    console.log(obj.db[0].data.users)

    //console.log(strapi.entityService)
    obj.db[0].data.users.forEach(user =>{
      strapi.entityService.implemetation.test.create({
        name: user.name,
        email: user.email,
      })
    })   
/*      async function readData () {
      let reader = fs.createReadStream(dataFile);
      let data = "";

      for await (const chunk of reader) {
        data += chunk;
      }

      let obj = JSON.parse(data);
      console.log(obj.db[0].data.users);
    }; */
     
    //await readData().catch(err => console.log(err))
  },
};
