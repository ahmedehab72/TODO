import { getTodoListAction } from "@/actions/todo.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ModeToggle";
import TodoTable from "@/components/TodoTable";


export default async function Home() {
  const todos = await getTodoListAction();
  return (
    <main className="container">
      <ModeToggle />
      <AddTodoForm />
      <TodoTable todos={todos} />

    </main>
  );
}
