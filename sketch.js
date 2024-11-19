let campoSalario, s, i, INSS;
let campoPatrimonio, campoCusto, campoInvest, campoInfl, campoTempo, p, c, i2, f, t, j, montante;

function setup() {
  
  // Calculadora de Imposto
  campoSalario = createInput();
  campoSalario.position(360, 180);
  campoSalario.attribute("placeholder", "Salário Mensal");
  let button1 = createButton("Calcular");
  button1.position(410, 600);
  button1.mousePressed(PegaValoresImposto);

  // Calculadora de Investimento
  campoPatrimonio = createInput();
  campoPatrimonio.position(660, 110);
  campoPatrimonio.attribute("placeholder", "Valor Inicial");
  campoCusto = createInput();
  campoCusto.position(660, 140);
  campoCusto.attribute("placeholder", "Investimento Mensal");
  campoInvest = createInput();
  campoInvest.position(660, 170);
  campoInvest.attribute("placeholder", "Taxa de Investimento Mês");
  campoInfl = createInput();
  campoInfl.position(660, 200);
  campoInfl.attribute("placeholder", "Taxa de Inflação Mês");
  campoTempo = createInput();
  campoTempo.position(660, 230);
  campoTempo.attribute("placeholder", "Tempo mês");
  let button2 = createButton("Calcular");
  button2.position(710, 280);
  button2.mousePressed(PegaValoresInvestimento);
}

function PegaValoresImposto() {
  // Função para impedir confundir , e .
  const tratarNumero = (valor) =>
    parseFloat(valor.toString().replace(",", "."));

  // Fazer os números que já são números virarem números
  s = tratarNumero(campoSalario.value());
  CalcularResultadoImposto();
}

function CalcularResultadoImposto() {
  INSS = 0;

  if (s < 225920 / 100) {
    i = 0;
  } else if (s >= 225920 / 100 && s <= 282665 / 100) {
    i = s * (75 / 1000) - 16944 / 100;
  } else if (s >= 282666 / 100 && s <= 375105 / 100) {
    i = s * (15 / 100) - 38144 / 100;
  } else if (s >= 375106 / 100 && s <= 466468 / 100) {
    i = s * (225 / 1000) - 66277 / 100;
  } else if (s >= 466469 / 100) {
    i = s * (275 / 1000) - 896;
  }
  i = i.toFixed(2);

  if (s <= 1320) {
    INSS = s * 0.075;
  } else if (s <= 2571.29) {
    INSS = ((s - 1320) * 0.09) + (1320 * 0.075);
  } else if (s <= 3856.94) {
    INSS = ((s - 2571.29) * 0.12) + (2571.29 - 1320) * 0.09 + (1320 * 0.075);
  } else if (s <= 7507.49) {
    INSS = ((s - 3856.94) * 0.14) + (3856.94 - 2571.29) * 0.12 + (2571.29 - 1320) * 0.09 + (1320 * 0.075);
  } else {
    INSS = 7507.49 * 0.14; // Teto do INSS
  }
  INSS = INSS.toFixed(2);
}

function PegaValoresInvestimento() {
  const tratarNumero = (valor) =>
    parseFloat(valor.toString().replace(",", "."));

  p = tratarNumero(campoPatrimonio.value());
  c = tratarNumero(campoCusto.value());
  i2 = tratarNumero(campoInvest.value());
  f = tratarNumero(campoInfl.value());
  t = tratarNumero(campoTempo.value());

  j = 1 + ((i2 - f) / 100);

  v1 = p;
  vk = v1;

  CalcularResultadoInvestimento(v1, vk, t, c, j);
}

function CalcularResultadoInvestimento(v1, vk, t, c, j) {
  for (k = 1; k <= t; k++) {
    vk = (vk * j + c);
  }
  montante = vk;
}

function draw() {
  // Desenho da Calculadora de Imposto
  background(220);
  textSize(16);
  text("R$", 20,105);
  text("INSS Devido Mensal: " + "R$ " + str(INSS * 1), 20, 240);
  text("Imposto Devido Mensal: " + "R$ " + str(i * 1), 20, 270);
  text("Imposto Devido Anual: " + "R$ " + str(i * 13), 20, 300);
  text("Valores não considerando férias ", 20, 340);
  text("Investimento bruto: " + "R$ " + montante, 320, 300);
  text("Investimento abreviado: " + "R$ " + Math.floor(montante), 320, 250);
}