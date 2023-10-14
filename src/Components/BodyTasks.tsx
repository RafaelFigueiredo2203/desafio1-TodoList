import { ClipboardText, Trash } from "@phosphor-icons/react";
import { InputNewTask } from "./InputNewTask";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {   } from "@radix-ui/react-checkbox";
import { Checkbox } from "../../@/components/ui/checkbox";


interface Task {
  id: number;
  title: string;
  isComplete: boolean;
  
}

export function BodyTasks(){

 

  const notify = () => toast.error('Por favor digite uma tarefa!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    }); 

  const [newTask, setNewTask] = useState('');
  const [tasks,setTasks] = useState<Task[]>([]);
  const [isCompletation, setIsCompletation] = useState(0);


  useEffect(() => {
    const taskStorage = localStorage.getItem('task');

    if(taskStorage){
      setTasks(JSON.parse(taskStorage));
    }

    
  },[]);

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(tasks));
    const getTask = tasks.filter(task => task.isComplete === true).length;
   
    setIsCompletation(getTask)
  },[tasks]);


  function handleNewTaskChange(event : ChangeEvent<HTMLInputElement>){
    setNewTask(event.target.value)
  }
  


  function handleCreateNewTask(event : FormEvent){
    if(newTask === ''){
      event.preventDefault()
      return notify();
    }else {
      const newNTask = {
        id: Math.random(),
        title: newTask,
        isComplete: false
       
      }

    event.preventDefault()
    setTasks(oldState => [...oldState, newNTask]);
    setNewTask('');

    }
  }
  function handleRemoveTask(id: number) {

    const filteredTasks = tasks.filter(task => task.id !== id);
    localStorage.removeItem('task');
    setTasks(filteredTasks);
  }


  function handleTaskCompletion(id: number) {

    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);
    
    setTasks(newTasks);

  }

  return (
    <>
     <InputNewTask
     onCreateTask={handleCreateNewTask}
     task={newTask}
     onTaskChange={handleNewTaskChange}
     />  

    <div className="w-full flex flex-col items-center justify-center">
   
   {tasks.length === 0 ? (
    <div  className="w-[736px] h-64">
    <header className="w-[736px] h-5 flex items-center justify-between mb-6 mt-16" >
      <span className="text-sm text-[#4EA8DE]">Tarefas Criadas 0</span>
      <span className="text-sm text-[#8284FA]">Concluídas 0</span>
    </header>

    <div className="pt-14 flex-col flex items-center justify-center rounded-lg border-t-2 border-t-[#808080]">
      <ClipboardText color="#808080" size={64} />
      <span
      className="font-normal mt-6 mb-[-20px] text-base leading-6 text-zinc-400"
      >Você ainda não tem tarefas cadastradas <br/><br/></span>
      <span
      className="font-normal text-base leading-6 text-zinc-600"
      >Crie tarefas e organize seus itens a fazer</span>
    </div>
    </div>

) : (
  <div className="w-[736px] ">
  
  <header className="w-[736px] h-5 flex items-center justify-between mb-6 mt-16" >
    <span className="text-sm text-[#4EA8DE]">Tarefas Criadas 
    <span className=" ml-2 text-sm rounded-full pl-1 pr-1 w-6 h-5 bg-gray-700 text-[#D9D9D9]">{tasks.length}</span>
    </span>
    <span className="text-sm text-[#8284FA]">Concluídas 
    <span className="ml-2 text-sm rounded-full pl-1 pr-1 w-6 h-5 bg-gray-700 text-[#D9D9D9]">
    {isCompletation}  de {tasks.length}
    </span>
    </span>
  </header>
    
 
  <div className="pt-14 flex-col flex items-center justify-center rounded-lg ">
  {tasks.map(task => (
   <div key={task.id} className="w-[736px] mb-4 h-[72px] rounded-lg border bg-zinc-800 border-[#333333] p-4 gap-3 flex items-center justify-between ">
    <Checkbox onCheckedChange={() => handleTaskCompletion(task.id)}/>
    <span className="font-normal text-sm leading-5 text-gray-100">{task.title}</span>
    <button onClick={() => handleRemoveTask(task.id)} className="btn"><Trash color="red" size={24} /></button>
   </div>
  ))}
  </div>
   </div>
   
    )}

   

   
    </div>
    </>
  )
}