var app = app || {};
var todos = [];

(function($) {
  // 'use strict';
  app.CardView = Backbone.View.extend({
    tagName: 'section',
    className: 'card',
    template: _.template($('#card-template').html()),
    events: {
      'tap .add-button': 'create'
    },
    initialize: function(collection, category) {
      var categoryName = ['today', 'later', 'schedule'];
      this.collection = collection;
      this.$el.html(this.template({
        category: category,
        categoryName: categoryName[category]
      }));
      this.$el.addClass(categoryName[category]);
      $('#todoapp').append(this.el);

      this.listenTo(collection, 'add', this.addOne);
      this.listenTo(collection, 'sort', this.addAll);
      this.collection.sort();
    },
    addAll: function() {
      this.$el.children('.todo-list').html('');
      this.collection.each(this.addOne, this);
    },
    addOne: function(todo) {
      var view = new app.TodoView({
        model: todo
      });
      this.$el.children('.todo-list').append(view.render().el);
    },
    newAttributes: function(evt) {
      return {
        content: '',
        completed: false,
        order: this.collection.nextOrder(),
        category_id: $(evt.target).attr('data-category')
      };
    },
    create: function(evt) {
      this.collection.add(this.newAttributes(evt));
      $(this.$el.find('label')[this.$el.find('label').length - 1]).trigger('tap');
    }
  });
})($);
