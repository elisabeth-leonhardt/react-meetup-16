import { ExerciseTitle } from '@/components/ExerciseTitle'
import { PageWrapper } from '@/components/PageWrapper'
import { CompleteTodoI, UserCreatedTodoI } from "@/models/TodoInterfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { returnPicture } from "@/components/Todo";
import { Bin } from "@/components/Icons";

async function fetchTodos() {
  // await delay(500);
  return fetch("http://localhost:8001/todos").then((res) => res.json());
}

async function createTodo(todo: UserCreatedTodoI) {
  const response = await fetch("http://localhost:8001/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: nanoid(),
      user: todo.user,
      task: todo.task,
      done: false,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}

async function updateTodo(todo: CompleteTodoI) {
  const res = await fetch(`http://localhost:8001/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: nanoid(),
      user: todo.user,
      task: todo.task,
      done: todo.done,
    }),
  });
  return await res.json();
}

async function deleteTodo(id: CompleteTodoI["id"]) {
  const res = await fetch(`http://localhost:8001/todos/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  return await res.json();
}

function Todo({ todo }: { readonly todo: CompleteTodoI }) {
  const queryClient = useQueryClient();
  const changeTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    // onSuccess: (updatedTodo: CompleteTodoI) => {
    //   queryClient.setQueryData(["todos"], (oldData: CompleteTodoI[]) => {
    //     const todoIndex = oldData.map((el) => el.id).indexOf(updatedTodo.id);
    //     // yeah!! new array methods!!
    //     return oldData.with(todoIndex, updatedTodo);
    //   });
    // },
  });

  // add a mutation that allows the deletion of an id
  function changeTodoStatus(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedTodo = { ...todo, done: e.target.checked };
    changeTodoMutation.mutate(updatedTodo);
  }
  const pic = returnPicture(todo.user);
  return (
    <div className="bg-white text-black rounded-lg grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 py-2 px-4">
      <input
        title="done"
        type="checkbox"
        checked={todo.done}
        onChange={changeTodoStatus}
      ></input>
      <p>{todo.task}</p>
      <Image
        src={pic}
        alt="profile picture"
        className="rounded-full"
        height={60}
        width={60}
      ></Image>
      {/* invoke the deletion when clicking this button */}
      <button onClick={() => alert("implement the delete function first!")}>
        <Bin fill="white"></Bin>
      </button>
    </div>
  );
}

function MutationExercise() {
  const queryClient = useQueryClient();
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todos"], (oldData: CompleteTodoI[]) => [
        ...oldData,
        newTodo,
      ]);
    },
  });
  const [todo, setTodo] = useState<UserCreatedTodoI>({ user: "", task: "" });
  function changeTodo(e: React.ChangeEvent<HTMLInputElement>) {
    const newObject: UserCreatedTodoI = {};
    newObject[e.target.name as keyof UserCreatedTodoI] = e.target.value;
    setTodo({ ...todo, ...newObject });
  }

  function onFormSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodoMutation.mutate(todo);
  }

  const todos = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });

  return (
    <PageWrapper>
      <ExerciseTitle title="Mutation Exercise"></ExerciseTitle>
      <h1 className="text-lg font-bold text-green-600 pb-4">
        Don't forget to start json-server for this exercise to work!
      </h1>
      <form onSubmit={onFormSubmit} className="grid grid-cols-1 gap-4">
        <div className="flex gap-4 items-end">
          <label htmlFor="user" className="text-xl font-bold">
            User:
          </label>
          <input
            type="text"
            className="text-black flex-1"
            name="user"
            id="user"
            onChange={changeTodo}
            value={todo.user}
          />
        </div>
        <div className="flex gap-4 items-end">
          <label htmlFor="task" className="text-xl font-bold">
            Task:
          </label>
          <input
            type="text"
            className="text-black flex-1"
            name="task"
            id="task"
            onChange={changeTodo}
            value={todo.task}
          />
        </div>
        <button type="submit" className="justify-self-end">
          create todo
        </button>
      </form>
      {todos.isLoading ? <span className="loader"></span> : null}
      <div className="grid grid-cols-2 gap-4 pt-8">
        {todos.isSuccess
          ? todos.data.map((todo: CompleteTodoI) => (
              <Todo todo={todo} key={todo.id}></Todo>
            ))
          : null}
      </div>
    </PageWrapper>
  );
}

export default MutationExercise