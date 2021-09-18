(function() {
    'use strict';
    const tasker = {
        app: function() {
            this.getElemetDom();
            this.eventsOntaskHeader();
            this.eventsOntaskBody();
        },
        getElemetDom: function() {
            this.taskInput = document.querySelector('input[type="text"]');
            this.addTaskBtn = document.querySelector('.addTaskBtn');
            this.listTask = document.querySelector('.tasks');
            this.childListTask = this.listTask.children;
            this.errorMessage = document.querySelector('.errorMessage');
        },
        render: function() {
            const taskLi = document.createElement('li');
            taskLi.setAttribute('class', 'task');

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');

            const textNode = document.createTextNode(this.taskInput.value);

            const delBtn = document.createElement('button');
            delBtn.setAttribute('class', 'delTaskBtn')

            const iconDelBtn = document.createElement('i');
            iconDelBtn.setAttribute('class', 'fa fa-trash');

            delBtn.appendChild(iconDelBtn);

            taskLi.appendChild(checkbox);
            taskLi.appendChild(textNode);
            taskLi.appendChild(delBtn);

            this.listTask.appendChild(taskLi)
        },
        eventsOntaskHeader: function() {
            this.addTaskBtn.onclick = this.addTask.bind(this);
            this.taskInput.onkeypress = this.enterKey.bind(this);
        },
        eventsOntaskBody: function() {
            for(var i = 0; i < this.childListTask.length; i++) {
                var check = this.childListTask[i].getElementsByTagName("input")[0];
                check.onclick = this.checked.bind(this, this.childListTask[i], check);

                const delTaskBtn = this.childListTask[i].getElementsByTagName('button')[0];
                delTaskBtn.onclick = this.delTask.bind(this, i );
            }
        },
        addTask: function() {
            const value = this.taskInput.value;
            this.errorMessage.style.display = "none";

            if (value == "") {
                this.err();
            }else {
                this.render();
                this.taskInput.value = "";
                this.eventsOntaskBody();
            }
        },
        enterKey: function(event) {
            if(event.keyCode === 13 || event.which === 13){
                this.addTask();
            }

        },
        checked: function(taskLi, check) {
            if(check.checked) {
                taskLi.className = 'task completed'
            }else
            {
                taskLi.className = 'task'
            }
        },
        delTask: function(i) {
            this.listTask.children[i].remove();
        },
        err: function() {
            this.errorMessage.style.display = "block"
        }
    }
    tasker.app();
})()