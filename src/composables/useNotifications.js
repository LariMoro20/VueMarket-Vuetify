const show = ref(false)
const message = ref('')
const color = ref('success')
const timeout = ref(5000)

export function useNotifications() {
  const notifySuccess = (msg, duration = 5000) => {
    message.value = msg;
    timeout.value = duration
    color.value = 'success'
    show.value = true
  }
  const notifyError = (msg, duration = 5000) => {
    message.value = msg;
    timeout.value = duration
    color.value = 'error'
    show.value = true
  }
  const notifyAlert = (msg, duration = 5000) => {
    message.value = msg;
    timeout.value = duration
    color.value = 'alert'
    show.value = true
  }

  return { notifySuccess, notifyError, notifyAlert, show, message, color, timeout }
}
