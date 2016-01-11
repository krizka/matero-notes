/**
 * Created by kriz on 11/01/16.
 */

Layout = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData () {
        const partId = Session.get('currentPartition');
        return {
            partition: Partitions.findOne(partId)
        }
    },

    render () {
        return (
            <div className="layout">
                <div className="body">
                    <header className="main-header grid-middle-spaceBetween">
                        <div className="col-8">
                            <NavBar />
                        </div>
                        <div className="col-1">

                        </div>
                    </header>
                    <main className="main">
                        {this.data.partition && <Partition partition={this.data.partition} />}
                    </main>
                </div>
                <footer className="main-footer">2016 г.</footer>
            </div>
        );
    }
});