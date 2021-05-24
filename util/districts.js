const axios = require('axios');
const table = require("tty-table");
const { config,options } = require('./config');
// Function which take stateid as input and return all the formatted districts
module.exports = function(stateid) {
    axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`,
      config
    )
    .then((response) => {
      // Table header specific formatting
      let header = [
        {
          value: "district_id",
          headerColor: "cyan",
          alias: "District ID",
          color: "white",
          align: "left",
          width: 40,
        },
        {
          value: "district_name",
          alias: "District",
          headerColor: "cyan",
          color: "white",
          align: "left",
          width: 40,
        },
      ];
      // Output the results.
      const out = table(header, response.data.districts, options).render();
      console.table(out);
    })
    .catch((error) => {
      console.log(error);
    });
};