import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ITodo } from "@/interfaces";
import { Badge } from "./ui/badge";
import TodoTableActionButton from "./TodoTableActionButton";


export default function TodoTable({ todos }: { todos: ITodo[] }) {
    return (
        <Table>
            <TableCaption>A list of your recent Todos.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todos.map((todo) => (
                    <TableRow key={todo.id}>
                        <TableCell className="font-medium">{todo.id}</TableCell>
                        <TableCell>{todo.title}</TableCell>
                        <TableCell>{todo.completed ? <Badge>Completed</Badge> : <Badge variant={"secondary"}>UnCompleted</Badge>}</TableCell>
                        <TableCell className="flex justify-end space-x-2">
                            <TodoTableActionButton todo= {todo} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{todos.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
