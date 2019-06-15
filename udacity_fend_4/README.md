# Introduction
This is the fourth project towards the Udacity front-end developer nano-degree. The base RSS feed reader was provided by Udacity [here](https://github.com/udacity/frontend-nanodegree-feedreader), and the assignment was to write test suites using [Jasmine](http://jasmine.github.io/).

# How To Run This Code
Download the code and open `index.html` in a browser. You'll see the RSS feed in the top, and in the Jasmine test suite is displayed at the bottom and should look something like this:
![Example Of Jasmine Test Suite](https://raw.githubusercontent.com/czakon/udacity_fend/master/udacity_fend_4/Example_jasmine_test_suite.png) 

# Test Suites Written For This Application
1. `RSS Feeds`
   * `are defined`: Ensures that the `allFeeds` variable is defined and is not empty. 
   * `all feeds have non-empty name`: Loops through each feed, enuring that the URL is defined and is not empty. 
2. `The Menu`
   * `Menu is hidden by default`: Confirms that the menu element is hidden by default. 
   * `Menu has the ability to change`: Confirms that menu appears when it is clicked, and that it disappears when it is clicked again. 
3. `Initial Entries`
   * `loadFeed return at least one entry`: ensures that at least one entry is returned in the loadFee. 
   * This is an asynchronous function and therefore requires using the `done()` function. 
4. `New Feed Selection`
   * `Content changes when a new feed is loaded`: Ensures that when a new feed is loaded, that the content actually changes. 

