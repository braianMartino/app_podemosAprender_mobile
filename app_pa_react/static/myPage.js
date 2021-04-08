var ejMarkdown = `
hola
## Un titulo

* una 
* lista
`;

var MyPage = React.createClass({
  getInitialState: function () {
    return {
      index: 0,
    };
  },
  renderToolbar: function () {
    //A: Cambié el title de la tab Settings a Favoritos (Marcelo)
    const titles = [ "Podemos Aprender" ,"Charlas", "Calendario", "Usuarios", "MiCuenta"]; //Acá agregué un título para TAB nueva.
    return (
      <Ons.Toolbar style={{backgroundColor:"gray"}}>
        <img src="logo.png" style={{marginTop:"5px", paddingLeft:"5px"}}  height="30" alt=""></img>
        <div className="center">{titles[this.state.index]}</div>
      </Ons.Toolbar>
    );
  },

  cuandoLoginOk: function ( usuarioId ) {
    this.setState({ index: 1, usuarioId });
  },

  renderTabs: function () {
    return [
      {
        content: <Charlas usuarioId={this.state.usuarioId}/>,
        tab: <Ons.Tab label="Charlas" icon="md-view-day" />,
      },
      {
        content: <Calendario content="Change the settings" usuarioId={this.state.usuarioId}/>,
        tab: <Ons.Tab label="Calendario" icon="md-calendar-check" />, //A: Cambié el nombre de Settings a Favoritos (Marcelo)
      },
      {
        content: <Usuarios />, //Agrego TAB Users y defino content
        tab: <Ons.Tab label="Usuarios" icon="md-face" />,
      },
      {
        content: <MiCuenta texto={"Mi Texto\n\n " + ejMarkdown} />, //Agrego TAB Users y defino content
        tab: <Ons.Tab label="MiCuenta" icon="md-file" />,
      },
    ];
  },

  render: function () {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        { this.state.usuarioId == null 
        ? <Login cuandoOk={this.cuandoLoginOk}></Login>
        : <Ons.Tabbar
            swipeable={true}
            position="auto"
            index={this.state.index}
            onPreChange={(event) => {
              if (event.index != this.state.index) {
                this.setState({ index: event.index });
              }
            }}
            renderTabs={this.renderTabs}
          />
        }  
      </Ons.Page>
    );
  },
});

ons.ready(function () {
  ReactDOM.render(<MyPage />, document.getElementById("app"));
});
