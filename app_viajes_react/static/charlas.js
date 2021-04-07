
var Charlas = React.createClass({
    render: function() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar}>  
            <Cards usuarioId={this.props.usuarioId}/>
        </Ons.Page>
      );
    }
  });
  