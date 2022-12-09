import React from "react";
import { TextField,
	IconButton,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl,
	Select,
	MenuItem,
Autocomplete } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Controller, useController } from "react-hook-form";

// form components:
const TextInput = ({ name, control, label, rules, icon, size, type}) => {
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
					type={type}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					inputRef={ref}
					error={invalid}
					// helperText={error.message}
					label={label}
					color="success"
					margin="dense"
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
					margin="dense"
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
						// helperText={error.message}
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
	<MenuItem value={option}>{option}</MenuItem>
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


export { TextInput, PasswordInput, SelectInput }