import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const [output, setOutput] = useState("");

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="h-screen bg-zinc-50 flex flex-col gap-10 items-center justify-center">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            className="border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("email")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            {...register("password")}
            className="border-zinc-200 shadow-sm rounded h-10 px-3"
          />
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
