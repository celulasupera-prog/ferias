const form = document.querySelector('#form');
const atualizarBtn = document.querySelector('#atualizar');

const formatMoney = (value) =>
  Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (dateValue) => {
  if (!dateValue) return '';
  const [year, month, day] = dateValue.split('-');
  return `${day}/${month}/${year}`;
};

function preencher() {
  const data = Object.fromEntries(new FormData(form));

  const salarioBase = Number(data.salarioBase || 0);
  const mediaHoras = Number(data.mediaHoras || 0);
  const mediaValores = Number(data.mediaValores || 0);
  const outrasVantagens = Number(data.outrasVantagens || 0);

  const totalBase = salarioBase + mediaHoras + mediaValores + outrasVantagens;
  const ferias = totalBase;
  const terco = ferias / 3;
  const totalProventos = ferias + terco;

  const descontoInss = totalProventos * (Number(data.inss || 0) / 100);
  const descontoIrrf = totalProventos * (Number(data.irrf || 0) / 100);
  const totalDescontos = descontoInss + descontoIrrf;
  const liquido = totalProventos - totalDescontos;

  const bind = (id, value) => {
    const element = document.querySelector(`#${id}`);
    if (element) element.textContent = value;
  };

  bind('oEmpresa', data.empresa);
  bind('oCnpj', data.cnpj);
  bind('oEmpregado', data.empregado);
  bind('oCarteira', data.carteira);
  bind('oSerie', data.serie);
  bind('oAquisicao', data.aquisicao);
  bind('oGozo', data.gozo);
  bind('oAbonoPeriodo', data.abonoPeriodo || '-');

  bind('oSalarioBase', formatMoney(salarioBase));
  bind('oMediaHoras', formatMoney(mediaHoras));
  bind('oMediaValores', formatMoney(mediaValores));
  bind('oOutras', formatMoney(outrasVantagens));
  bind('oTotalBase', formatMoney(totalBase));

  bind('oFerias', formatMoney(ferias));
  bind('oTerco', formatMoney(terco));
  bind('oProventos', formatMoney(totalProventos));
  bind('oInss', formatMoney(descontoInss));
  bind('oIrrf', formatMoney(descontoIrrf));
  bind('oDescontos', formatMoney(totalDescontos));
  bind('oLiquido', formatMoney(liquido));

  bind(
    'oTextoAviso',
    `Pelo presente comunicamos-lhe que, de acordo com a Lei, serão concedidas férias relativas ao período acima descrito e a importância líquida de R$ ${formatMoney(
      liquido,
    )} será paga adiantadamente.`,
  );
  bind(
    'oTextoRecibo',
    `Recebi da firma ${data.empresa}, a importância de R$ ${formatMoney(
      liquido,
    )} paga adiantadamente por motivo das minhas férias regulares, conforme o aviso. Para clareza firmo o presente recibo dando plena e geral quitação.`,
  );

  bind('oEmpregadoAss', data.empregado);
  bind('oEmpresaAss', data.empresa);
  bind('oCnpjAss', data.cnpj);
  bind('oEmpregadoRec', data.empregado);
  bind('oCidade', data.cidade);
  bind('oDataAviso', formatDate(data.dataAviso));
  bind('oDataRecibo', formatDate(data.dataRecibo));
}

atualizarBtn.addEventListener('click', preencher);
form.addEventListener('input', preencher);
preencher();
