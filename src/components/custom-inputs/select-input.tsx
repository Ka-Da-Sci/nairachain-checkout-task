'use client';
import {useField} from 'formik';
import { FC, ReactNode } from 'react';

interface SelectInputProps {
    label: string,
    name: string,
    classNamePlus: string,
    placeholder?: string,
    children?: ReactNode,
}

const SelectInput: FC<SelectInputProps> = ({label, children, classNamePlus, ...props}) => {
    
    const [field, meta] = useField(props);

    return (
    <div className={`${classNamePlus ?? ""}`}>
            <label className='max-lg:text-lg max-md:text-base antialiased text-foreground-secondary font-bai_jamjuree font-normal text-xl' htmlFor={props.name}>{label}</label>
            <select className='max-lg:text-base max-md:text-sm max-sm:text-xs bg-background-primary text-foreground-secondary border border-solid border-foreground-secondary-span rounded-lg outline-0 font-bai_jamjuree font-normal text-lg px-4 py-2' {...field} {...props} >{children}</select>
            {meta.touched && meta.error ? (<p className='error' style={{'color': 'red', 'fontSize': '0.75rem'}}>{meta.error}</p>) : null}
        </div>
    )
}

export default SelectInput;