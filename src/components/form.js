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


// form components:
const TextInput = ({ name, control, label, rules, icon}) => {
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
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					inputRef={ref}
					error={Boolean(error)}
					label={label}
					color="success"
					margin="dense"
					fullWidth
					InputProps={{
						endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
					}}
				/>
			)}
		/>
	)
};

const PasswordInput = ({name, control, label, rules, type, show, handleClickShowPassword}) => {
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
						error={Boolean(error)}
						>password</InputLabel>
					<OutlinedInput id={`${name}-input`}
						onChange={onChange}
						type={type}
						value={value}
						error={Boolean(error)}
						fullWidth
						margin="dense"
						color="success"
						variant="outlined"
						control={control}
						rules={{ required: true }}
						label={label}
						endAdornment={
						<InputAdornment position="end">
								<IconButton
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