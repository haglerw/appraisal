import { HttpParams } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';

export class Getserverdatasource extends ServerDataSource {

  protected requestElements(): Observable<any> {
    const params = new HttpParams()
        .set('page', this.pagingConf['page'] + (-1))
        .set('size', this.pagingConf['perPage']);

    return this.http.get(this.conf.endPoint, {params, observe: 'response'});
  }

  protected addPagerRequestParams(httpParams: HttpParams): HttpParams {
    if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
      httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf['page'] + (-1));
      httpParams = httpParams.set(this.conf.pagerLimitKey, this.pagingConf['perPage']);
    }

    return httpParams;
  }
}
