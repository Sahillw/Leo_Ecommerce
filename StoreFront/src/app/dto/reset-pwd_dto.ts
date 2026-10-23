export interface ResetPwdDto {
  email: string;
  oldPwd?: string;
  newPwd?: string;
  confirmPwd?: string;
}
