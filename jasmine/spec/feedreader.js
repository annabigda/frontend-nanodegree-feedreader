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
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('has a URL defined and is not empty', function() {
      for(var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });

    it('has a name defined and is not empty', function() {
      for(var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
      }
    });

  });

  describe('The menu', function() {

    it('is hidden by default', function() {
      const menu = $('body')
      expect(menu.hasClass('menu-hidden')).toBe(true);
    });

    it('hides and shows when clicked', function() {
      const menu = $('body');
      const menuIcon = $('.menu-icon-link');

      menuIcon.click();

      expect(menu.hasClass('menu-hidden')).toBe(false);

      menuIcon.click();

      expect(menu.hasClass('menu-hidden')).toBe(true);
    });

    describe('Initial Entries', function() {

      // Load feed and call done
      beforeEach(function(done) {
        loadFeed(0, done)
      });

      it('calls loadFeed and completes the work', function() {
        expect($(".feed .entry").length).toBeGreaterThan(0);
      });
    });

    describe('New feed Selection', function() {
      it('changes the content', function(done) {
        // Load the first feed
        loadFeed(0, function() {
          // save the value
          const oldTitle = $('.header-title').text();
          // Check is the feed we want
          expect(oldTitle).toBe('Udacity Blog');
          // Load second feed
          loadFeed(1, function() {
            // Save value
            const newTitle =$('.header-title').text();
            // Check is the feed we want
            expect(newTitle).toBe('CSS Tricks');
            // Check they are not the same
            expect(newTitle).not.toBe(oldTitle);
            done();
          })
        })
      });
    });
  });
}());
