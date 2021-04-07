var Tarjeta = React.createClass({
  render: function () {
    const tarjeta = this.props.tarjeta;
    const cambiarFavorito = this.props.cambiarFavorito || (() => null); //A: Si no nos pasaron función usamos una que no hace nada.
    const esFavorito = this.props.esFavorito;
    return (
      <Ons.Card>
        <div style={{ textAlign: "center", position: "relative" }}>
          <img className="post-image" src={tarjeta.imagen} />
        </div>
        <Ons.ListItem className="post-button-bar" modifier="nodivider">
          <div className="list-item__title">
            <b>{tarjeta.nombre}</b>
          </div>
          <div className="right corner-button bookmark">
            <Ons.Button //A: Agregamos boton favorito
              class="post-button"
              modifier="quiet"
              onClick={() => cambiarFavorito(tarjeta)}
            >
              <Ons.Icon
                icon="ion-ios-heart"
                style={{ color: esFavorito ? "red" : "gray" }}
              ></Ons.Icon>
            </Ons.Button>
          </div>
        </Ons.ListItem>
        <Ons.ListItem>
          <div className="center">
            <div className="list-item__subtitle" style={{ fontSize: "12px" }}>
              {tarjeta.texto}
            </div>
          </div>
        </Ons.ListItem>

        <div className="post-like-info">
          <b>someone_one</b> and 24 other liked this.
        </div>
        <div className="post-time">1 HOUR AGO</div>
      </Ons.Card>
    );
  },
});
