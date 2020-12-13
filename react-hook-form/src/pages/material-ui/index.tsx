import { useState, useMemo } from "react";
import {
  TextField,
  Typography,
  Button,
  MenuItem,
  Slider,
  makeStyles,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useRendersCount } from "react-use";
import { yupResolver } from "@hookform/resolvers/yup";

import { ValidationSchema } from "../../validation/schema";

const useStyles = makeStyles({
  form: {
    maxWidth: "300px",
  },
});

export function MaterialForm() {
  const { handleSubmit, register, control, errors, reset } = useForm({
    resolver: yupResolver(ValidationSchema),
  });
  const [data, setData] = useState<Record<string, any>>({});
  const stringified = useMemo(() => JSON.stringify(data), [data]);
  const classes = useStyles();
  const count = useRendersCount();

  const submitHandler = handleSubmit((data) => {
    setData(data);
  });

  return (
    <>
      <form noValidate className={classes.form} onSubmit={submitHandler}>
        <Typography variant="h4">Material example</Typography>
        <Typography variant="overline" color="primary">
          Render count: {count}
        </Typography>
        <pre>{stringified}</pre>
        <TextField
          margin="normal"
          required
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          inputRef={register}
          error={errors?.name}
          helperText={errors?.name?.message}
        />
        <TextField
          margin="normal"
          required
          id="email"
          name="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          inputRef={register}
          error={errors?.email}
          helperText={errors?.email?.message}
        />
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={(props) => (
            <TextField
              margin="normal"
              required
              id="gender"
              label="Gender"
              variant="outlined"
              fullWidth
              select
              error={errors?.gender}
              helperText={errors?.gender?.message}
              {...props}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          )}
        ></Controller>
        <Typography gutterBottom>Budget</Typography>
        <Controller
          name="budget"
          defaultValue={0}
          control={control}
          render={({ onChange, ...props }) => (
            <Slider onChange={(_, value) => onChange(value)} {...props} />
          )}
        ></Controller>
        <Typography variant="caption" color="error">
          {errors?.budget?.message}
        </Typography>
        <Button onClick={() => reset()} color="primary" type="reset">
          Clear
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
}
