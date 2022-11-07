import { InputHTMLAttributes, useState } from 'react'
import { useAppSelector } from '../../../store/hooks'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string
  labelName: string
  styles?: string
  isPassword?: boolean
  stylesLabel?: string
}
export const Input = ({
  styles,
  htmlFor,
  labelName,
  isPassword,
  stylesLabel,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const registerValues = useAppSelector((state) => state.armazem.registerValues)

  return (
    <div className={style.fieldContainer}>
      <label htmlFor={htmlFor} className={`${style.label} ${stylesLabel && stylesLabel}`}>
        {labelName}
      </label>
      {isPassword ? (
        <input
          {...props}
          className={`${style.input} ${styles && styles}`}
          type={showPassword ? 'text' : 'password'}
        />
      ) : (
        <input {...props} className={`${style.input} ${styles && styles}`} />
      )}

      {isPassword && (
        <>
          {registerValues.password.trim() && (
            <>
              {showPassword ? (
                <i
                  onClick={() => setShowPassword(false)}
                  className={password.openEye}
                />
              ) : (
                <i
                  onClick={() => setShowPassword(true)}
                  className={password.closeEye}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

const style = {
  fieldContainer: `w-full relative`,
  label: `text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold`,
  input: `w-full p-4 mt-4 bg-white dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg`,
}

const password = {
  openEye: `ri-eye-2-line text-lg cursor-pointer absolute right-4 top-[58%] translate-y-[-20%] p-1 text-dusk-main dark:text-dawn-main`,
  closeEye: `ri-eye-close-line text-lg cursor-pointer absolute right-4 top-[58%] translate-y-[-20%] p-1 text-dusk-main dark:text-dawn-main`,
}
