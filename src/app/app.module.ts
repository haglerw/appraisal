import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'angular-calendar';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from './theme/pipes/pipes.module';

import { routing } from './app.routing';
import { AppSettings } from './app.settings';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './theme/components/header/header.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from './theme/components/back-top/back-top.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { SideChatComponent } from './theme/components/side-chat/side-chat.component';
import { FavoritesComponent } from './theme/components/favorites/favorites.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ErrorInterceptor } from './shared/helpers';
import { JwtInterceptor } from './shared/helpers';
import { DatePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    PerfectScrollbarModule,
    SharedModule,
    NgbModule,
    MultiselectDropdownModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyBLa1mRYCbDL0o8qRC14A7sS4VnLB6enPE',
     libraries: ['geometry', 'places']
    }),
    CalendarModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    PipesModule,
    routing,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    Daterangepicker
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    BackTopComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FlagsMenuComponent,
    SideChatComponent,
    FavoritesComponent,
    SearchComponent,
    NotFoundComponent
  ],
  providers: [
    TitleCasePipe,
    DaterangepickerConfig,
    DatePipe,
    SlicePipe,
    AppSettings,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
