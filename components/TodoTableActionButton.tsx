'use client'
import { Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { deleteTodoListAction } from "@/actions/todo.actions";
import { useState } from "react";

const TodoTableActionButton = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Button variant="ghost">
                <Pen size={16} />
            </Button>
            <Button variant="destructive" onClick={async () => {
                setLoading(true);
                await deleteTodoListAction({ id })
                setLoading(false);
            }}>

                {loading ? <Spinner /> : <Trash size={16} />}
            </Button>
        </>
    )
}

export default TodoTableActionButton