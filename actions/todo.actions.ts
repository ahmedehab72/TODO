'use server';
import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()


export const getTodoListAction = async ({ userId }: { userId: string | null }): Promise<Array<ITodo>> => {
    try {
        return await prisma.todo.findMany({
            where: {
                userId: userId as string,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        throw new Error("Something went wrong");
    }
};


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
}): Promise<void> => {
    try {
        await prisma.todo.create({
            data: {
                title,
                body,
                completed,
                userId: userId as string, // Ensure userId is not null,
            },
        });

        revalidatePath("/");
    } catch (error) {
        throw new Error("Something went wrong");
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