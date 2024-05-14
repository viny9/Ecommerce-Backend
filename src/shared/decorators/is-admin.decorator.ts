import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'projecRole';
export const IsAdmin = () => SetMetadata(IS_ADMIN_KEY, true);
