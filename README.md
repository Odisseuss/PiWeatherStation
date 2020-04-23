# PiWeatherStation

> A Raspberry Pi "plug and play" Single Page App and API

This "plug and play" software kit contains an API which handles the collection of data from the BME680 sensor and a Single Page App built with react for displaying the data and a short term weather prediction.

This is perfect if you want to quickly set up a Raspbery Pi weather station with just the PI and a bme680 sensor from Pimoroni. It's also a great starting code template which you can change to suit your needs.

<!-- Add a picture of the front-end -->
<!-- ![](header.png) -->

## Installation

##### Raspbery Pi:

Clone the repo using:

```sh
git clone https://github.com/Odisseuss/PiWeatherStation.git
```

Run

```sh
npm install
```

Then enter the RPi using your favourite method, open a terminal where the repo was cloned and then run the install script with:

```sh
bash ./ShellScripts/install.sh
```

Because the bme680 sensor does not have an altimeter, the program uses a weather API to get the current pressure at sea level for a specific location.

A list of all the cities supported can be found [here](http://bulk.openweathermap.org/sample/city.list.json.gz). If your city is not listed, just use the closest city and the prediction should still be accurate.

## Usage example

Connect your sensor to the Raspbery Pi and install the software. Your PiWeatherStation is up and ready to go. Now you have your own stylish DIY weather station that can make short term weather predictions and can be upgraded to support new and exciting features.

## Development setup

#### If you want to work on your PiWeatherStation's front end what you have to do is:

Clone the repository on your local machine and run:

```sh
npm install
```

Then just make the changes you want.

#### If you want to work on your PiWeatherStation's back end:

##### Windows:

This is a bit more complicated.First you have to follow the steps mentioned above.
Then install PostgreSQL, set up your database and edit the _.env_ file to match your database configuration.

##### Linux

If you're working on linux, you're in luck. Just follow the [installation instructions](https://github.com/Odisseuss/PiWeatherStation#installation) and you'll be ready to go.

<!-- ## Meta

Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com

Distributed under the XYZ license. See `LICENSE` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/) -->

<!-- Markdown link & img dfn's -->

<!-- [npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square -->
