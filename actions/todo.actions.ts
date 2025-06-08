'use server';
import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

export const getTodoListAction = async ({ userId }: { userId: string | null }) => {
    try {
        const todos = await prisma.todo.findMany({
            where: userId ? {  userId } : undefined,
            orderBy: { createdAt: 'desc' }
        });
        return todos;
    } catch (error) {
        console.error("Error fetching todo list:", error);
        throw error;
    }
}

export const createTodoListAction = async ({
    title,
    body,
    completed,
    userId,
}: {
    title: string;
    body?: string | undefined;
    completed: boolean;
    userId: string | null;
}) => {

    try {
        const todo = await prisma.todo.create({
            data: {
            title,
            body,
            completed,
            userId : userId as string,
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