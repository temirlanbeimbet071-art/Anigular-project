import { registerLocaleData } from '@angular/common';
import localeRuKz from '@angular/common/locales/ru-KZ';
import { LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

registerLocaleData(localeRuKz);

bootstrapApplication(AppComponent, {
	providers: [{ provide: LOCALE_ID, useValue: 'ru-KZ' }]
}).catch((err) => console.error(err));