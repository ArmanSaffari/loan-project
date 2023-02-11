import React from "react";
import { TextField,
	IconButton,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl,
	Select,
	MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Controller, useController } from "react-hook-form";
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// form components:
const TextInput = ({ name, control, label, rules, icon, size, type, defaultValue, sx}) => {
	
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({
				field: { onChange, onBlur, value, ref },
				fieldState: { error, invalid },
			}) => (
				<TextField
					defaultValue={(defaultValue) ? defaultValue : ""}
					type={type}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					inputRef={ref}
					error={invalid}
					sx={(sx) ? sx : ""}
					label={label}
					color="success"
					// margin="dense"
					size={size}
					fullWidth
					InputProps={{
						endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
					}}
				/>
			)}
		/>
	)
};

const PasswordInput = ({name, control, label, rules, type, show, handleClickShowPassword, size}) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({
				field: { onChange, onBlur, value, name, ref },
				fieldState: { invalid, error },
			}) => (
				<FormControl
					fullWidth
					// margin="dense"
					>
					<InputLabel htmlFor={`${name}-input`}
						color="success"
						size={size}
						error={Boolean(error)}
						>{label}</InputLabel>
					<OutlinedInput id={`${name}-input`}
						onChange={onChange}
						type={type}
						value={value}
						error={invalid}
						fullWidth
						margin="dense"
						color="success"
						variant="outlined"
						size={size}
						control={control}
						rules={{ required: true }}
						label={label}
						endAdornment={
						<InputAdornment position="end">
								<IconButton
								id={`${name}Show`}
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={(event) => event.preventDefault}
								edge="end"
								>
								{show ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</IconButton>
						</InputAdornment>} />
				</FormControl>
				)}
			/>
	)
};

function SelectInput({ control, name, label, rules, options }) {
	const optionList = options.map((option) =>
	<MenuItem value={option.value}>{option.label}</MenuItem>
	);
  return (
		<Controller
			name={name}
			rules={rules}
			control={control}
			render={({
				field: { onChange, onBlur, value, name, ref },
				fieldState: { invalid, error },
			}) => (
				<FormControl
				fullWidth
				margin="dense"
				size="small"
				color="success"
				error={invalid}
				// helperText={error.message}
				variant="outlined"
				control={control}>
					<InputLabel htmlFor={`${name}-input`}
						color="success"
						size="small"
						error={invalid}
						>{label}</InputLabel>
					<Select
						id={`${name}-input`}
						onChange={onChange}
						value={value}
						label={label}
					>{optionList}</Select>
				</FormControl>
			)}
		/>
  );
}

function NativePickers() {
  return (
    // <Stack 
		// component="form" noValidate spacing={3}>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
				fullWidth
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    // </Stack>
  );
}

export { TextInput, PasswordInput, SelectInput }