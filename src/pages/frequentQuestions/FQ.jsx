import "./fq.css";

function Fq() {
    return (
        <div>
            <h1 className="titleFQ">Preguntas Frecuentes</h1>
            <div className="fq-container">      
                <div>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    ¿Puedo realizar la compra de un ticket en efectivo?
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">¡Claro que sí! Puedes realizar la compra de un ticket en efectivo directamente en el cine. Te invitamos a acercarte a nuestras boleterías, donde nuestro amable personal estará encantado de asistirte con tu compra. ¡Te esperamos!</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    ¿Se puede hacer una devolución de mi entrada?
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">Momentáneamente no contamos con la devolución de entradas una vez ya realizado el pago.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                    No me llegó el mail con la confirmación de la entrada ¿Qué pudo haber ocurrido?
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    Cuando usted se registró en la página, nos proporcionó una dirección de e-mail. A esa dirección enviamos todas nuestras comunicaciones, incluyendo las de confirmación de compras.<br />
                                    Si usted no encuentra el mail de confirmación, por favor tenga en cuenta los siguientes puntos:<br />
                                    - Asegúrese de estar revisando la casilla de mail correspondiente.<br />
                                    - Revise si el mail de confirmación no se encuentra en las carpetas de SPAM o correo no deseado.<br />
                                    - Algunas casillas de e-mail laborales o profesionales rechazan los mensajes provenientes de remitentes no autorizados. Le recomendamos que no se registre en la página con este tipo de direcciones de e-mail.<br />
                                    - En ocasiones las casillas de mail exceden la cuota de mensajes permitidos por el proveedor de correo electrónico. A partir de ese momento, ya no podrá recibir mensajes en esa casilla. Por favor asegúrese de que no sea el caso. Normalmente el proveedor de correo electrónico le enviará una alerta si está excedido en su cuota.<br />
                                    - Puede encontrar la información correspondiente a su compra en la sección “Usuario” de la página www.cineAurora.com.ar, entrando con su mail y su contraseña.<br />
                                    - Si a pesar de haber seguido estas indicaciones no encuentra la información, envíenos su consulta.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fqFooter"></div>
        </div>
    );
}

export default Fq;
