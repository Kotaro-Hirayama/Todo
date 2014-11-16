var app = app || {};
var todos = [];

(function() {
  'use strict';
  app.Todo = Backbone.Model.extend({
    defaults: {
      content: '',
      completed: false
    },
    toggle: function() {
      this.set('completed', !this.get('completed'));
    },
    storage: function() {
      app.todos = app.today.toJSON().concat(app.later.toJSON()).concat(app.schedule.toJSON());
      localStorage.setItem('todos', JSON.stringify(app.todos));
    }
  });
})();
