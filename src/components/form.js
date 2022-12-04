import React from "react";
import { TextField,
	IconButton,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Controller } from "react-hook-form";
import { type } from "@testing-library/user-event/dist/type";


// form components:
const TextInput = ({ name, control, label, rules, icon, size, type}) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({
				field: { onChange, onBlur, value, name, ref },
				fieldState: { isTouched, isDirty, error },
			}) => (
				<TextField
					type={type}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					inputRef={ref}
					error={Boolean(error)}
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
				fieldState: { isTouched, isDirty, error },
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
						error={Boolean(error)}
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

export { TextInput, PasswordInput }