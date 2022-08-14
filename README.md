# Stocks web app

url: http://vaidasbl-stonkz.herokuapp.com/

The application was built based on the requirements of IBM internship's technical task. The goal of developing this app was educational/presentational and serves no real-world purpose.

## Introduction
The main idea of this app is to display stock prices of various companies by integrating finnhub.io API. The implementation of said API is written in backend service of this app. The total of two finnhub's API functions were integrated: 

 - A function for retrieving company data by company symbol;
 - A function for retrieving stock data of a company by company symbol, resolution and timeframe.

By manipulating these functions, three views/components were designed to display the results.

## UI components

There are three main components, each providing different functionalities.

### - Home component

This component is displayed at the homepage of the application. By default, it consists of a text input field and a button. The input field accepts letters and spaces, up to 35 characters, and should be used to enter the symbol of a company (e.g., MSFT, IBM or AAPL). If the entered symbol is apparent in finnhub's database, clicking a button next to the input field displays a card with a company data - name, currency, country and a web url. 

It is possible to look for stock exchange data of the found company by clicking its name in the company card. By doing this, a dialog is presented with two data pickers which define the timeframe of stock data. Clicking 'proceed' at the bottom of the dialog navigates to the graph view.

### - Graph (stocks) component

This component can be found by clicking 'Stocks' in the navigation bar or by proceeding through company card dialog at homepage.

There are four input fields and two buttons. Filling all the fields unlocks 'Search' button, which invokes function for stock data retrieving and generates a candle graph according to the data provided.

### - Log component

This component consists of table-like data list, text input field and pagination.

 - The data list displays past user search actions. Each data entry in the list may have an 'Open' button at the 'Stocks' column, which opens a dialog with the stock data that was retrieved at that particular search event. The user can see a graph of this data by clicking 'See in graph' button at the very dialog;
 - Text input field can be used for filtering data entries by company symbol or search event date;
 - Each page has a capacity of 10 data entries, the pages can be selected at the bottom of the component.

## Limitations and shortcomings

- It would be useful for a company symbol input field to show suggestions of what symbols exist. This was attempted to accomplish by writing a function for symbol extraction, but it generated a text file with nearly 29k company symbols, which kept breaking the app;
- Graph generation through company card in homepage does not work as intented. It does not trigger a function so user has to manually click search. This is caused by poorly organized component structure;
- Refreshing the page while not at home path '/' shows routing error;
- There are no tests written.

## Tools, Technologies and libraries

Backend: Node.js, Express, Mongoose, Finnhub;  
Frontend: React.js, Redux.js, MUI, Bootstrap, Highcharts, SASS, Sweetalert;  
Database: MongoDB;  
Hosted on: www.heroku.com  
