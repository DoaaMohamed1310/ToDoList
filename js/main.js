let listInput=document.querySelector('.listInput');
let btnAdd=document.querySelector('.add')
let update=document.querySelector('.editInput')
let statusInput=document.querySelector("#task");
let massage= document.querySelector('.massage')
let currentId;
let TasksList=[]
// save task in browser
if(localStorage.getItem('task')!=null){
    TasksList=JSON.parse(localStorage.getItem('task'))
    addTask(TasksList)
}
// when click to add task
btnAdd.addEventListener('click',()=>{
    if(listInput.value !==''){
        let list={
            id: Date.now() ,
            task:listInput.value,
            status:statusInput.checked
        }        
        // add tasks to list
        TasksList.push(list)
        // add tasks to local storge
        setTaskToLocal(TasksList)
        addTask(TasksList)
        // clear inpute value after add
        listInput.value=''
        statusInput.checked=''
        // massage add task
        massageShow('Task Has Been added Successfully ✔️')
        massageHide()
    }

})
// function to add task
function addTask(TasksList){
    let cartona=''
    TasksList.forEach(element => {
        cartona+=`<div class="box  d-flex justify-content-between align-items-center p-3 rounded mb-3 ">
                    <span class=" w-50 text-white" style="overflow: auto;">${element.task}</span>
                    ${(element.status)?'<i class="fa-solid fa-check fs-3 text-success"></i>':'<i class="fa-solid fa-close fs-3 text-danger"></i>'}
                    <div class="d-flex gap-4">
                        <i class="edite fa-solid fa-edit fs-4 text-warning" onclick='editTask(${element.id})'></i>
                        <i class="delete fa-solid fa-trash fs-4 text-danger" onclick='removeTask(${element.id})'></i>
                    </div>
                </div>`
    });
    document.querySelector('.result').innerHTML=cartona
}
//function remove task
function removeTask(id){
    TasksList= TasksList.filter((element)=>{
        return element.id !=id
    })
    addTask(TasksList)
    // set task local storge
    setTaskToLocal(TasksList)
    massageShow('Task Has Been Deleted ✔️')
    massageHide()
}
// function to edit task
function editTask(id){
    // filter to get special element 
    let element=TasksList.filter((element,i)=>{
        return element.id == id
    })
    listInput.value=element[0].task
    statusInput.checked=element[0].status
    // hide btn add
    update.classList.remove('d-none')
    // show btn edit
    btnAdd.classList.add('d-none')
    currentId=id
}
// funcation update
function updateTask(){
    for (let i = 0; i < TasksList.length; i++) {
        if(TasksList[i].id==currentId){
            TasksList[i].task=listInput.value
            TasksList[i].status=statusInput.checked
            update.classList.add('d-none')
            btnAdd.classList.remove('d-none')
            addTask(TasksList)
            setTaskToLocal(TasksList)
            listInput.value=''
            statusInput.checked=''
            massageShow('Task Has Been Updated Successfully ✔️')
            massageHide()

        }
    }
}
// set to local storge
function setTaskToLocal(list){
    localStorage.setItem('task',JSON.stringify(list))
}
// function show massage success
function  massageShow(text){
    massage.innerHTML=`<span class='text-success fw-border'>${text}</span>`
    setTimeout(() => {
        massage.classList.remove('opacity-0')
    }, 100);
}
// function hide massage success
function massageHide(){
    setTimeout(() => {
        massage.classList.add('opacity-0')
    }, 2000);
}
