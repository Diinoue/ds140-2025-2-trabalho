import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataptbr'
})
export class DataptbrPipe implements PipeTransform {


  transform(value: Date | string | null): string {
    if (!value) return '';

    const data = new Date(value);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear()).slice(-2);
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  }
}
