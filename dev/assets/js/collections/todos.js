var app = app || {};
var todos = [];


(function() {
  'use strict';
  var Todos = Backbone.Collection.extend({
    model: app.Todo,
    nextOrder: function() {
      return (!this.length) ? 0 : this.length;
    }
  });
  todos = (localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : todos;
  app.today = new Todos(todos.filter(function(todo) {
    return todo.category_id == 0;
  }));
  app.later = new Todos(todos.filter(function(todo) {
    return todo.category_id == 1;
  }));
  app.schedule = new Todos(todos.filter(function(todo) {
    return todo.category_id == 2;
  }));
  app.today.comparator = app.later.comparator = app.schedule.comparator = function(model) {
    return model.get('order');
  };

  console.log(app.today);
})();
