var app = app || {};
var todos = [];
var ENTER_KEY = 13;

(function() {
  'use strict';
  app.Utils = {
    init: function() {
      $('.date').text(app.Utils.getDate());
    },
    getDate: function() {
      var today = new Date();
      var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      // var day = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // var month = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
      var date = (function() {
        // if (today.getDate() == 1) {
        //   return '1ST';
        // } else if (today.getDate() == 2) {
        //   return '2ND';
        // } else if (today.getDate() == 3) {
        //   return '3RD';
        // } else {
        //   return '' + today.getDate() + 'TH';
        // }
        return '' + today.getDate();
      })();
      return '' + day[today.getDay()] + ' ' + month[today.getMonth()] + ' ' + date;
    }
  };

  app.Paging = {
    currentPage: 0,
    init: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      $('.header').on('dragLeft preswipeLeft dragRight preswipeRight', this.moveCard);
      $('.header').on('swipeCancel', this.moveCancel);
      $('.header').on('swipeLeft', this.nextCard);
      $('.header').on('swipeRight', this.prevCard);
      $('.header').on('swipeUp', this.hideSetting);
      $('.header').on('swipeDown', this.showSetting);

      $('.next').on('tap', this.nextCard);
      $('.prev').on('tap', this.prevCard);
    },
    moveCard: function(evt) {
      if ((evt.type == 'dragLeft' || evt.type == 'preswipeLeft') && app.Paging.currentPage == 2) return;
      if ((evt.type == 'dragRight' || evt.type == 'preswipeRight') && app.Paging.currentPage == 0) return;
      $('#todoapp').css('-webkit-transform', 'translateX(' + (evt.clientXdistance * 1.5 - 320 * app.Paging.currentPage) + 'px)');
    },
    nextCard: function() {
      if (app.Paging.currentPage == 2) return;
      app.Paging.currentPage += 1;
      $('#todoapp').css('-webkit-transform', 'translateX(-' + (100 * app.Paging.currentPage) + '%)');
    },
    prevCard: function() {
      if (app.Paging.currentPage == 0) return;
      app.Paging.currentPage -= 1;
      $('#todoapp').css('-webkit-transform', 'translateX(-' + (100 * app.Paging.currentPage) + '%)');
    },
    moveCancel: function() {
      $('#todoapp').css('-webkit-transform', 'translateX(-' + (100 * app.Paging.currentPage) + '%)');
    },
    showSetting: function() {
      $('#todoapp').css('-webkit-transform', 'translate(-' + (100 * app.Paging.currentPage) + '%, 80%)');
    },
    hideSetting: function() {
      $('#todoapp').css('-webkit-transform', 'translate(-' + (100 * app.Paging.currentPage) + '%, 0)');
    }
  };

  app.Utils.init();
  app.Paging.init();
})();
