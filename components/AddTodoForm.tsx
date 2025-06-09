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
import { useState } from "react"
import Spinner from "./Spinner"

export function AddTodoForm({ userId }: { userId: string | null }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // Default values for the form
    const defaultValues: TodoFormValue = { title: "", body: "", completed: false };

    // Initialize the form with the schema and default values
    const form = useForm<TodoFormValue>({
        resolver: zodResolver(todoFormSchema),
        defaultValues,
        mode: "onChange",
    });


    const onSubmit = async (data: TodoFormValue) => {
        setLoading(true);
        await createTodoListAction({ title: data.title, body: data.body, completed: data.completed, userId });
        form.reset(defaultValues); // Reset the form after submission
        setLoading(false);
        setOpen(false); // Close the dialog after submission
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                                <FormItem className="my-8">
                                    <FormLabel>Short description</FormLabel>
                                    <FormControl>
                                        <textarea placeholder="Tell us a little bit about yourself" {...field} className="w-full p-2 border rounded" />
                                    </FormControl>
                                    <FormLabel className="text-muted-foreground ">Your can write a short description about your next todo</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="completed"
                            render={({ field }) => (
                                <FormItem >
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="h-4 w-4"
                                            />
                                        </FormControl>
                                        <FormLabel>Completed</FormLabel>
                                        <FormMessage />
                                    </div>

                                    <FormLabel className="text-muted-foreground ">Your to-do item will be uncompleted by default unless you checked it</FormLabel>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">
                                {loading ? <Spinner /> : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
