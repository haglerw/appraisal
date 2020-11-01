import { ServerDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export class Postserverdatasource extends ServerDataSource {

  protected requestElements(): Observable<any> {
    const params = new HttpParams()
        .set('page', this.pagingConf['page'] + (-1))
        .set('size', this.pagingConf['perPage']);

    return this.http.post(this.conf.endPoint, '', { params, headers: this.generateHeaders(), observe: 'response' });
  }

  protected generateHeaders() {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  protected addPagerRequestParams(httpParams: HttpParams): HttpParams {
    if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
      httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf['page'] + (-1));
      httpParams = httpParams.set(this.conf.pagerLimitKey, this.pagingConf['perPage']);
    }

    return httpParams;
  }

}
