Vue.component('todo',{
  template:'#todoCard',
  props:['todo-Data','index'],
  data:function(){
    return{
    }
  },
  methods:{
    getTypeTodos:function(){
      console.log(this.todoData.type);
      var FromStorage = this.$parent.$data.todoArray;
      var tempData = this.todoData;
      var todoFiltered = FromStorage.filter(function(val){
          if(tempData!=undefined || tempData != null){
            return val.type==tempData.type
          }
        });
        this.$parent.$data.todoArray = todoFiltered;
        this.$parent.$data.selectedFilter = this.todoData.type;
    },
    isDone:function(){
      return this.todoData.isDone;
    },
    markDone:function(){
      var toMarkDone = JSON.parse(localStorage.getItem('todoList'));
      var tempData = this.todoData;
      if (toMarkDone.length>1) {
        var todoUpdated = toMarkDone.filter(function(val){
            if(tempData!=undefined || tempData != null){
              return val.id!=tempData.id
            }
          });
          tempData.isDone=true;
          todoUpdated.push(tempData);
          localStorage.setItem('todoList',JSON.stringify(todoUpdated));
          this.$parent.getTodosFromLocalStorage();
      }else{
        toMarkDone[0].isDone = !toMarkDone[0].isDone;
        localStorage.setItem('todoList',JSON.stringify(toMarkDone));
        this.$parent.getTodosFromLocalStorage();
      }
      this.checked=!this.checked;
    },
    removeTodo:function(){
        var toRemove = JSON.parse(localStorage.getItem('todoList'));
        var tempData = this.todoData;
        var todoUpdated = toRemove.filter(function(val){
            if(tempData!=undefined || tempData != null){
              return val.id!=tempData.id
            }
        	});
        if (todoUpdated.length >= 0) {
          localStorage.setItem('todoList',JSON.stringify(todoUpdated));
          this.$parent.getTodosFromLocalStorage();
        }
        //this.$parent.resetFields();
      }
  }
});

var todoVM = new Vue({
  el:'#todoList',
  created:function(){
    this.getTodosList();
  	},
  methods:{
    resetFilters:function(){
      this.todoArray = JSON.parse(localStorage.getItem('todoList'));
      this.selectedFilter='';
    },
    resetFields:function(){
        this.enteredText='';this.enteredType='';
    },
    getTodosFromLocalStorage:function(){
      this.todoArray = JSON.parse(localStorage.getItem('todoList'));
      this.resetFields();
    },
    getTodosList:function(){
      if (typeof(storage)!== 'undefined') {
        Materialize.toast('Oops ! there was an error saving your todo. Please try again.', 4000);
      }else{
        if (localStorage.getItem('todoList') == undefined || localStorage.getItem('todoList') == null || localStorage.getItem('todoList')=="[]") {
        Materialize.toast('YAY! Nothing to do..',4000);
        }else{
         this.getTodosFromLocalStorage();
        }
      }
    },
    addNewTodo:function(){
      if (typeof(storage)!== 'undefined') {
        Materialize.toast('Oops ! there was an error saving your todo. Please try again.', 4000);
      }else{
        if (localStorage.getItem('todoList') == undefined || localStorage.getItem('todoList') == null || localStorage.getItem('todoList')=="[]") {
          var targetTodo=[];
          targetTodo.push({id:0,text:this.enteredText,type:this.enteredType==''?"TODO":this.enteredType,isDone:false});
          localStorage.setItem('todoList',JSON.stringify(targetTodo));
          this.getTodosFromLocalStorage();
        }else{
          var existingTodoArray = JSON.parse(localStorage.getItem('todoList'));
          existingTodoArray.unshift({id:(existingTodoArray.length)+1,text:this.enteredText,type:this.enteredType==''?"TODO":this.enteredType,isDone:false});
          localStorage.setItem('todoList',JSON.stringify(existingTodoArray));
          this.todoArray = JSON.parse(localStorage.getItem('todoList'));
          this.resetFields();
        }
      }
    }
  },
  data:{
    todoArray:[],
    enteredText:'',
    enteredType:'',
    selectedFilter:''
  }
});
