const axios = require('axios');
const table = require("tty-table");
const { config, options } = require('./config');
const chalk = require("chalk");
const cron = require('node-cron');
const notifier = require("node-notifier");


// function to fetch slot by district

function fetchByDistrict(dataObject, resolve, reject) {
  axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${dataObject.district}&date=${dataObject.date}`,
      config
    )
    .then((response) => {
      resolve(response.data)
    }).catch((e) => {
      reject('rejected because of error: ' + e)
    })
}

// function to collect promise

function promiseCollector(promFunc, arr) {

  const promises = [];
  arr.forEach((item) => {
    promises.push(new Promise((resolve, reject) => {
      promFunc(item, resolve, reject)
    }))
  })

  return Promise.all(promises)

}

//function to concatenate the response
function concatenate(centersData) {
  let centers = []
  centersData.forEach(item => {
    centers = [...centers, ...item.centers]
  })
  return centers
}


// function to check slots.
module.exports = function (districts, dose=0, age = 0, nextDay=0) {

  const date = new Date();
  let todaysDate = `${date.getDate()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
  const time = date.toTimeString();

  let dateToCheck = `${date.getDate()+(nextDay)}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;

  let promiseData = districts.trim().split(',').map((item) => {
    return { "district": item, "date": dateToCheck }
  })

  promiseCollector(fetchByDistrict, promiseData).then((response) => {
    let finalData = [];
    let districtName;

    let centers = concatenate(response)
    centers.forEach((item) => {

      item.sessions.forEach((session) => {
        districtName = item.district_name;
        doseAvailable = (dose !== 1 && dose !== 2) ? session.available_capacity_dose1+session.available_capacity_dose2 : (dose===1?session.available_capacity_dose1: session.available_capacity_dose2)
        // based on user age choice filter the data
        if (age != 18 && age != 45 && doseAvailable) {
          
          let data = {
            Center: item.name,
            Pincode: item.pincode,
            Address: item.address,
            Date: session.date,
            Slots: doseAvailable,
            Age: session.min_age_limit,
          };
          finalData.push(data);
        } else if (
          age == "18" &&
          session.min_age_limit == "18" &&
          doseAvailable
        ) {

          let data = {
            Center: item.name,
            Pincode: item.pincode,
            Address: item.address,
            Date: session.date,
            Slots: doseAvailable,
            Age: session.min_age_limit,
          };
          finalData.push(data);
        } else if (
          age == "45" &&
          session.min_age_limit == "45" &&
          dose
        ) {

          let data = {
            Center: item.name,
            Pincode: item.pincode,
            Address: item.address,
            Date: session.date,
            Slots: doseAvailable,
            Age: session.min_age_limit,
          };
          finalData.push(data);
        }
      });
    })
    if (finalData.length) {

      console.log(
        chalk.underline.bgRed.bold(`Showing Slots from - ${dateToCheck}`)
      );

      switch (age) {
        case 0:
          console.log(chalk.underline.bgBlue.bold(`All ages`));
          break;
        case 45:
          console.log(chalk.underline.bgBlue.bold(`45+ Age`));
          break;
        case 18:
          console.log(chalk.underline.bgBlue.bold(`18-45 Age`));
          break;
        default:
          break;
      }
      // table formatting
      let header = [
        {
          value: "Center",
          headerColor: "cyan",
          color: "white",
          align: "left",
          width: 40,
        },
        {
          value: "Pincode",
          headerColor: "cyan",
          color: "white",
          align: "left",
          width: 15,
        }, ,
        {
          value: "Address",
          headerColor: "cyan",
          color: "white",
          align: "left",
          width: 40,
        },
        {
          value: "Date",
          headerColor: "cyan",
          color: "white",
          align: "left",
          width: 20,
        },
        {
          value: "Slots",
          headerColor: "cyan",
          color: "white",
          align: "left",
          width: 10,
        },
        {
          value: "Age",
          headerColor: "cyan",
          color: "white",
          align: "left",
          width: 7,
        },
      ];
      const out = table(header, finalData, options).render();
      console.table(out);
      notifier.notify({
        title: "Vaccination Slots Available",
        subtitle: "Daily Maintenance",
        message: "Immediately go and check Vaccination slots!",
        wait: true,
        sound: 'purr'
      });
      
    }
    console.log(
      chalk.black.bgWhite.bold(`\nchecked on ${time} on ${todaysDate}\n`)
    );

  }, (reason) => {
    console.log(reason)
  })
};