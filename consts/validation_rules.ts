/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RuleObject } from 'ant-design-vue/es/form';
import dayjs, { type Dayjs } from 'dayjs';
import type { UploadFile } from 'ant-design-vue';
import { COMMON } from './common';

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
  emptyResidentRelationship: async (_: RuleObject, value: number, t: any) => {
    if (!value) {
      return Promise.reject(t('please_select_owner_relationship'));
    }
    return Promise.resolve();
  },
  checkSignDate: async (_: RuleObject, value: string, t: any) => {
    if (!value) {
      return Promise.resolve();
    }
    const signDate = dayjs(value);
    const today = dayjs();

    if (signDate.isAfter(today)) {
      return Promise.reject(t('sign_date_cannot_be_future'));
    }

    return Promise.resolve();
  },
  checkImageFileType: async (_: RuleObject, files: UploadFile[] | string, t: any) => {
    console.log(files);
    if (!files || typeof files === 'string') {
      return Promise.resolve();
    }

    for (const file of files) {
      if (isNaN(Number(file.uid))) {
        let type = file.type || '';

        if (type) {
          type = type.split('/')[1] || '';
        } else {
          type = file.name.split('.').pop() || '';
        }

        if (COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
          return Promise.resolve();
        } else {
          return Promise.reject(t('invalid_image_file_type'));
        }
      }
    }

    return Promise.resolve();
  },
  checkContractFileType: async (_: RuleObject, files: UploadFile[] | string, t: any) => {
    if (!files || typeof files === 'string') {
      return Promise.resolve();
    }

    for (const file of files) {
      if (isNaN(Number(file.uid))) {
        let type = file.type || '';

        if (type) {
          type = type.split('/')[1] || '';
        } else {
          type = file.name.split('.').pop() || '';
        }

        if (COMMON.ALLOW_FILE_EXTENSIONS.includes(`.${type}`)) {
          return Promise.resolve();
        } else {
          return Promise.reject(t('invalid_contract_file_type'));
        }
      }
    }

    return Promise.resolve();
  },
};

export { validationRules };
