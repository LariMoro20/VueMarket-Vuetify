export const successResponse = (data, status = 200) => ({
  data,
  success: !!(data && (Array.isArray(data) ? data.length > 0 : true)),
  status,
  message: null,
})

export const errorResponse = (err, defaultMsg) => ({
  data: false,
  success: false,
  status: err?.response?.status || err?.code || 400,
  message: err?.response?.data?.message || err?.message || defaultMsg,
})
