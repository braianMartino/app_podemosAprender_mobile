
var idUsuarioLogeado = null;


async function loginClave (usr, pass) {
  const res = await apiLogin( usr, pass );
  return res;
}

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: "",
      password: "",
    };
  },

  handleChange(value, property) {
    //Función genérica para setear varias propiedades
    let state = {};
    state[property] = value; //crea un objto, lo carga con el atributo y la propiedad
    this.setState(state); //setea el valor del atributo al state
  },

  handleClick: function() {
    loginClave(this.state.username, this.state.password)
      .then((res) => {
        if (res.detail === "No active account found with the given credentials") {
          ons.notification.alert("Username or password incorrect!");
        } else {
          idUsuarioLogeado = 1;
          this.props.cuandoOk(idUsuarioLogeado);
          //DBG:console.log(res)
        }
      }) 
  },

  render: function() {
    return (
      <Ons.Page
        style={{ display: "inline" }}>
        <section style={{ textAlign: "center" }}>
          <p>
            <Ons.Input
              value={this.state.username}
              onChange={e => {
                this.handleChange(e.target.value, "username");
              }}
              modifier="underbar"
              float
              placeholder="Username"
            />
          </p>
          <p>
            <Ons.Input
              value={this.state.password}
              onChange={e => {
                this.handleChange(e.target.value, "password");
              }}
              modifier="underbar"
              type="password"
              float
              placeholder="Password"
            />
          </p>
          <p>
            <Ons.Button onClick={this.handleClick}>Sign in</Ons.Button>
          </p>
        </section>
      </Ons.Page>
    );
  }
});
