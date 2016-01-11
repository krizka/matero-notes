/**
 * Created by kriz on 11/01/16.
 */

NavPartition = React.createClass({
    propTypes: {
        partition: React.PropTypes.object.isRequired
    },

    removePartition () {
        Partitions.remove(this.props.partition._id);
    },

    setAsCurrent () {
        Session.set('currentPartition', this.props.partition._id);
    },

    render() {
        return (
            <li>
                <a onClick={this.setAsCurrent} href="#">{this.props.partition.title}</a>
                <sup onClick={this.removePartition} className="fa fa-times" title="Удалить раздел" />
            </li>
        );
    }
});