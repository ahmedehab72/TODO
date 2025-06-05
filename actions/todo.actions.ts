'use server';
import { ITodo } from "@/interfaces";
import { TodoFormValue } from "@/validation";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

export const getTodoListAction = async () => {
    try {
        const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
        return todos;
    } catch (error) {
        console.error("Error fetching todo list:", error);
        throw error;
    }
}

export const createTodoListAction = async ({ title, body, completed, user_id }: TodoFormValue) => {
    try {
        const todo = await prisma.todo.create({
            data: {
                title,
                body,
                completed,
                user_id,
            },
        })
        revalidatePath('/')
        return todo;
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }

};
export const updateTodoListAction = async ({ todo }: { todo: ITodo }) => {
    await prisma.todo.update({
        where: {
            id: todo.id,
        },
        data: {
            title: todo.title,
            body: todo.body,
            completed: todo.completed,
        },
    })
    revalidatePath('/')
}
export const deleteTodoListAction = async ({ id }: { id: string }) => {
    await prisma.todo.delete({
        where: {
            id
        }
    })
    revalidatePath('/')

}