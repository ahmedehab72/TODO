import { getTodoListAction } from "@/actions/todo.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";


export default async function Home() {
  const { userId } = await auth()

  const todos = await getTodoListAction();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex  items-center justify-end w-full mb-6">
        <AddTodoForm userId={userId} />
      </div>
      <TodoTable todos={todos} />

    </main>
  );
}
