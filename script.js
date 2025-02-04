document.getElementById("calculateBtn").addEventListener("click",() => {
  const v0 = parseFloat(document.getElementById("v0").value);
  const angLanc = parseFloat(document.getElementById("angLanc").value);
  const g = parseFloat(document.getElementById("g").value);

  // Chama as constantes

  const angLancRad = angLanc * Math.PI / 180;
  // Transforma graus em rad

  const vX = Math.cos(angLancRad) * v0;
  const v0Y = Math.sin(angLancRad) * v0;
  // Velocidade horizontal (constante) e velocidade inicial vertical, respectivamente

  const tVoo = 2 * v0 * Math.sin(angLancRad) / g;
  const tSubida = tVoo / 2;
  const distMaxKm = (((((v0 ** 2) * (Math.sin(2 * angLancRad))) / g)) / 1000);
  const altMaxKm = (((v0Y ** 2) / (2 * g)) / 1000);
  const altMaxM = ((v0Y ** 2) / (2 * g));
  // Calcula as informações

  document.getElementById("dist").innerText =
    `Distância percorrida: ${distMaxKm.toFixed(2)} Km`;
  document.getElementById("alt").innerText = `Altura máxima: ${altMaxKm.toFixed(2)} Km ou ${altMaxM.toFixed(2)} m`;
  document.getElementById("tVoo").innerText = `Tempo de voo: ${tVoo.toFixed(2)} segundos`;
  // Mostra as informações na tela

  let dot = document.getElementById("dot");
  let maxAltDot = document.getElementById("maxAltDot");
  // Sprite das bolas azuis

  let posX = 0;
  let posY = 0;
  let t = 0;
  // Posição e tempo iniciais

  let tempo = setInterval(() => {
    t += 0.1;
  }, 10);
  // Cronômetro que marca o tempo

  function updateX() {
    posX = vX * t;
    dot.style.left = `${posX}px`;
  };
  // Função que atualiza a posição horizontal com base no tempo

  function updateY() {
    posY = (v0Y * t) - ((g * (t ** 2)) / 2);
    dot.style.bottom = `${posY}px`;
  };
  // Função que atualiza a posição vertical com base no tempo

  function updateXMAD() {
    posX = vX * t;
    maxAltDot.style.left = `${posX}px`;
  };
  // Função que atualiza a posição horizontal com base no tempo

  function updateYMAD() {
    posY = (v0Y * t) - ((g * (t ** 2)) / 2);
    maxAltDot.style.bottom = `${posY}px`;
  };
  // Função que atualiza a posição vertical com base no tempo

  let posMADUpdater = setInterval(() => {
    updateXMAD();
    updateYMAD();

    if (t >= tSubida) {
      clearInterval(posMADUpdater);
    }
  });

  let posUpdater = setInterval(() => {
    updateX();
    updateY();

    if (t >= tVoo) {
      clearInterval(posUpdater);
      clearInterval(tempo);
    }
  });
  /* Vai chamando as funções que mudam a posição conforme o tempo, note que não é necessário sincronizar o delay do intervalo
   com o delay do intervalo do cronômetro do tempo, pois mesmo se as funções são chamadas sem o tempo ter mudado a posição não muda, pois o tempo não mudou */
  
  document.getElementById("rstBtn").addEventListener("click", () => {
    clearInterval(tempo);
    clearInterval(posMADUpdater);
    clearInterval(posUpdater);
    dot.style.bottom = `${0}px`
    dot.style.left = `${0}px`
    maxAltDot.style.bottom = `${0}px`
    maxAltDot.style.left = `${0}px`
    t = 0;
  });
  // Reinicia a pág
});
