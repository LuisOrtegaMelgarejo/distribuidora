import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function appendAuthForApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const reqWithHeader = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + (localStorage.getItem('token') ?? '')),
    });
  return next(reqWithHeader);
}