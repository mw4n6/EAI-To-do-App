//public/core.js

var Todo = angular.module('Todo', []);

Todo.controller('mainController', ['$scope', '$http', function($scope, $http){
  $scope.formData = {};
  $scope.todos = {};
  $scope.showCompleted = false;
  $scope.submitting = false;
  $scope.users = [
    {
      userName  : "jcheng",
      firstName : "Justine",
      lastName  : "Cheng",
      fullName  : "Justine Cheng"
    },
    {
      userName  : "mwang",
      firstName : "Michael",
      lastName  : "Wang",
      fullName  : "Michael Wang",
    }
  ];
  $scope.currentUser = $scope.users[0].userName;
  
  var getTodosForCurrentUser = function(){
    console.log("getting todos for current user : ", $scope.currentUser);
    $http.post('/api/todos_for_user', {user : $scope.currentUser})
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
  
  getTodosForCurrentUser();
  
  
  
  $scope.createTodo = function() {
    if(
      ($scope.submitting)
      ||
      (!$scope.formData.text)
    ) 
    return;
    $scope.submitting = true;
    $http.post('/api/todos', {
      text :  $scope.formData.text,
      user :  $scope.currentUser
    })
      .success(function(data) {
        $scope.formData = {};
        $scope.todos = data;
        console.log(data);
        $scope.submitting = false;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
  
  $scope.completedTodo = function(id){
    $http.post('/api/complete_todo/' + id)
    .success(function(data){
      $scope.todos=data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  };
  
  $scope.unCompleteTodo = function(id){
    $http.post('/api/uncomplete_todo/' + id)
    .success(function(data){
      $scope.todos=data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  };
  
  $scope.clickTodo = function(todo){
    console.log("Todo is :", todo, todo.done);
    if(!todo.done)
    {
      $scope.completedTodo(todo._id);
    }
    else
    {
      $scope.unCompleteTodo(todo._id);
    }
  };
  
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
  
  $scope.$watch(
    'currentUser',
    function()
    {
      console.log("current user changed to : ", $scope.currentUser);
      getTodosForCurrentUser();
    }
  );
}]);