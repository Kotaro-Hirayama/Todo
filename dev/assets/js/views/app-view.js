var app = app || {};
var todos = [];

(function($) {
  'use strict';
  app.AppView = Backbone.View.extend({
    el: '#todoapp',
    initialize: function() {
      app.TodayView = new app.CardView(app.today, 0);
      app.LaterView = new app.CardView(app.later, 1);
      app.ScheduleView = new app.CardView(app.schedule, 2);
    }
  });
})($);
