import fs from 'fs';
import https from 'https';

let conjunto = new Object();

interface Conjunto {
  ruta: string;
  fecha: string;
}

let direcciones: string[] = [];
let fechas: string[] = [];
let myArray: string[] = [];
let urlWeb: string =
  'https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting';

async function main() {
  https.get(urlWeb, function (res) {
    let data: string = '';
    res.on('data', function (d) {
      data += d;
    });
    res.on('end', async function () {
      myArray = data.split('<li class="gem-c-document-list__item  ">');
      myArray.shift();
      for (let i: number = 0; i < myArray.length; i++) {
        fechas.push(
          myArray[i].toString().split('<time datetime="')[1].split('T')[0]
        );

        direcciones.push(
          'https://www.gov.uk' +
            myArray[i].toString().split('href="')[1].split('">')[0]
        );
      }
      console.log(direcciones);
      console.log(fechas);

      for (let j: number = 0; j < direcciones.length; j++) {
        let conjunto: Conjunto = {
          ruta: direcciones[j],
          fecha: fechas[j],
        };
        console.log(conjunto);
      }
    });

    res.on('error', function (e) {
      console.error(e);
    });
  });
}

main();

// entrar a web y registrar cada fecha de excel
// entrar en cada enlace y descargar excel de cada enlace
// de 2014 todos los FLAT
