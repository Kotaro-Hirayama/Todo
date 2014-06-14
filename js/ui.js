(function() {
  'use strict';
  app.Utils = {
    getDate: function() {
      var today = new Date();
      var day = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      var month = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
      var date = (function() {
        if (today.getDate() == 1) {
          return '1ST';
        } else if (today.getDate() == 2) {
          return '2ND';
        } else if (today.getDate() == 3) {
          return '3RD';
        } else {
          return '' + today.getDate() + 'TH';
        }
      })();
      return '' + day[today.getDay()] + ' ' + month[today.getMonth()] + ' ' + date;
    }
  };

  app.UI = {
    currentPage: 0,
    init: function() {
      $('.date').text(app.Utils.getDate());
      this.bindEvents();
    },
    bindEvents: function() {
      $('.header').on('swipeLeft', this.nextCard);
      $('.header').on('swipeRight', this.prevCard);
    },
    nextCard: function() {
      if(app.UI.currentPage == 2) return;
      app.UI.currentPage += 1;
      $('#todoapp').css('-webkit-transform', 'translateX(-' + (100 * app.UI.currentPage) + '%)');
    },
    prevCard: function() {
      if(app.UI.currentPage == 0) return;
      app.UI.currentPage -= 1;
      $('#todoapp').css('-webkit-transform', 'translateX(-' + (100 * app.UI.currentPage) + '%)');
    }
  };

  app.UI.init();
})();
