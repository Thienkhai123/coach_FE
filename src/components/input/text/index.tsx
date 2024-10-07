import EyeOffIcon from "@/components/icons/eyeOff";
import EyeOnIcon from "@/components/icons/eyeOn";
import { useState } from "react";

interface IInputTextProps {
	name: string;
	title?: string;
	register?: any;
	errors?: any;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	maxLength?: number;
	type?: string;
	showError?: boolean;
}

const InputText = (props: IInputTextProps) => {
	const {
		errors,
		name,
		title,
		register,
		type = "text",
		required = false,
		disabled = false,
		showError = true,
		placeholder = "Placeholder/Input text",
		maxLength = 255,
	} = props;
	const [visible, setVisible] = useState(false);

	if (type === "password") {
		return (
			<div className='w-full'>
				{title && (
					<p className='text-sm font-semibold text-neutral-grey-700 mb-1'>
						{title}{" "}
						{required && (
							<span className='text-semantic-red'>*</span>
						)}
					</p>
				)}
				<div className='relative w-full '>
					<input
						className='border border-neutral-grey-300 py-2 px-3 rounded-lg w-full'
						placeholder={placeholder}
						id={name}
						type={visible ? "text" : "password"}
						disabled={disabled}
						{...register(name)}
					/>
					<div
						className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3'
						onClick={() => setVisible(!visible)}>
						{visible ? (
							<EyeOffIcon fill='#646769' />
						) : (
							<EyeOnIcon fill='#646769' />
						)}
					</div>
					{/* text-xs font-normal leading-[18px] */}
				</div>
				{showError && errors[name]?.message && (
					<p className='sm:text-sm text-xs leading-5 text-red-500'>
						{errors[name]?.message}
					</p>
				)}
			</div>
		);
	}
	return (
		<div className='w-full'>
			{title && (
				<p className='text-sm font-semibold text-neutral-grey-700 mb-1'>
					{title}{" "}
					{required && <span className='text-semantic-red'>*</span>}
				</p>
			)}
			<input
				className='border border-neutral-grey-300 py-2 px-3 rounded-lg w-full'
				placeholder={placeholder}
				disabled={disabled}
				maxLength={maxLength}
				{...register(name)}
			/>
			{showError && errors[name]?.message && (
				<p className='sm:text-sm text-xs leading-5 text-red-500'>
					{errors[name]?.message}
				</p>
			)}
		</div>
	);
};

export default InputText;
