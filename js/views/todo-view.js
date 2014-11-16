var app = app || {};
var todos = [];

(function($) {
  'use strict';
  app.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    events: {
      'tap label': 'edit',
      'swipeRight label': 'toggleCompleted',
      'swipeLeft label': 'clear',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close',
      'swipeUp label': 'sortTodos',
      'swipeDown label': 'sortTodos',
      'taphold label': 'moveTodo',

      'preswipeLeft label': 'animate',
      'preswipeRight label': 'animate',
      'dragRight label': 'animate',
      'dragLeft label': 'animate',
      'swipeCancel label': 'animate'
    },
    animate: function(evt) {
      var _self = this;
      var className;
      if (evt.type == 'swipeCancel' || evt.type == 'dragLeft' || evt.type == 'dragRight') _self.$el.removeClass('preclear').removeClass('toggleCompleted');
      if (evt.type == 'preswipeLeft') _self.$el.addClass('preclear');
      if (evt.type == 'preswipeRight') _self.$el.addClass('toggleCompleted');
      // _self.$el.addClass(className);
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'all', this.save);
    },
    save: function() {
      this.model.storage();
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('completed', this.model.get('completed'));
      this.$input = this.$('.edit');
      return this;
    },
    toggleCompleted: function() {
      var _self = this;
      _self.model.toggle();
      _self.$el.removeClass('toggleCompleted');
    },
    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },
    close: function() {
      var trimmedValue = this.$input.val().trim();
      this.$input.val(trimmedValue);
      if (trimmedValue) {
        this.model.set('content', trimmedValue);
      } else {
        this.clear();
      }
      this.$el.removeClass('editing');
    },
    updateOnEnter: function(e) {
      if (e.which === ENTER_KEY) {
        this.close();
      }
    },
    clear: function() {
      var _self = this;
      var num = 0;
      var collection = this.model.collection;
      _self.$el.addClass('clear');
      _self.$el.one('webkitTransitionEnd', function() {
        _self.$el.one('webkitTransitionEnd', function() {
          _self.model.destroy();
          collection.each(function(todo) {
            todo.set('order', num);
            num++;
          }, _self);
        });
      });
    },
    sortTodos: function(evt) {
      var startOrder = this.model.get('order');
      var endOrder = $(document.elementFromPoint(evt.clientXend, evt.clientYend)).attr('data-order');
      var loopstart, loopend, sortNum;
      if (!endOrder) return;
      (startOrder < endOrder) ? (loopstart = startOrder, loopend = endOrder, sortNum = -1) : (loopstart = endOrder, loopend = startOrder, sortNum = 1);
      this.model.collection.each(function(todo) {
        if (todo.get('order') == startOrder) {
          todo.set('order', endOrder);
        } else if (todo.get('order') >= loopstart && todo.get('order') <= loopend) {
          todo.set('order', (+todo.get('order') + sortNum));
        }
      }, this);
      this.model.collection.sort();
    },
    moveTodo: function(evt) {
      var self = this;
      var count = 0;
      var collectionData = [app.today.length, app.later.length, app.schedule.length];
      $('#move-to').addClass('show');
      $('.card').addClass('blur');
      $('#move-to li').one('tap', function() {
        if (count != 0) return;
        var cat = $(this).attr('data-category');
        self.model.set('category_id', cat);
        self.model.set('order', collectionData[cat]);
        $('.card').removeClass('blur');
        $('#move-to').removeClass('show');
        var pushModel = self.model;
        self.clear();
        if (cat == 0) app.today.push(pushModel);
        if (cat == 1) app.later.push(pushModel);
        if (cat == 2) app.schedule.push(pushModel);
        self.save();
        count += 1;
      });
      $('#move-to').one('tap', function() {
        $('.card').removeClass('blur');
        $('#move-to').removeClass('show');
      });
    }
  });
})($);
