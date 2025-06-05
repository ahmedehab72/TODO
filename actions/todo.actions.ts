'use server';
import { TodoFormValue } from "@/validation";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

export const getTodoListAction = async () => {
    try {
        const todos = await prisma.todo.findMany();
        return todos;
    } catch (error) {
        console.error("Error fetching todo list:", error);
        throw error;
    }
}

export const createTodoListAction = async ({ title, body, completed }: TodoFormValue) => {
    try {
        const todo = await prisma.todo.create({
            data: {
                title,
                body,
                completed,
            },
        })
        revalidatePath('/')
        return todo;
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }

};
export const updateTodoListAction = async () => { }
export const deleteTodoListAction = async ({ id }: { id: string }) => {
    await prisma.todo.delete({
        where: {
            id
        }
    })
    revalidatePath('/')

}