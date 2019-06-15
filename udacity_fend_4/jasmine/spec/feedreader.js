/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test Suite 1 - This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensure that it has a URL defined
         * and that the URL is not empty.
         */
        it('all feeds have non-empty URL',function() {
            allFeeds.forEach(function (element) {
                expect(element['url']).toBeDefined();
                expect(element['url'].length).not.toBe(0);
            });
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds have non-empty name',function() {
            allFeeds.forEach(function (element) {
                expect(element['name']).toBeDefined();
                expect(element['name'].length).not.toBe(0);
            });
        });
    });


    /* Test suite 2: The menu */
    describe('The Menu', function() {
        /* Ensure that the menu element is
         * hidden by default.
         */
        it('Menu is hidden by default',function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
        /* Ensures that the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations:
         * does the menu display when clicked and
         * does it hide when clicked again.
         */

        // beforeEach(function() {
        // });

        it('Menu has the ability to change',function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

        });
    });


    /* Test suite: Initial Entries */
    describe('Initial Entries', function() {
        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
        */

        beforeEach(function(done) {
           loadFeed(0,function () {
               done();
           });
        });

        it('loadFeed returns at least one entry',function(done) {
            expect(document.getElementsByClassName('entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite: New Feed Selection */
    describe('New Feed Selection', function() {
        /* Ensure that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let x;
        let initFeeds,newFeeds;

        beforeEach(function(done) {


            loadFeed(1,function () {
                x = document.getElementsByClassName('entry-link')
                initFeeds='';
                for (i = 0; i < x.length; i++) {
                    initFeeds+=x[i]['href'];
                }
                console.log('loadFeed1');
                done();
            });

            //Let's call a different feed here.
            loadFeed(2,function () {
                y = document.getElementsByClassName('entry-link')
                newFeeds='';
                for (i = 0; i < 1; i++) {
                    newFeeds+=y[i]['href'];
                }
                console.log('loadFeed2');
            });
        });

        it('Content changes when a new feed is loaded',function(done) {
            expect(newFeeds).not.toBe(initFeeds);
            done();
        });

    });
}());
