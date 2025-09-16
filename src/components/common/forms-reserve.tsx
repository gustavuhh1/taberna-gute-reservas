"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({
      error: "O nome é obrigatório.",
    })
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .max(50, { message: "O nome não pode exceder 50 caracteres." }),
  email: z.email({ error: "Por favor, insira um e-mail válido." }),
  phone: z
    .string()
    .min(9)
    .max(12)
    .refine(
      (phone) => {
        const justDigits = phone.replace(/\D/g, "");
        return justDigits.length >= 10 && justDigits.length <= 11;
      },
      { message: "Número de telefone inválido. Inclua o DDD." }
    ),
  date: z.date().min(new Date(), { error: "Selecione uma data válida." }),
  numberPeople: z.number().min(1).max(50),
  hour: z.string(),
  specialRequests: z
    .string()
    .max(500, { message: "O limite é de 500 caracteres." })
    .nullable(),
});

//11:30 , 15
const FormsReserve = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: new Date(),
      hour: "11",
      numberPeople: 1,
      specialRequests: "",
    },
  });

  

  return <></>;
};
