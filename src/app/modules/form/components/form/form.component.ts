import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

import * as JsonToXML from 'js2xmlparser';
import { HttpClient } from '@angular/common/http';

//validators
import { Validacoes } from '../../Validators/valicacoes';

//interfaces
import { FipeList } from '../../interfaces/fipe-list';
import { VeiculoList } from '../../interfaces/veiculo-list';

//services
import { ListsService } from './../../services/lists.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() public emitVeiculosList = new EventEmitter();

  public fipeListArray: Array<FipeList> = [];

  public filterFipeArray: Array<any> = [];

  public veiculosArray: Array<VeiculoList> = [];

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private listsService: ListsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      placa: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          Validacoes.validaPlaca,
        ],
      ],
      chassi: ['', [Validators.required]],
      renavam: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      ano: ['', [Validators.required]],
    });

    this.listsService.getFipe().subscribe({
      next: (res) => (this.fipeListArray = res),
    });
  }

  enviarValorVeiculos() {
    this.veiculosArray = this.form.value;
    this.emitVeiculosList.emit(this.veiculosArray);

    this.form.reset();
  }

  resetFormulario() {
    this.form.reset();
  }

  consultaFipe(text: string) {
    this.filterFipeArray = this.fipeListArray.filter((dados) => {
      const dado = dados.nome;
      const textNormalize = this.normalizeString(text);
      const dadosNormalize = this.normalizeString(dado);

      if (textNormalize === dadosNormalize) {
        console.log(dados.codigo);
        this.setValueFipe(dado);
        return null;
      }

      return dadosNormalize.startsWith(textNormalize);
    });

    if (text === '') {
      this.filterFipeArray = [];
    }
  }

  normalizeString(string: string) {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace('ë', 'e');
  }

  setValueFipe(name: any) {
    this.form.patchValue({
      marca: name,
    });

    this.filterFipeArray = [];
  }

  resetValueFipe() {
    this.form.patchValue({
      marca: '',
    });
  }

  getCampo(campo: string) {
    return this.form.get(campo)!;
  }

  verifyError(campo: string) {
    return !this.getCampo(campo).valid && this.getCampo(campo).touched;
  }

  validatorError(campo: string, validator: string) {
    if (this.verifyError(campo) && this.getCampo(campo).errors?.[validator]) {
      return true;
    } else {
      return false;
    }
  }

  public onSubmit() {}
}
