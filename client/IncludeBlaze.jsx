/**
 * Created by kriz on 11/01/16.
 */

IncludeBlaze = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired
    },

    componentDidMount() {
        var componentRoot = ReactDOM.findDOMNode(this);
        var parentNode = componentRoot.parentNode;
        // Render the Blaze template on this node
        this.view = Blaze.renderWithData(this.props.template, this.props.data, parentNode, componentRoot);
        parentNode.removeChild(componentRoot);
    },

    componentWillReceiveProps(props) {
        this.view.dataVar.set(props);
    },

    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    },

    render() {
        return <div />;
    }
});
