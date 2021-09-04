import { IGuestInfoComponent } from "./../../../models/IGuestInfoComponent";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

import { useForm, Controller } from "react-hook-form";
import { IFormInterface } from "./../../../models/IFormInterface";
import FormHelperText from "@material-ui/core/FormHelperText";

export function GuestInfoComponent(props: IGuestInfoComponent) {
  const { control, handleSubmit } = useForm();
  const { updateInformation } = props;

  const formSubmitionHandler = (data: IFormInterface) => {
    if (data) updateInformation(data);
  };

  return (
    <>
      <h5>Please fill out the following information</h5>
      <form onSubmit={handleSubmit(formSubmitionHandler)}>
        <div className="form__input-fields">
          <Controller
            name="firstName"
            rules={{
              required: true,
              min: 2,
              max: 15,
            }}
            control={control}
            render={({ field: { onChange }, fieldState: { invalid } }) => (
              <TextField
                required
                type="text"
                onChange={onChange}
                label="First Name"
                variant="outlined"
                error={invalid}
                fullWidth
                helperText={
                  invalid && "First name must be between 2-15 characters long"
                }
              />
            )}
          />
          <Controller
            name="lastName"
            rules={{
              required: true,
              min: 2,
              max: 15,
            }}
            control={control}
            render={({ field: { onChange }, fieldState: { invalid } }) => (
              <TextField
                required
                name="lastName"
                label="Last Name"
                variant="outlined"
                onChange={onChange}
                error={invalid}
                fullWidth
                helperText={
                  invalid && "Last name must be between 2-15 characters long"
                }
              />
            )}
          />
          <Controller
            name="email"
            rules={{
              required: true,
              pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            }}
            control={control}
            render={({
              field: { onChange },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="Email"
                variant="outlined"
                onChange={onChange}
                error={invalid}
                fullWidth
                helperText={invalid && "Please enter a valid email adress"}
              />
            )}
          />
          <Controller
            name="number"
            control={control}
            rules={{
              required: true,
              pattern:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            }}
            render={({ field: { onChange }, fieldState: { invalid } }) => (
              <TextField
                required
                name="number"
                label="Phone Number"
                variant="outlined"
                error={invalid}
                fullWidth
                helperText={invalid && "Please enter a valid phone number"}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="form-submit">
          <Controller
            name="acceptedGDPR"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange }, fieldState: { invalid } }) => (
              <FormControl error={invalid}>
                <FormControlLabel
                  control={<Checkbox onChange={onChange} color="primary" />}
                  label={
                    <p>
                      I have read and agree to the terms of{" "}
                      <a href="https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/lag-2018218-med-kompletterande-bestammelser_sfs-2018-218">
                        GDPR
                      </a>
                      .
                    </p>
                  }
                />

                <FormHelperText>
                  {invalid && "Please check this box to continue"}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Button type="submit" variant="contained">
            Make reservation
          </Button>
        </div>
      </form>
    </>
  );
}
