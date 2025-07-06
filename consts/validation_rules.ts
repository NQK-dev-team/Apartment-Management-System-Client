/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RuleObject } from 'ant-design-vue/es/form';
import dayjs, { type Dayjs } from 'dayjs';
// import type { UploadFile } from 'ant-design-vue';
// import { COMMON } from './common';

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
    const birthDate = dayjs(value).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
    const eighteenYearsAgo = dayjs()
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .subtract(18, 'year');

    if (eighteenYearsAgo.isBefore(birthDate)) {
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
  checkSignDate: async (_: RuleObject, value: string, t: any, start_date: string) => {
    if (!value) {
      return Promise.resolve();
    }
    const signDate = dayjs(value).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
    const startDate = dayjs(start_date).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

    if (startDate.isBefore(signDate)) {
      return Promise.reject(t('sign_date_cannot_be_after_start_date'));
    }

    return Promise.resolve();
  },
  checkActiveDate: async (_: RuleObject, value: string, t: any, create_date: string) => {
    if (!value) {
      return Promise.resolve();
    }
    const activeDate = dayjs(value).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
    const createDate = dayjs(create_date).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

    if (activeDate.isBefore(createDate)) {
      return Promise.reject(t('active_date_cannot_be_before_create_date'));
    }

    return Promise.resolve();
  },
  checkEndDate: async (_: RuleObject, value: string, t: any, start_date: string) => {
    if (!value) {
      return Promise.resolve();
    }
    const endDate = dayjs(value).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
    const startDate = dayjs(start_date).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

    if (endDate.isBefore(startDate)) {
      return Promise.reject(t('end_date_cannot_be_before_start_date'));
    }

    return Promise.resolve();
  },
  checkSignDate2: async (_: RuleObject, value: string, t: any, create_date: string) => {
    if (!value) {
      return Promise.resolve();
    }
    const signDate = dayjs(value).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
    const createDate = dayjs(create_date).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

    if (signDate.isBefore(createDate)) {
      return Promise.reject(t('sign_date_cannot_be_before_create_date'));
    }

    return Promise.resolve();
  },
  checkScheduleEndDate: async (_: RuleObject, value: string, t: any, startDate: string | Dayjs | undefined) => {
    if (!value || !startDate) {
      return Promise.resolve();
    }
    const endDate = dayjs(value).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
    const start = dayjs(startDate).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
    if (endDate.isBefore(start)) {
      return Promise.reject(t('schedule_end_date_cannot_be_before_start_date'));
    }

    return Promise.resolve();
  },
  // checkImageFileType: async (_: RuleObject, files: UploadFile[] | string, t: any) => {
  //   if (!files || typeof files === 'string') {
  //     return Promise.resolve();
  //   }

  //   for (const file of files) {
  //     if (isNaN(Number(file.uid))) {
  //       let type = file.type || '';

  //       if (type) {
  //         type = type.split('/')[1] || '';
  //       } else {
  //         type = file.name.split('.').pop() || '';
  //       }

  //       if (COMMON.ALLOW_IMAGE_EXTENSIONS.includes(`.${type}`)) {
  //         return Promise.resolve();
  //       } else {
  //         return Promise.reject(t('invalid_image_file_type'));
  //       }
  //     }
  //   }

  //   return Promise.resolve();
  // },
  // checkContractFileType: async (_: RuleObject, files: UploadFile[] | string, t: any) => {
  //   if (!files || typeof files === 'string') {
  //     return Promise.resolve();
  //   }

  //   for (const file of files) {
  //     if (isNaN(Number(file.uid))) {
  //       let type = file.type || '';

  //       if (type) {
  //         type = type.split('/')[1] || '';
  //       } else {
  //         type = file.name.split('.').pop() || '';
  //       }

  //       if (COMMON.ALLOW_FILE_EXTENSIONS.includes(`.${type}`)) {
  //         return Promise.resolve();
  //       } else {
  //         return Promise.reject(t('invalid_contract_file_type'));
  //       }
  //     }
  //   }

  //   return Promise.resolve();
  // },
};

export { validationRules };
