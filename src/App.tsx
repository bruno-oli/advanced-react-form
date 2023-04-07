import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório!")
    .transform((name) =>
      name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ")
    ),
  email: z
    .string()
    .nonempty("O E-mail é obrigatorio!")
    .email("Formato de email invalido!")
    .endsWith(
      "@rocketseat.com",
      "O email precisa terminar com @rocketseat.com"
    ),
  /*.refine((email) => {
      return email.endsWith("@rocketseat.com");
    }, "O Email precisa terminar com @rocketseat.com"), */
  password: z
    .string()
    .nonempty("A senha é obrigatoria!")
    .min(6, "A senha precisa de no minimo 6 caracteries!"),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("O titulo é obrigatorio"),
        knowledge: z.coerce
          .number()
          .min(1, "O valor minimo é 1")
          .max(100, "O valor maximo é 100"),
      })
    )
    .min(2, "Insira ao menos 2 tecnologias!"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  const [output, setOutput] = useState("");

  function addNewTech() {
    append({ title: "", knowledge: 0 });
  }

  function createUser(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="min-h-screen py-10 bg-zinc-50 flex flex-col gap-10 items-center justify-center">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            className="border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            {...register("password")}
            className="border-zinc-200 shadow-sm rounded h-10 px-3"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="flex items-center justify-between">
            Tecnologias
            <button
              type="button"
              onClick={addNewTech}
              className="text-emerald-500 text-sm"
            >
              Adicionar
            </button>
          </label>
          {fields.map((field, index) => {
            return (
              <div className="flex gap-2" key={field.id}>
                <div className="flex flex-1 flex-col gap-1">
                  <input
                    type="text"
                    {...register(`techs.${index}.title`)}
                    className="border-zinc-200 shadow-sm rounded h-10 px-3"
                  />
                  {errors.techs?.[index]?.title && (
                    <span className="text-red-500 text-sm">
                      {errors.techs?.[index]?.title?.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <input
                    type="number"
                    {...register(`techs.${index}.knowledge`)}
                    className="border-zinc-200 w-16 shadow-sm rounded h-10 px-3"
                  />
                  {errors.techs?.[index]?.knowledge && (
                    <span className="text-red-500 text-sm">
                      {errors.techs?.[index]?.knowledge?.message}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {errors.techs && (
            <span className="text-red-500 text-sm">{errors.techs.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Salvar
        </button>
      </form>
      <pre>{output}</pre>
    </main>
  );
}

export default App;
