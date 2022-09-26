import { FormControl } from '@angular/forms';

export class Validacoes {
  static validaPlaca(formControl: FormControl) {
    var placa = formControl.value;

    const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}$/;
    const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;

    if (
      regexPlaca.test(placa) ||
      regexPlacaMercosulCarro.test(placa) ||
      placa === null
    ) {
      return null;
    } else {
      return { placaInvalido: true };
    }
  }

  static getErrorMessage(
    name: string,
    validator: string,
    validatorValue?: any
  ) {
    const msgContent: { [key: string]: any } = {
      required: `${name} é obrigatório`,
      email: `${name} inválido`,
      placaInvalido: `Placa inválida`,
      anoInvalido: `Ano inválido`,
      maxlength: `${name} deve ter no máximo ${validatorValue.requiredLength} caracteres`,
      minlength: `${name} deve ter no mínimo ${validatorValue.requiredLength} caracteres`,
    };
    return msgContent[validator];
  }

  static validaAno(formControl: FormControl) {
    const ano = formControl.value;
    const anoAtual = new Date().getFullYear();

    if (ano.length === 4 && (ano > anoAtual + 2 || ano < anoAtual - 300)) {
      return { anoInvalido: true };
    } else {
      return false;
    }
  }
}
