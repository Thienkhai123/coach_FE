import React from "react";
import * as Icons from "./icons";

interface IconRendererProps {
	iconName: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconName }) => {
	const IconComponent = (Icons as any)[iconName];
	return IconComponent ? <IconComponent /> : null;
};

export default IconRenderer;
