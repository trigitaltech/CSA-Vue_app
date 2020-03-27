import { methods, ServiceMaker } from './index';

const { POST } = methods;

export const create = (accountNo, subCategory, data) => ServiceMaker(`/users/456/1/servicerequest`, POST, data, null);
