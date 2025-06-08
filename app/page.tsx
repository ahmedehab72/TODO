import { getTodoListAction } from "@/actions/todo.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ModeToggle";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";


export default async function Home() {
  const userId = 'asdffffffffffffffffffffffffff'; // Replace with actual user ID logic
  const todos = await getTodoListAction({ userId });
  console.log('todossssss:', todos);

  return (
    <main className="container">
      <ModeToggle />
      <AddTodoForm todos={todos} userId ={userId} />
      <TodoTable todos={todos} />

    </main>
  );
}
