import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskCombo } from "./TaskCombo";

const FormDialog = () => {
  const FormSchema = z.object({
    title: z.string().min(5, {
      message: "Title must be at least 5 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    status: z.string().min(4, {
      message: "Please choose the task status",
    }),
    start: z.string().min(10, {
      message: "Start Date should be today or after today.",
    }),
    end: z.string().min(10, {
      message: "End Date should be today or after Start Date.",
    }),
  });

  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const inputFields = [
    {
      name: "title",
      label: "Title",
      placeholder: "Enter the title of this todo item.",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Tell us a little bit about yourself",
      type: "textarea",
    },
  ];
  const dateFields = [
    {
      name: "start",
      label: "Start Date",
      placeholder: "Start Date",
      type: "datetime-local",
    },
    {
      name: "end",
      label: "End Date",
      placeholder: "End Date",
      type: "datetime-local",
    },
  ];
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-6"
          >
            {inputFields.map((fieldItem, index) => (
              <FormField
                key={index}
                control={form.control}
                name={fieldItem.name}
                render={({ field }) => (
                  <FormItem className="flex justify-start flex-col items-start">
                    <FormLabel>{fieldItem.label}</FormLabel>
                    <FormControl>
                      {fieldItem.type === "textarea" ? (
                        <Textarea
                          placeholder={fieldItem.placeholder}
                          className="resize-none w-full"
                          {...field}
                        />
                      ) : (
                        <Input
                          type={fieldItem.type}
                          placeholder={fieldItem.placeholder}
                          className="w-full"
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <TaskCombo form={form} />
            <div className="flex gap-x-3">
              {dateFields.map((dateField, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={dateField.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dateField.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={dateField.type}
                          placeholder={dateField.placeholder}
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
};

export default FormDialog;
