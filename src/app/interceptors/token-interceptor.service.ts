import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = window.localStorage.getItem('_token');
			req = req.clone({
				setHeaders: {
					authorization: `Bearer ${token}`
				},
			});

		return next.handle(req);
	}
}
