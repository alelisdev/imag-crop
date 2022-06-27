import React from 'react';
import cn from 'classnames';
import './Button.scss';


export const Button = ({ className, active, children, ...props }) => {
	return (
		<button className={cn('image-editor-button', active && 'image-editor-button--active', className)} {...props}>
			{children}
		</button>
	);
};
