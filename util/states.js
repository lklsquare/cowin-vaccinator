const axios = require('axios');
const table = require("tty-table");
const { config,options } = require('./config');
// function to return list of all states
module.exports = function() {
    axios
    .get("https://cdn-api.co-vin.in/api/v2/admin/location/states", config)
    .then((response) => {
      // table formatter
      let header = [
        {
          value: "state_id",
          headerColor: "cyan",
          alias: "State ID",
          color: "white",
          align: "left",
          width: 40,
        },
        {
          value: "state_name",
          alias: "State",
          headerColor: "cyan",
          color: "white",
          align: "left",
          width: 40,
        },
      ];
      const out = table(header, response.data.states, options).render();
      console.table(out);
    })
    .catch((error) => {
      console.log(error);
    });
};