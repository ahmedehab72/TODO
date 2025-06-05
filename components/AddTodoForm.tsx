"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { todoFormSchema, TodoFormValue } from "@/validation"
import { createTodoListAction } from "@/actions/todo.actions"
import { Checkbox } from "./ui/checkbox"

export function AddTodoForm() {

    // Default values for the form
    const defaultValues: TodoFormValue = { title: "", body: "", completed: false };

    // Initialize the form with the schema and default values
    const form = useForm<TodoFormValue>({
        resolver: zodResolver(todoFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const onSubmit = async (data: TodoFormValue) => {
        console.log("Submitted Data:", data)
        await createTodoListAction({ title: data.title, body: data.body, completed: data.completed });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus size={15} />
                    New Todo
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Todo</DialogTitle>
                    <DialogDescription>Add your todo title and description.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Body</FormLabel>
                                    <FormControl>
                                        <textarea placeholder="Todo body" {...field} className="w-full p-2 border rounded" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="completed"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="h-4 w-4"
                                        />
                                    </FormControl>
                                    <FormLabel>Completed</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
