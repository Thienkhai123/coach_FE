import React from "react";

interface IButtonProps {
	/** Receive html element  */
	children?: React.ReactNode;
	/** Set background color of button  */
	btnColor?: string;
	/** Set border type of button  */
	borderType?: string;
	/** Set border color of button  */
	borderColor?: string;
	/** Set padding of button  */
	padding?: string;
	/** Set border radius of button  */
	borderRadius?: string;
	/** Set cursor pointer of button  */
	cursor?: string;
	/** Set button decoration type (default: "primary")  */
	type?: IButtonType;
	/** Set button type (default: "button")  */
	actionType?: "button" | "submit";
	/** Set the icon component of button  */
	Icon?: React.ReactNode;
	/** Set text's color  */
	color?: string;
	/** Set text's weight  */
	fontWeight?: string;
	/** Set text's size  */
	fontSize?: string;
	gap?: string;
	/** Set position of icon (default: "start") */
	iconPosition?: "start" | "end";
	/** Disabled state of button */
	disabled?: boolean;
	/** Set the handler to handle click event */
	onClick?: (arg: any) => void;
	/** Set width of button  */
	width?: string;
	/** Set height of button  */
	height?: string;
	/** Redirect url of link button */
	href?: string;
	/** Set position of button's children  */
	position?: string;
	form?: string;
}

type IButtonRenderProps = {
	btnColor?: string;
	borderType?: string;
	borderColor?: string;
	padding?: string;
	borderRadius?: string;
	cursor?: string;
	type?: IButtonType;
	disabled?: boolean;
	width?: string;
	height?: string;
	hover?: string;
	position?: string;
};

type IButtonType = "primary" | "default" | "dashed" | "text" | "link";

type ButtonClassNameType = {
	borderColor: string;
	borderRadius: string;
	borderType: string;
	btnColor: string;
	padding: string;
};

type ITextRenderProps = {
	color?: string;
	fontWeight?: string;
	fontSize?: string;
	type?: IButtonType;
	hover?: string;
};

type TextClassNameType = {
	color: string;
	fontWeight: string;
	fontSize: string;
};

const STYLES = {
	default: {
		button: {
			btnColor: "bg-transparent",
			borderType: "border",
			borderColor: "border-default-borderColor",
			padding: "py-1 px-4",
			borderRadius: "rounded-lg",
			cursor: "cursor-pointer",
			opacity: "opacity-100",
			width: "w-full",
			height: "h-[40px]",
			hover: "group hover:transition hover:duration-300 hover:border-primary",
			position: "flex justify-center items-center",
		},
		text: {
			color: "text-black",
			fontWeight: "font-normal",
			fontSize: "text-sm",
			hover: "group-hover:transition group-hover:duration-300 group-hover:text-primary",
		},
	},
	primary: {
		button: {
			btnColor: "bg-primary-500",
			borderType: "border",
			borderColor: "border-primary-500",
			padding: "py-1 px-4",
			borderRadius: "rounded-full",
			cursor: "cursor-pointer",
			opacity: "opacity-100",
			width: "w-full",
			height: "h-[40px]",
			hover: "hover:opacity-80",
			position: "flex justify-center items-center",
		},
		text: {
			color: "text-white",
			fontWeight: "font-semibold",
			fontSize: "text-base",
			hover: "",
		},
	},
	disabled: {
		button: {
			btnColor: "bg-primary-600",
			borderType: "border",
			borderColor: "border-primary-600",
			padding: "py-1 px-4",
			borderRadius: "rounded-lg",
			cursor: "cursor-not-allowed",
			opacity: "opacity-100",
			width: "w-full",
			height: "h-[40px]",
			hover: "",
			position: "flex justify-center items-center",
		},
		text: {
			color: "text-black",
			fontWeight: "font-semibold",
			fontSize: "text-base",
			hover: "",
		},
	},
	dashed: {
		button: {
			btnColor: "bg-transparent",
			borderType: "border border-dashed",
			borderColor: "border-default-borderColor",
			padding: "py-1 px-4",
			borderRadius: "rounded-lg",
			cursor: "cursor-pointer",
			opacity: "opacity-100",
			width: "w-fit",
			height: "h-auto",
			hover: "group hover:transition hover:duration-300 hover:border-primary",
			position: "",
		},
		text: {
			color: "text-black",
			fontWeight: "font-normal",
			fontSize: "text-sm",
			hover: "group-hover:transition group-hover:duration-300 group-hover:text-primary",
		},
	},
	text: {
		button: {
			btnColor: "bg-transparent",
			borderType: "",
			borderColor: "",
			padding: "py-1 px-4",
			borderRadius: "rounded-lg",
			cursor: "cursor-pointer",
			opacity: "opacity-100",
			width: "w-fit",
			height: "h-auto",
			hover: "group hover:transition hover:duration-300 hover:bg-textButton",
			position: "",
		},
		text: {
			color: "text-black",
			fontWeight: "font-normal",
			fontSize: "text-sm",
			hover: "",
		},
	},
	link: {
		button: {
			btnColor: "bg-transparent",
			borderType: "",
			borderColor: "",
			padding: "py-1 px-4",
			borderRadius: "rounded-lg",
			cursor: "cursor-pointer",
			opacity: "opacity-100",
			width: "w-fit",
			height: "h-auto",
			hover: "group hover:opacity-80",
			position: "",
		},
		text: {
			color: "text-primary",
			fontWeight: "font-normal",
			fontSize: "text-sm",
			hover: "group-hover:transition group-hover:duration-300 group-hover:opacity-80 ",
		},
	},
};

