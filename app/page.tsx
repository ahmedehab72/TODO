import { getTodoListAction } from "@/actions/todo.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import TodoTable from "@/components/TodoTable";


export default async function Home() {
  const userId = 'asdffffffffffffffffffffffffff'; // Replace with actual user ID logic
  const todos = await getTodoListAction({ userId });
  console.log('todossssss:', todos);

  return (
    <main className="container *:mx-auto px-24 py-12  ">
      <div className="flex items-center justify-end mb-6">
        <AddTodoForm userId={userId} />
      </div>
      <TodoTable todos={todos} />

    </main>
  );
}
