/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RuleObject } from 'ant-design-vue/es/form';
import dayjs, { type Dayjs } from 'dayjs';

const validationRules = {
  password: async (_: RuleObject, value: string, t: any) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;
    if (value) {
      if (passwordRegex.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject(t('password_format_error'));
      }
    } else {
      return Promise.resolve();
    }
  },
  confirmPasswordMatch: async (_: RuleObject, value: string, newPassword: string, t: any) => {
    if (value && value !== newPassword) {
      return Promise.reject(t('confirm_new_password_not_match'));
    }
    return Promise.resolve();
  },
  dateOfBirth: async (_: RuleObject, value: Dayjs | string, t: any, isCustomer: boolean = false) => {
    if (!value) {
      return Promise.resolve();
    }
    const birthDate = dayjs(value);
    const eighteenYearsAgo = dayjs().subtract(18, 'year');

    if (birthDate.isAfter(eighteenYearsAgo)) {
      if (!isCustomer) {
        return Promise.reject(t('staff_must_be_18_years_old'));
      } else {
        return Promise.reject(t('customer_must_be_18_years_old'));
      }
    }

    return Promise.resolve();
  },
  roomArea: async (_: RuleObject, value: string, t: any) => {
    if (value && Number(value) <= 0) {
      return Promise.reject(t('zero_room_area'));
    } else {
      return Promise.resolve();
    }
  },
};

export { validationRules };
