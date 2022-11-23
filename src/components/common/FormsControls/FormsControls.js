import s from './FormsControls.module.css';

const FormControl = ({ input, meta, child, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <div>
        {props.children}
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )
}

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

// .learn formik

// import React, { FC } from 'react';
// import { WrappedFieldProps } from 'redux-form';
// import s from './FormsControls.module.css';

// type FormControlPropsType = {
//   meta: {
//     touched: boolean
//     error: string
//   }
//   children: React.ReactNode
// }

// const FormControl: React.FC<FormControlPropsType> = ({ meta: {touched, error}, children }) => {
//   const hasError = touched && error;
//   return (
//     <div className= { s.formControl + " " + (hasError ? s.error : "") } >
//     <div>
//     { children }
//     < /div>
//   {
//     hasError && <span>{ error } < /span>}
//     < /div>
//   )
// }



// export const Textarea: React.FC<WrappedFieldProps> = (props) => {
//   const { input, meta, child, ...restProps } = props;
//   return <FormControl { ...props } > <textarea { ...input } {...restProps } /></FormControl >
// }

// export const Input = (props) => {
//   const { input, meta, child, ...restProps } = props;
//   return <FormControl { ...props } > <input { ...input } {...restProps } /></FormControl >
// }