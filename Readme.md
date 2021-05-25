<!-- ABOUT THE PROJECT -->
## Easily Find a vaccination slot across India

This is a nodejs script for finding the slot in the list of districts and filter it based on different criteria. The script will provide a cron job as well which will periodically run and provide notifications if the slots are available.The script can also help you to quickly open the cowin login page, enter registered number and generate OTP automatically.

Here's why:
* Simple and efficient usage
* Provides filters
* Provide cron job and notifications :smile:
* Automatically Generates OTP once the slots are available

**NOTE**

Provide sufficient permissions for ***notifications*** and ***browser automation*** to work.

---



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your script locally.
To get a local copy up and running follow these simple example steps.

**NOTE**

***The Cowin open APIs are now cached and can have delay of upto half an hour***.

---

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
1. Install NPM packages
   ```sh
   npm install
   ```



<!-- USAGE EXAMPLES -->
## Usage

These are the commands required to make the most out of the project.


### usage

1. Check the ***state ID***
   ```sh
   node index.js states
   ```
1. Use the ***States ID*** with `--state` flag to find the ***District ID*** 
   ```sh
   node index.js districts --state 16
   ```
1. Use the ***District Id*** to find the slots, district ID can be provided as csv with the `--districts` flag
   ```sh
   node index.js slots --districts 294,265 --age 18 --dose 1
   ```
1. Use the ***slot-task*** command to run the cron job, use the ***District Id*** to find the slots, district ID can be provided as csv with the `--districts` flag
   ```sh
   node index.js slots-task --districts 294,265 --age 18 --dose 1
   ```

**NOTE**

The flag `--district` should always be either a number or comma separated numbers, the flag `--age` is optional and can only be having values ***18*** or ***45*** for now. The flag `--dose` is optional and can be either ***1*** or ***2***.
Use the flag `--nextDay` to find the available slot from the next day, use flag `--getOTP` to open ***Cowin portal*** and generate OTP directly from the program.

---


**NOTE**

To use the flag `--getOTP` setup the `chromedriver` from [here](https://chromedriver.chromium.org/downloads) and add the driver path in `PATH` variable of the system. Make sure to provide necessary permissions. 
***Make sure to download the driver that matches the chrome version on the system***

---

### Add the chromedriver to the mac system

1. Download the `chromedriver` from [here](https://chromedriver.chromium.org/downloads) and extract it in `/user/local/bin/`
  
1. Grant permission for the `chromedriver`
   ```sh
   xattr -d com.apple.quarantine chromedriver 
   spctl --add --label 'Approved' chromedriver
   ```

3. Replace the `'registered-number': '9********1'` in `util/config.js` with your registered number


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



