


# UsedProduct-ECommerce-Website
![HomePageSS](https://github.com/HsnKpln/UsedProduct-ECommerce-Website/blob/master/src/constants/png/homePageSS.png)
####  For Visit Link https://used-product-ecommerce-website.vercel.app/

This application was created to bring together those who want to sell and buy used products. It built with React, ContextApi, JavaScript, Axios, MaterialUI, Formik and CSS.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

#### Installation:
`npm install`

#### To Start Server:

`npm start`

## Description
##### **1.Authentication and Authorization** 
Firstly I created authentication and authorization system in login and register page. I saved token of user to localstroge so people who can log in redirect to home page dont see login or register page again.
##### **2.Context Api** 
As the project grew, I used Context so that control would not be difficult. I created User Context for user information and Product Context for relavent products process such as categories, colors, brands and offers. Result of process taken from api with axios. 
![detailPageSS](https://github.com/HsnKpln/UsedProduct-ECommerce-Website/blob/master/src/constants/png/detailPageSS.png)
##### **3.Pages**
Home page designed with metarial ui. First of all, Components were created and dynamically replicated according to the data coming from Api. The detail page was created and the data was dynamically generated according to the relevant product. I checked the purchase, bidding and offer withdrawal processes on the detail page by a single modal components. Usually These operations were done with the axios post, put and delete methods. I created my account page to manage and control my transactions. On this page you can see the given and received offers. Also this processes can be submit and reject from in this page.
![myAccountPageSS](https://github.com/HsnKpln/UsedProduct-ECommerce-Website/blob/master/src/constants/png/myAccountPageSS.png)
##### **4.Design**
For some ready-made components, the Meterial UI was used. Although I know sass, I used pure css to better understood the css structure. Specially I prefer to flex structure for responsive design. Also I continue to work on designing the project for mobile devices. I use media screen for this process.



