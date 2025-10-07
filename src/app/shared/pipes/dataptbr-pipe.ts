import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataptbr'
})
export class DataptbrPipe implements PipeTransform {

transform(
    value: Date | string | number | null | undefined,
    locale: string = 'pt-BR',
    options: Intl.DateTimeFormatOptions | string = 'short'
  ): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);

    const presets: Record<string, Intl.DateTimeFormatOptions> = {
      short: { dateStyle: 'short', timeStyle: 'short' },
      medium: { dateStyle: 'medium', timeStyle: 'medium' },
      long: { dateStyle: 'long', timeStyle: 'long' },
      dateOnly: { dateStyle: 'short' },
      timeOnly: { timeStyle: 'short' }
    };

    const opts =
      typeof options === 'string' && presets[options]
        ? presets[options]
        : (options as Intl.DateTimeFormatOptions);

    return new Intl.DateTimeFormat(locale, opts).format(date);

  }
}
