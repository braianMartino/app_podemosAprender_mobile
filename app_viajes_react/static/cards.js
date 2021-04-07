var url1 =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";
var url2 =
  "https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=694&q=80";
var url3 =
  "https://www.freejpg.com.ar/image-900/8d/8d6c/F100011737-paisaje_de_la_isla_san_martin_y_las_cataratas_del_iguazu_en_verano.jpg";
var urlIm1 =
  "https://www.freejpg.com.ar/image-900/06/0660/F100012782-costa_en_la_ciudad_de_mar_del_plata_argentina.jpg";
var urlIm2 =
  "https://www.freejpg.com.ar/image-900/32/3246/F100011740-cabildo_de_buenos_aires_en_plaza_de_mayo.jpg";
var urlIm3 =
  "https://www.freejpg.com.ar/image-900/8d/8d6c/F100011737-paisaje_de_la_isla_san_martin_y_las_cataratas_del_iguazu_en_verano.jpg";

function emuEsperar(cuantosMilisegundos) {
  //U: para simular demoras con await
  return new Promise((onOk) => setTimeout(onOk, cuantosMilisegundos));
}

function emuTraerTarjetas() {
  return [
    {
      nombre: "Eros Martino",
      fotoCara: url1,
      imagen: urlIm1,
      texto: "Costa en la ciudad de Mar del Plata, Buenos Aires",
      tags: "Hermosa Mar del Plata #MDQ #mardel",
    },
    {
      nombre: "Mirta Guzman",
      fotoCara: url2,
      imagen: urlIm2,
      texto: "Cabildo Plaza de Mayo, Buenos Aires",
      tags: "Cabildo #cabildoBuenosAires ",
    },
    {
      nombre: "Facundo Benitez",
      fotoCara: url3,
      imagen: urlIm3,
      texto: "Cataratas del Iguazú, Misiones",
      tags: "#cataratas #iguazu #misiones ",
    },
  ];
}

async function apiTarjetas() {
  //ALT podriamos usar promesas, fetch('http://127.0.0.1:8000/api/lugar/').then( res => res.json() )
  const res = await fetch("http://127.0.0.1:8000/api/lugar/");
  const data = await res.json();
  await emuEsperar(3000); //A: simulamos que el servidor demora
  return data.results;
}
async function apiTarjetasDict() {
  const listaTarjetas = await apiTarjetas();
  const result = {};
  listaTarjetas.forEach((t) => (result[t.id] = t));
  return result;
}

const Favoritos = JSON.parse(localStorage.Favoritos || "{}"); //A: Si no hay nada en localStorage asignamos un objeto vacio


var Favoritos_ = null;
function leerFavoritoStorage() {
  if ( Favoritos_ != null ) return Favoritos_; //A: ya lo teniamos leido
  var x;
  try { 
    x = JSON.parse(localStorage.Favoritos || "{}"); //A: leo Favoritos
  }
  catch {
    //A: lo resolvemos más abajo
  }
  if ( x == null || typeof(x) != "object" ) {
    x = {}; //A: x siempre es un diccinario
  }
  Favoritos_ = x;
  return Favoritos_;
};

async function cambiarFavoritoApi ( lugar ) {
  var url = 'http://127.0.0.1:8000/api/favorito/';
  var data = {lugar: lugar,
              de_quien: 2}; //TODO: no hardcodear lo puse para probar
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  const resData = await res.json();
  if ( resData.non_field_errors &&
    resData.non_field_errors[0] == "The fields lugar, de_quien must make a unique set." ) {
    //A: todo bien, ya estaba
  } else {
    throw resData;
  }
  //DBG: console.log(resData);
};

function cambiarFavoritoStorage(unaTarjeta) {
  const favoritos = leerFavoritoStorage();
  favoritos[unaTarjeta.nombre] = !favoritos[unaTarjeta.nombre];
  localStorage.Favoritos = JSON.stringify(favoritos); //A: escribo Favoritos
}

var Cards = React.createClass({
  recargarTarjetas: function () {
    // vuelve a hacer la llamada, actualiza state y renderiza de nuevo
    const funcionTarjetas = this.props.funcionTarjetas || apiTarjetas;
    funcionTarjetas().then((tarjetasQueTraje) =>
      this.setState({ 
        tarjetas: tarjetasQueTraje, 
        usuarioId: this.props.usuarioId //A: para no volver a pedir tarjetas 
      })
    );
  },

  cambiarFavorito: function (unaTarjeta) {
    cambiarFavoritoStorage(unaTarjeta);
    this.setState({
      actualizar: unaTarjeta, //A: Dibujar de nuevo
    });
  },

  getInitialState: function () {
    
    //A: pedi los lugares del servidor, cuando esten va a actualizar state y llamar render
    return {
      tarjetas: null, //A: mientras, devuelvo una lista vacia, TODO: usar "loading"
    };
  },

  render: function () {
    //DBG:console.log("render", this.state, this.props)
    if (this.state.usuarioId != this.props.usuarioId) { //A: myPage cambio usuarioId
      this.recargarTarjetas();
      
      return <Ons.ProgressCircular indeterminate />;
    }
    const tarjetas = this.state.tarjetas;
    const favoritos = leerFavoritoStorage();
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        <section>
          <Ons.PullHook
            onChange={this.recargarTarjetas} /*componente Pull para llamar de nuevo a apiTarjetas*/
          >
            <Ons.ProgressCircular indeterminate />
          </Ons.PullHook>
          {tarjetas == null ? ( //A: todavia no cargo las tarjetas
            <Ons.ProgressCircular indeterminate />
          ) : (
            tarjetas.map((estaTarjeta) => (
              <Tarjeta
                tarjeta={estaTarjeta}
                cambiarFavorito={(unaTarjeta) =>
                  this.cambiarFavorito(unaTarjeta)
                }
              />
            ))
          )}
        </section>
      </Ons.Page>
    );
  },
});
