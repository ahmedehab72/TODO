import { getTodoListAction } from "@/actions/todo.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ModeToggle";


export default async function Home() {
  const todos = await getTodoListAction();
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      {todos.map((todo) => (
        <div key={todo.id} className="w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{todo.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">{todo.body}</p>
        </div>
      ))}
      <ModeToggle />

      <AddTodoForm />

    </main>
  );
}
