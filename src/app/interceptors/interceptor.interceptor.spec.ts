import { TestBed } from '@angular/core/testing';

import { MyInterceptor } from './interceptor.interceptor';

describe('InterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MyInterceptor = TestBed.inject(MyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
