import { methods, ServiceMaker } from './index';

const { POST } = methods;

export const verify = data => ServiceMaker(`/verifyuser`, POST, data, null);