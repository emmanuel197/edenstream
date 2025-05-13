export const generateOTPAPI = () => {
  const storedSelectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
  return `https://tvanywhereonline.com/cm/api/otp/?operator_uid=${storedSelectedOperator.operator_uid}&mode=generate`
}

export const validateOTPAPI = () => {
  const storedSelectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
  return `https://tvanywhereonline.com/cm/api/otp/?operator_uid=${storedSelectedOperator.operator_uid}&mode=validate`
}

export const signUpAPI = () => {
  const storedSelectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
  return `https://tvanywhereonline.com/cm/api/subscriber/?operator_uid=${storedSelectedOperator.operator_uid}`
}

export const loginAPI = 'https://ott.tvanywhereafrica.com:28182/api/client/v1/global/login'

export const logAPI = () => {
  const storedSelectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
  return `https://tvanywhereonline.com/cm/api/logs/?operator_uid=${storedSelectedOperator ? storedSelectedOperator.operator_uid : process.env.REACT_APP_DEFAULT_OPERATOR}`
}

export const fetchUserAPI = () => {
  return `https://tvanywhereonline.com/cm/api/subscriber/?limit=30`
}

export const resetPasswordAPI = () => {
  return `https://tvanywhereonline.com/cm/api/subscriber/?`
}