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
import { useTranslations } from "next-intl"

export function AddTodoForm({ userId }: { userId: string | null }) {
    const t = useTranslations()
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
                    {t("AddForm.NewTodo")}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("AddForm.NewTodo")}</DialogTitle>
                    <DialogDescription>{t("AddForm.AddTitleDescription")}</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("AddForm.Title")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("AddForm.titlePlaceholder")} {...field} />
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
                                    <FormLabel>{t("AddForm.Description")}</FormLabel>
                                    <FormControl>
                                        <textarea placeholder={t("AddForm.descPlaceholder")} {...field} className="w-full p-2 border rounded" />
                                    </FormControl>
                                    <FormLabel className="text-muted-foreground ">{t("AddForm.descDesc")}</FormLabel>
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
                                        <FormLabel>{t("AddForm.completed")}</FormLabel>
                                        <FormMessage />
                                    </div>

                                    <FormLabel className="text-muted-foreground ">{t("AddForm.descCompleted")}</FormLabel>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">{t("cancel")}</Button>
                            </DialogClose>
                            <Button type="submit">
                                {loading ? <Spinner /> : t("save")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
