import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable()
export class Alertas {

    constructor(){ }

    erro(message: string): any {
        return Swal.fire('Erro', message, 'error');
    }

    sucesso(message: string): any {
        return Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: message,
          showConfirmButton: false,
          timer: 2000
        });
    }

    warning(message: string): any {
        return this.show(message, 'warning', 'Atenção!');
    }

    info(title: string, message: string): any {
      return Swal.fire({
        title: '<strong>'+title+'</strong>',
        icon: 'info',
        html: message,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: '<a></a>'
      })

    }

    warningAlert(message: string): any {
        return Swal.fire({
                title: 'Atenção!',
                text: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            });
    }

    async trocarSenha(){
      const { value: formValues } = await Swal.fire({
        title: 'Trocar senha',
        html:
          '<div style="display: flex;">' +
          '<input id="senhaAtual" type="password" placeholder="Senha atual">' +
          '</div>' +
          '<div style="display: flex;">' +
          '<input id="novaSenha" type="password" placeholder="Nova senha">'+
          '<input id="confNovaSenha" type="password" placeholder="Confirme nova senha">' +
          '</div>',
        focusConfirm: false,
        confirmButtonText: 'Trocar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          return [
            (<HTMLInputElement>document.getElementById('senhaAtual')).value,
            (<HTMLInputElement>document.getElementById('novaSenha')).value,
            (<HTMLInputElement>document.getElementById('confNovaSenha')).value
          ]
        }
      })

      return formValues;
    }

    showLoading(title: string) {
        return Swal.fire({
            title: title,
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })
    };

    fecharModal(){
        if(Swal.isVisible()) {
            Swal.close();
        }
    }

    private show(message: string, type: any, title: string): any {
        return Swal.fire({
            icon: type,
            title: title,
            text: message
        });
    }
}
