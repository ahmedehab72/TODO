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
import { useTranslations } from "next-intl";


export default function TodoTable({ todos }: { todos: ITodo[] }) {
    const t = useTranslations()
    return (
        <Table>
            <TableCaption>{t("todoTable.listRecent")}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">{t("todoTable.number")}</TableHead>
                    <TableHead>{t("todoTable.title")}</TableHead>
                    <TableHead>{t("todoTable.completed")}</TableHead>
                    <TableHead className="text-right">{t("todoTable.actions")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todos.map((todo) => (
                    <TableRow key={todo.id}>
                        <TableCell className="font-medium">{todos.indexOf(todo) + 1}</TableCell>
                        <TableCell>{todo.title}</TableCell>
                        <TableCell>{todo.completed ? <Badge>{t("todoTable.completed")}</Badge> : <Badge variant={"secondary"}>{t("todoTable.uncompleted")}</Badge>}</TableCell>
                        <TableCell className="flex justify-end space-x-2">
                            <TodoTableActionButton todo={todo} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>{t("todoTable.total")}</TableCell>
                    <TableCell className="text-right">{todos.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
