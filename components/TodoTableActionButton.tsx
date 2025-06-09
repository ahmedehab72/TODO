'use client'
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { deleteTodoListAction } from "@/actions/todo.actions";
import { useState } from "react";
import { ITodo } from "@/interfaces";
import { EditTodoForm } from "./EditTodoForm";

const TodoTableActionButton = ({ todo }: { todo: ITodo }) => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <EditTodoForm todo={todo} />
            <Button variant="destructive" onClick={async () => {
                setLoading(true);
                if (todo?.id) {
                    await deleteTodoListAction({ id: todo.id });
                }
                setLoading(false);
            }}>

                {loading ? <Spinner /> : <Trash size={16} />}
            </Button>
        </>
    )
}

export default TodoTableActionButton