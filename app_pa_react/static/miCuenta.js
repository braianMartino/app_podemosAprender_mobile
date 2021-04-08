var MiCuenta = React.createClass({

  createMarkup: function() {
    return {__html: marked(this.props.texto)};
  },



  render: function() {
    return (
      <Ons.Page>
        <section style={{ margin: "16px" }}>
            <div dangerouslySetInnerHTML={this.createMarkup()} />;
        </section>
      </Ons.Page>
    );
  }
});

//Fetch para traer lista de usuarios y listarlos
//Seguí ejemplo de aca: https://onsen.io/v2/guide/tutorial.html#remote-api-calls

let url = "https://si.podemosaprender.org/api/participante/";

const listarUsuarios = async () => {
  // do the API call and get JSON response
  const response = await fetchConToken(url);
  const json = await response.json();

  const usuarios = json.results.map(e => e.username);
  return usuarios;
  
};
listarUsuarios();