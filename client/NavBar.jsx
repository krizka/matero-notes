/**
 * Created by kriz on 11/01/16.
 */

NavBar = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData () {
        Meteor.subscribe('partitions');
        return {
            partitions: Partitions.find().fetch()
        };
    },

    renderPartitions () {
        return this.data.partitions.map((part) => {
            return <NavPartition key={part._id} partition={part} />;
        });
    },

    addPartition () {
        const partId = Partitions.insert({
            title: 'Раздел'
        });
        Session.set('currentPartition', partId);
    },

    render() {
        return (
            <nav className="navbar">
                <ul className="main-nav">
                    {this.renderPartitions()}
                    <span className="button-wrap">
                    <button onClick={this.addPartition} className="button button-primary button-circle button-small add_section">
                        <i className="fa fa-plus" />
                    </button>
                    </span>
                </ul>
            </nav>
        );
    }
});