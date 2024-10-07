import CheckIcon from "@/components/icons/check";
import { useState } from "react";

interface IInputCheckboxDesktop {
	register: any;
	className?: string;
	wrapperStyle?: string;
	name: string;
	placeholder: string;
	errors: any;
	watch: any;
	value: string;
}

const InputCheckboxDesktop = (props: IInputCheckboxDesktop) => {
	const {
		register,
		className = "rounded-[4px] border border-[#9095A1] h-0 opacity-0",
		wrapperStyle = "w-full",
		name,
		placeholder,
		errors,
		watch,
		value,
	} = props;
	const val = watch(name) || [];
	return (
		<div className={wrapperStyle}>
			<label>
				<div className='flex gap-4'>
					<label className='group flex items-center gap-3 py-2'>
						<div className=' relative w-fit h-fit'>
							<input
								type='checkbox'
								value={value}
								// rules={{
								// 	validate: (value: boolean) => value
								// }}
								{...register(name)}
								className='appearance-none block w-5 h-5 accent-button bg-white border peer checked:bg-secondary-300 border-neutral-500 checked:border-none rounded'
							/>
							<div className='absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100'>
								<CheckIcon
								// width='12'
								// height='12'
								// viewBox='0 0 12 12'
								/>
							</div>
						</div>
						<p className='text-sm font-normal  text-neutral-grey-700'>
							{placeholder}
						</p>
					</label>
				</div>
			</label>
			{errors[name] && (
				<p className='text-red-500 text-p12'>{errors[name]?.message}</p>
			)}
		</div>
	);
};

export default InputCheckboxDesktop;
