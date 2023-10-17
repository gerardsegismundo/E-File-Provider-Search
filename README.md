# IRS Project

This application fetches a list of tax return preparers from the IRS, based on a user-provided zip code (e.g., 93036) and state.

The IRS website is available [here](http://www.irs.gov/uac/Authorized-IRS-e-file-Providers-for-Individuals).

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [User Interface](#user-interface)

## Getting Started

These instructions will guide you in setting up and running the application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js

### Installation

1. Clone or download the project to your local machine.
2. In the project's root directory, install server-side dependencies by running: `$ npm install`.
3. In the project's root directory, install client-side dependencies by running: `$ npm run clientinstall`.

### Running the Application

To start the application, use the following command: `$ npm run dev`.

### User Interface

1. **Search Result:**
   ![Search Result](https://i.imgur.com/zqKmSw1.png)
   Displays 10 results with each fetch, along with the count of matching items, similar to the IRS webpage.
   Added a better pagination for better user experience

2. **Loading Search Results:**
   ![Loading Search Results](https://i.imgur.com/HMcZMOz.png)
   Loading Search Results...

3. **Sorting By Name of Business - Page 5:**
   ![Sorting](https://i.imgur.com/dxv2p6l.png)
   Sorting By Name of Business; page 5.

4. **Loading Table Page:**
   ![Loading Page](https://i.imgur.com/xomXbdT.png)
   Loading Table Page...

5. **Last Page:**
   ![Last Page](https://i.imgur.com/PSyMdv9.png)
   Last Page of Search Results.

6. **No Result:**
   ![No Result](https://i.imgur.com/0NqnIq4.png)
   No Result: Shown when the search does not return any results.

## Deployment

You can access the deployed application using the following links:

- [Render Deployment](https://efile-provider-search.onrender.com/)
- [Railway Deployment](https://e-file-provider-search-production.up.railway.app/)
