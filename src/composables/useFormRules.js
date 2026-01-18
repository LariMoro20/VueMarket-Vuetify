export function useFormRules() {
  const required = (value) => !!value || 'Campo obrigatório!'

  const minLength = (min) => (value) =>
    value?.length >= min || `Mínimo ${min} caracteres`

  const email = (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Informe um email válido.'
  }

  const password = (value) => {
    if (!value) return 'Campo obrigatório!'

    const hasLowerCase = /[a-z]/.test(value)
    const hasUpperCase = /[A-Z]/.test(value)
    const hasNumber = /[0-9]/.test(value)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    const minLen = value.length >= 8

    if (!minLen) return 'Mínimo 8 caracteres'
    if (!hasLowerCase) return 'Deve conter pelo menos uma letra minúscula'
    if (!hasUpperCase) return 'Deve conter pelo menos uma letra maiúscula'
    if (!hasNumber) return 'Deve conter pelo menos um número'
    if (!hasSpecialChar) return 'Deve conter pelo menos um caractere especial'

    return true
  }

  return {
    required,
    minLength,
    email,
    password
  }
}
