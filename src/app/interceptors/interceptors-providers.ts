import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';

export const INTERCEPTORS_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
];
