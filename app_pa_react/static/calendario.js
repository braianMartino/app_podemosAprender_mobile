async function apiFavoritos() {
  const res = await fetch("http://127.0.0.1:8000/api/favorito/");
  const data = await res.json();
  return data.results;
}

async function obtenerListaFavoritos() {
  const idFavoritos = await apiFavoritos(); //A: Traigo los IDs de las tarjetas faveadas y quien las faveo
  const tarjetas = await apiTarjetasDict(); //A: Traigo todas las tarjetas de la API
  let listaFavoritos = [];
  idFavoritos.forEach((f) => { //A: solo carga favoritos si coinciden el campo de_quien de api/favorito con el id que se pase por parametro
    //que deberia ser el id del USUARIO LOGU(EADO
    if ( f.de_quien == idUsuarioLogeado ) {//A: le paso directamente la variable que declare y cargo en myLogin
      listaFavoritos.push(tarjetas[f.lugar]);
    }//TODO: escribir más corto?
  }) 
  //DBG:console.log(idUsuarioLogeado, listaFavoritos)
  return listaFavoritos;
}

var Calendario = React.createClass({
  render: function() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>  
          <Cards funcionTarjetas={obtenerListaFavoritos} usuarioId={this.props.usuarioId}/>
      </Ons.Page>
    );
  }
});


  

