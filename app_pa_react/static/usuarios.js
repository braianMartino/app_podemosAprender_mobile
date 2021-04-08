var textoMarked =`
#app_podemosaprender 
#bandadjango\r\n\r\n ¡Tenemos 
_markdown_ !\r\n\r\nSi escribis un texto en 
[Markdown](https://www.markdownguide.org/cheat-sheet) nuestra aplicación lo muestra con el formato lindo, 
pero si pegas el texto en facebook u otro lado tambien se lee bien.\r\n\r\n* Grande\r\n* Braian\r\n* Martino!`
        

var Usuarios = React.createClass({
  //U: la lista de usuarios
  getInitialState: function(props) {
    const state = { usuarios: null }; //DFLT

    const promesaUsuarios = listarUsuarios();
    promesaUsuarios.then(usuariosQueTraje =>
      this.setState({ usuarios: usuariosQueTraje })
    );
    //A: llame la funcion listarUsuarios que es async, cuando devuelva la lista de usuarios me la pasa en el then
    //A: ahi llamo setState quE 1) actualiza this.state, 2) llama render para que actualice la pantalla

    return state; //A: devuelvo state "como este ahora", pero se va a actualizar cuando termine listarUsuarios
  },

  render: function() {
    return (
      <Ons.Page>
        <section style={{ margin: "16px" }}>
          {this.state.usuarios == null ? (
            "cargando usuarios" //A: no tengo usuarios
          ) : (
            //A: si tengo lista de usuarios
            <Ons.List>
              {this.state.usuarios.map((
                usr //A: lo que esta entre llaves es javascript que devuelve lo que hay que mostrar
              ) => (
                <Ons.ListItem expandable >
                  {usr}
                  <div className="expandable-content" style={{marginBottom: "200px"}}>
                    <MiCuenta texto = {textoMarked} /> //Agrego componente de texto Marked para mostrar en el desplegable
                  </div>
                </Ons.ListItem> //A: en este caso un ListItem para cada usuario
              ))}
            </Ons.List>
          )}
        </section>
      </Ons.Page>
    );
  }
});
