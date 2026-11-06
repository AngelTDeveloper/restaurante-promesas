// Referencias a elementos del DOM
const logOutput = document.getElementById("log-output");
const btnIniciar = document.getElementById("btn-iniciar");
const finalBanner = document.getElementById("final-banner");


const logTerminal = (mensaje, tipo = "info") => {
  console.log(mensaje);
  
  const p = document.createElement("p");
  p.textContent = `> ${mensaje}`;
  p.className = tipo === "success" ? "log-success" : tipo === "final" ? "log-final" : "log-info";

  logOutput.appendChild(p);
  logOutput.scrollTop = logOutput.scrollHeight;
};


const actualizarEstado = (idPlatillo, estado, textoEstado) => {
  const card = document.getElementById(`card-${idPlatillo}`);
  const statusElem = card.querySelector(".status");
  
  card.className = `card ${estado}`;
  statusElem.textContent = textoEstado;
};


const prepararPlatillo = (idPlatillo, nombre, tiempo) => {
  return new Promise((resolve) => {
    actualizarEstado(idPlatillo, "preparing", "⏳ Preparando...");
    logTerminal(`Preparando ${nombre}...`, "info");

    setTimeout(() => {
      actualizarEstado(idPlatillo, "delivered", "✅ Entregado");
      logTerminal(`¡${nombre} está listo y ha sido entregado!`, "success");
      resolve();
    }, tiempo);
  });
};


const iniciarSimulacion = async () => {

  btnIniciar.disabled = true;
  logOutput.innerHTML = "";
  finalBanner.classList.add("hidden");
  
  ["bebida", "pizza", "postre"].forEach(id => actualizarEstado(id, "", "En espera"));

  logTerminal("¡Nueva orden recibida en el restaurante!", "info");

  try {
    
    await prepararPlatillo("bebida", "Bebida", 1500);
    await prepararPlatillo("pizza", "Pizza", 3500);
    await prepararPlatillo("postre", "Postre", 2000);

    logTerminal("¡La orden completa ha sido entregada!", "final");
    finalBanner.classList.remove("hidden");
  } catch (error) {
    console.error("Error en la orden:", error);
  } finally {
    btnIniciar.disabled = false;
  }
};


btnIniciar.addEventListener("click", iniciarSimulacion);