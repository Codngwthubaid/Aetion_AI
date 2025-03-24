"use client"
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>,
    name: Path<T>,
    placeholder?: string,
    label?: string,
    type?: "text" | "email" | "password" | "file"
}

export default function FormField<T extends FieldValues>({ control, name, placeholder, label, type = "text" }: FormFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel className="label">{label}</FormLabel>}
                    <FormControl>
                        <Input className="input" placeholder={placeholder} type={type} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

