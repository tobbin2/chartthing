Startpage for Intranet
=======================
Made by Robin Sauma, Stefan Fernström, Alyssa Phung, August Sandell, Nikola Maljenovic, Viktor Zenk

## Description
This application was made in two weeks by a group of interns working at Evry in Jönköping.
The work description was to create a page that looked like the reference image that was given from the customer.
It's purpose was to show the company's statistics over the recent months.
The goal was to create an application and import it into Microsoft Office 365 SharePoint as a webpart for the customer.
The application is still a work in progress and does not fulfill the demands of the customer at this moment.

## How to use

**Running the app**
Start by downloading the code to your computer.
Then download node.js from https://nodejs.org/en/.

After everything is downloaded, running the application is simple, just open the application directory and run "install.bat" to download and install all the neccessary modules. 

When the install is finished, run "start.bat". This will run the application in a web browser through the nodejs server.

If the above doesn't work for some reason, go through the following steps: 

1. Press "Windows + R" to open the run window.
2. Type "cmd" and press enter.
3. In a separate window, open the explorer and find the path to the code you downloaded and copy it to the clipboard.
4. In the command promt, type "cd __paste path to directory here__".
5. Run the command "npm install" to install the neccessary modules.
6. When the installation is finished, run the command "npm start" to open up the application.

**Editing the code**

In the current state of the application, the data that is used can be found in object2.json.
There is no API to get the data from the customers database.

There are currently two versions. One uses custom made JavaScript svg-components, and the other uses the chart.js JavaScript library.
In the first version, the charts can be found in src/components/svgComponents/chart.js.
