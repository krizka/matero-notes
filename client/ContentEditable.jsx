/**
 * Created by kriz on 11/01/16.
 */

ContentEditable = React.createClass({
    propTypes: {
        onUpdate: React.PropTypes.func.isRequired,
        children: React.PropTypes.string.isRequired
    },

    getInitialState () {
        return {
            edit: false
        };
    },

    setEdit () {
        this.setState({ edit: true });
    },

    save (event) {
        const newValue = event.target.innerText;
        if (this.props.value === newValue)
            return;

        this.props.onUpdate(newValue);
        this.setState({ edit: false });
    },

    render () {
        return <span onClick={this.setEdit} onBlur={this.save} contentEditable={this.state.edit}>{this.props.children}</span>;
    }
});
