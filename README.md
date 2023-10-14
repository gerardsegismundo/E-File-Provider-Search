# IRS Project

This is an application that requests a list of tax return preparers from the IRS, based on a user-provided zip code (e.g., 93036) and state.

The IRS website is available [here](http://www.irs.gov/uac/Authorized-IRS-e-file-Providers-for-Individuals).

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Images](#images)

## Getting Started

These instructions will guide you in setting up and running the application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js

### Installation

1. Clone or download the project to your local machine.
2. In the project's root directory, install server-side dependencies by running: `$ npm install`.
3. In the project's root directory, install client-side dependencies by running: `$ npm run client-install`.

### Running the Application

To start the application, use the following command: `$ npm run dev`.

### Images

![Search Result](https://i.imgur.com/G61WAQu.png)
_Search Result: Displays 10 results with each fetch, along with the count of matching items, similar to the IRS webpage._

![Last Page](https://imgur.com/A8nMeGP.png)
_Last Page._

![Sort By](https://imgur.com/eoZJOvC.png)
_Sort By Implementation: This image showcases the results sorted by Point of Contact._

![No Result](https://imgur.com/0U6f5Bw.png)
_No Result: Shown when the search does not return any results._
