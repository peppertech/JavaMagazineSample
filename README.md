# Java Magazine Sample Application

This is a simple sample applicaton based on the Oracle JavaScript Extension Toolkit (JET). 
The sample uses a free REST API provided by the US Government at http://api.data.gov to 
show a list of the different types of alternative fuel stations located in the city and state that you provide.
The resulting data is shown in a Pie chart by default with an option to change to a bar chart display. 
You can click on any item in the legend of the chart to hide or show that item.

![final app screenshot one](http://dessertfirstproductions.com/images/final-1.png "final app screenshot one")
![final app screenshot two](http://dessertfirstproductions.com/images/final-2.png "final app screenshot two")

### Prerequisites
* Node.js (for npm)
* Bower
* An API key from https://api.data.gov/signup/

## Installation
After cloning the repository, change to the root of the application and type

```
npm install
bower install
grunt bowercopy
```

To build and run the application in a browser type

```
grunt build
grunt serve
```

The serve command will provide livereload for any files that are changed under the /src folder.  
If you add or remove files, you will need to run the build again. 