const renderButtonStyle = ({
	btnColor = "",
	borderType = "",
	borderColor = "",
	padding = "",
	borderRadius = "",
	cursor = "",
	type = "primary",
	disabled = false,
	width = "",
	height = "",
	hover = "",
	position = "",
}: IButtonRenderProps) => {
	let stringStyle = "";
	const {
		borderColor: borderColorRoot,
		borderRadius: borderRadiusRoot,
		borderType: borderTypeRoot,
		btnColor: btnColorRoot,
		padding: paddingRoot,
		cursor: cursorRoot,
		opacity,
		width: widthRoot,
		height: heightRoot,
		hover: hoverRoot,
		position: positionRoot,
	} = STYLES[disabled ? "disabled" : type]["button"];
	const thisStyle = {
		btnColor: btnColor || btnColorRoot,
		borderType: borderType || borderTypeRoot,
		borderColor: borderColor || borderColorRoot,
		padding: padding || paddingRoot,
		borderRadius: borderRadius || borderRadiusRoot,
		cursor: cursor || cursorRoot,
		opacity: opacity,
		width: width || widthRoot,
		height: height || heightRoot,
		hover: hover || hoverRoot,
		position: position || positionRoot,
	};

	Object.keys(thisStyle).forEach((keyEl) => {
		const val = thisStyle[keyEl as keyof ButtonClassNameType];
		if (val) {
			stringStyle += `${val} `;
		}
	});

	return stringStyle;
};

const renderTextStyle = ({
	color = "",
	fontSize = "",
	fontWeight = "",
	type = "primary",
	hover = "",
}: ITextRenderProps) => {
	let stringStyle = "";
	const {
		color: colorRoot,
		fontSize: fontSizeRoot,
		fontWeight: fontWeightRoot,
		hover: hoverRoot,
	} = STYLES[type]["text"];
	const thisStyle = {
		color: color || colorRoot,
		fontSize: fontSize || fontSizeRoot,
		fontWeight: fontWeight || fontWeightRoot,
		hover: hoverRoot,
	};

	Object.keys(thisStyle).forEach((keyEl) => {
		const val = thisStyle[keyEl as keyof TextClassNameType];
		if (val) {
			stringStyle += `${val} `;
		}
	});

	return stringStyle;
};

const Button = (props: IButtonProps) => {
	const {
		children,
		Icon,
		gap = "gap-2",
		iconPosition = "end",
		disabled = false,
		onClick = () => {},
		href = "",
		type,
		form,
	} = props;

	if (type === "link") {
		return (
			<button
				disabled={disabled}
				className={renderButtonStyle({ ...props })}
				onClick={onClick}>
				<a href={href || "#"}>
					<div className={`flex items-center ${gap}`}>
						{Icon && iconPosition === "start" ? Icon : <></>}
						<p className={renderTextStyle({ ...props })}>
							{children}
						</p>
						{Icon && iconPosition === "end" ? Icon : <></>}
					</div>
				</a>
			</button>
		);
	}

	return (
		<button
			form={form}
			disabled={disabled}
			className={renderButtonStyle({ ...props })}
			onClick={onClick}>
			<div className={`flex items-center ${gap}`}>
				{Icon && iconPosition === "start" ? Icon : <></>}
				{children && (
					<p className={renderTextStyle({ ...props })}>{children}</p>
				)}
				{Icon && iconPosition === "end" ? Icon : <></>}
			</div>
		</button>
	);
};

export default Button;
