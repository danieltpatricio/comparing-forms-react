import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRendersCount } from "react-use";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";

import { ValidationSchema } from "../../validation/schema";
import "./index.css";

export function NakedForm() {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(ValidationSchema),
  });
  const [data, setData] = useState<Record<string, any>>({});
  const stringified = useMemo(() => JSON.stringify(data), [data]);
  const count = useRendersCount();

  const submitHandler = handleSubmit((data) => {
    setData(data);
  });

  return (
    <>
      <form noValidate className="form" onSubmit={submitHandler}>
        <h1>Naked example</h1>
        <p className="count">Render count: {count}</p>
        <pre>{stringified}</pre>
        <div className={clsx("group", errors?.name && "error")}>
          <label htmlFor="name">Nome</label>
          <input required id="name" name="name" ref={register} />
          <span>{errors?.name?.message}</span>
        </div>
        <div className={clsx("group", errors?.email && "error")}>
          <label htmlFor="email">E-mail</label>
          <input required id="email" name="email" ref={register} />
          <span>{errors?.email?.message}</span>
        </div>
        <div className={clsx("group", errors?.gender && "error")}>
          <label htmlFor="gender">Gender</label>
          <select required id="gender" name="gender" ref={register}>
            <option value="" hidden>
              Select a Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <span>{errors?.gender?.message}</span>
        </div>
        <div className={clsx("group", errors?.budget && "error")}>
          <label htmlFor="budget">Budget</label>
          <input
            type="range"
            required
            id="budget"
            name="budget"
            defaultValue={0}
            ref={register({ valueAsNumber: true })}
          />
          <span>{errors?.budget?.message}</span>
        </div>
        <button type="reset">Clear</button>{" "}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
