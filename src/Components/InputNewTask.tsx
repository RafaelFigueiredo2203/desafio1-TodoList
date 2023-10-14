import { PlusCircle } from "@phosphor-icons/react";
import { ChangeEventHandler, FormEventHandler } from "react";



interface InputProps {
  onCreateTask: FormEventHandler<HTMLFormElement> | undefined;
  onTaskChange:ChangeEventHandler<HTMLInputElement> | undefined;
  task:string
}

export function InputNewTask({onCreateTask, onTaskChange, task}:InputProps){

  return (
    <form onSubmit={onCreateTask} className="w-full flex items-center justify-center mt-[-28px]">
      <input 
      className="w-[638px] h-14 mr-2 bg-zinc-700 rounded-lg p-2 border-0 text-zinc-200 text-base placeholder:text-zinc-400 text-base"
      type="text" onChange={onTaskChange} value={task} placeholder="Adicione uma nova tarefa" />

      <button 
      className=" text-white text-base w-24 h-14 rounded-lg bg-[#1E6F9F] flex items-center justify-center
      hover:opacity-60 focus:opacity-90"
      type="submit">Criar <PlusCircle className="m-1" size={24} /></button>
    </form>
  )
}