import { getTodoListAction } from "@/actions/todo.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import TodoTable from "@/components/TodoTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {
  const cookieStore = cookies();
  const userId = (await cookieStore).get('userId')?.value;
  if (!userId) {
    redirect('/sign-in');
  }

  const todos = await getTodoListAction({ userId });
  return (
    <main className="">
      <section className="px-4 md:px-24 py-12 mx-auto">
        <div className="flex items-center justify-end mb-6">
          <AddTodoForm userId={userId} />
        </div>
        <TodoTable todos={todos} />
      </section>
    </main>
  );
}
