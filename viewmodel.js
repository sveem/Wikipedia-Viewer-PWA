var app = app || {};

app.vm = (function() {
  var title = ko.observable('Wikipedia-Viewer');


  var vm = {
    title: title  
  };

  return vm;
}());

$(function() {
  ko.applyBindings(app.vm);  
});