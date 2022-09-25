import { ErrorAlertModalService } from 'src/app/modules/shared/error-alert-modal.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

//validators
import { Validacoes } from '../../Validators/valicacoes';

//interfaces
import { FipeList } from '../../interfaces/fipe-list';
import { VeiculoList } from '../../interfaces/veiculo-list';

//services
import { ListsService } from './../../services/lists.service';
import { VeiculosService } from '../../services/veiculos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

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
    private veiculosService: VeiculosService,
    private errorAlertModalService: ErrorAlertModalService,
    private router: Router,
    private route: ActivatedRoute
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

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.veiculosService.editById(id))
      )
      .subscribe({
        next: (veiculo) => this.setValuesForm(veiculo),
      });
  }

  setValuesForm(dadosVeiculo: any) {
    this.form.setValue(dadosVeiculo);
  }

  onSave() {
    let msgSuccess = 'Veículo cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar veículo. Tente novamente!';

    if (this.form.value.id) {
      msgSuccess = 'Veículo atualizado com sucesso!';
      msgError = 'Erro ao atualizar veículo. Tente novamente!';
    }
    this.veiculosService.saveVeiculo(this.form.value).subscribe({
      next: (success) => {
        this.router.navigate(['']);
        this.errorAlertModalService.alertSucess(msgSuccess);
      },
      error: (error) => this.errorAlertModalService.alertError(msgError),
    });
  }

  onReset() {
    this.form.reset();
  }

  consultaFipe(text: string) {
    this.filterFipeArray = this.fipeListArray.filter((dados) => {
      const dado = dados.nome;
      const textNormalize = this.normalizeString(text);
      const dadosNormalize = this.normalizeString(dado);

      if (textNormalize === dadosNormalize) {
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
