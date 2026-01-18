export function useFormRules() {
  const required = (value) =>
    !!value || 'Campo obrigatório!'

  const minLength = (min) => (value) =>
    value?.length >= min || `Mínimo ${min} caracteres`

  const email = (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return pattern.test(value) || 'Informe um email válido.'
  }

  return {
    required,
    minLength,
    email,
  }
}
